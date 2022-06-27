import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import io from 'socket.io-client'

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
        {id}
        {socketIsConnected
            ? <button className='bg-gray-500 p-3 m-3 rounded text-white' onClick={()=> {socket.emit('scan',id,'test')}}>test</button>
            : <div></div>
        }
        
        
    </div>
}