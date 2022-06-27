import { useEffect, useState } from "react";
import io from 'socket.io-client'

export default function PhoneConnector() {
    const [url, setUrl] = useState("");

    useEffect(()=>{
        const baseUrl = `${window.location.protocol}://${window.location.host}/scan/`;
        fetch('/api/socket').finally(() => {
            const socket = io()

            socket.on('connect', () => {
                setUrl(baseUrl+ socket.id);
                socket.on("scan-receiver", (data) => {
                    console.log("scan-receiver: "+data)
                })
            })
            
        });
    },[])


    return <div className="bg-gray-100 border-gray-400 border-2 rounded p-2 my-2  gap-5 flex flex-col md:flex-row items-center">
        {url
        ?<img className="md:w-24 md:h-24 w-60 h-60" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`} alt="qr code to connect phone"></img>
        : <div className="md:w-24 md:h-24 w-60 h-60 bg-gray-200"></div>}
        <div>
            <h1 className="font-bold text-2xl">Maak verbinding met je telefoon</h1>
            <p>Scan de qr code met je telefoon. Geef vervolgens toegang tot je camera en begin te scannen.</p>
        </div>
    </div>
}