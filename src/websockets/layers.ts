import { io } from '../configs'

interface idroom {
  room: string
  socket_id: string
}

const rooms: idroom[] = []

io.on('connection', (socket) => {
  socket.on('require room', (data) => {
    socket.join(data.room)

    const haveUserInRoom = rooms.find((user) => user.room === data.room)

    if (haveUserInRoom) {
      haveUserInRoom.socket_id = socket.id
    } else {
      rooms.push({
        room: data.room,
        socket_id: socket.id,
      })
    }
  })

  socket.on('layer in', (data) => {
    io.to(data.room).emit('layer in', { lottie: data.lottie })
  })

  socket.on('layer out', (data) => {
    io.to(data.room).emit('layer out')
  })
})
