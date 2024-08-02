import { Strapi } from '@strapi/strapi';
import axios from 'axios';
import { Server as IOServer } from 'socket.io';


export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Strapi }) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Strapi }) {
    const io = new IOServer(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    (strapi as any).io = io;
    const roomUsers = {};

    io.on("connection", (socket) => {
      console.log("User connected with socket id : ", socket.id);



      socket.on('joinRoom', ({ userId, roomId, userName }) => {
        if (!userId && !roomId && !userName) {
          console.log("Invalid data")
          return;
        }
        console.log(userId + ' joined the room' + roomId);
        socket.join(roomId);
        io.to(roomId).emit('message', {
          content: userName + " has joined",
          sender: userId,
          roomId: roomId,
          userName: userName
        });

        if (!roomUsers[roomId]) {
          roomUsers[roomId] = new Set();
        }
        roomUsers[roomId].add(userName);
        io.to(roomId).emit('activeUsers', Array.from(roomUsers[roomId]))

      })




      socket.on('sendMessage', async ({ roomId, content, senderId, userName }) => {
        try {
          const userMessage = {
            content: content,
            sender: senderId,
            roomId: roomId,
            userName: userName
          }

          io.to(roomId).emit("message", userMessage)

          console.log("msg saved")
        } catch (error) {
          console.log("Error storing message", error.message);
        }
      });


      socket.on('leave', ({ userId, roomId }) => {
        console.log(userId + ' left the room');
        socket.leave(roomId);
        io.to(roomId).emit('message', {
          content: "Welcome to room",
          sender: userId,
          roomId: roomId,
          userName: "Bot"
        })
        if (roomUsers[roomId]) {
          roomUsers[roomId].delete(userId);
          if (roomUsers[roomId].size === 0) {
            delete roomUsers[roomId];
          }
        }
        io.to(roomId).emit('activeUsers', Array.from(roomUsers[roomId] || []));

      });

      socket.on('getActiveUsers', (roomId) => {
        const activeUsers = Array.from(roomUsers[roomId] || []);
        socket.emit('activeUsers', activeUsers);
      });

      socket.on('disconnect', () => {
        console.log("User disconnected with socket id : ", socket.id);
      })
    })
  }
}
