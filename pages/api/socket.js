import { Server } from 'socket.io'
let connectionList = {};

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        
        io.on('connection', socket => {
            socket.broadcast.emit('a user connected');
            console.log(socket.id)
            socket.on('phone-connected', id => {
                console.log("phone-connected:" + id)
                socket.to(id).emit('connected-phone')
            })

            socket.on('scan', (id, code) => {
              console.log(`scan(${id}):` + code);
              socket.to(id).emit('scan-receiver', code);
            })
        })
    
        res.socket.server.io = io;
      }
      res.end();
}

export default ioHandler;

