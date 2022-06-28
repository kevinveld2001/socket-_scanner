import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import io from 'socket.io-client'
import Camera from '../../components/Camera';

export default function scan() {
    const router = useRouter()
    const { id } = router.query

    const [socketIsConnected, setSocketIsConnected] = useState(false);
    const socket = io()
    
    useEffect(()=>{
        fetch('/api/socket')
            
        socket.on('connect', () => {
            setSocketIsConnected(true);
        })
        socket.on('disconnect', () =>{
            setSocketIsConnected(false);
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        }
    
    },[])

    useEffect(() => {
        if (socketIsConnected) {
            socket.emit('phone-connected', id);
        }
    }, [socketIsConnected])



    return <div>
        {socketIsConnected
            ? <Camera onScan={(scan) => {
                socket.emit('scan',id,scan);
            
            }}/>
            : <div></div>
        }
        
        
    </div>
}