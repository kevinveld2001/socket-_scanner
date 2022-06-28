import { useEffect, useRef } from "react";
import QrScanner from 'qr-scanner';
let lastScan = null;
export default function Camera ({onScan}) {
    const canvas = useRef(null);
    const video = useRef(null);
    
    useEffect(() => {
        if (typeof window != 'undefined') {
        
            const resize = () => {
                canvas.current.width = window.innerWidth;
                canvas.current.height = window.innerHeight;
                video.current.width = window.innerWidth;
                video.current.height = window.innerHeight;
                
            }
            resize();
            const event = window.addEventListener('resize', resize);
            let qrScanner = null;
            (async()=>{
                let stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'}, audio: false });
                video.current.srcObject = stream;
                qrScanner = new QrScanner(
                    video.current,
                    result => {
                        if (result == lastScan)
                            return;
                        lastScan = result;
                        onScan(result)
                    }
                );
                qrScanner.start();
            })()

            return () => {
                window.removeEventListener('resize', event);
                if (qrScanner !== null) {
                    qrScanner.stop();
                    qrScanner.destroy();
                    
                }
            };
        }
    }, []);



    return <div className="bg-slate-900 absolute top-0 left-0 h-screen w-screen">
            <video ref={video}  autoPlay className="object-cover h-screen w-screen"></video>
            <canvas ref={canvas} id="canvas" className='hidden -z-10'>
            </canvas>
        </div>
}