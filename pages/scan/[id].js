import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import io from 'socket.io-client'

export default function scan() {
    const router = useRouter()
    const { id } = router.query

    const [newScan, setNewScan] = useState(((id, scan) => {}));

    let socket;
    useEffect(()=>{
        fetch('/api/socket').finally(() => {
            socket = io()

            socket.on('connect', () => {
                console.log("test")
                setNewScan(((id, scan) => {
                    console.log(`new scan ${id} ${scan}`)
                    socket.emit('scan', id, scan)
                }));
            })
        })
    },[])

    return <div>
        {id}
        <button className='bg-gray-500 p-3 m-3 rounded text-white' onClick={()=> {newScan(id,'test')}}>test</button>
        
    </div>
}