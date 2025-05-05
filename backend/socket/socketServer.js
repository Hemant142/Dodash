// socket/socketServer.js
const socketServer = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("joinRide", ({ rideId, role }) => {
      socket.join(rideId);
      console.log(`${role} joined ride ${rideId}`);
    });

    socket.on("driverLocationUpdate", ({ rideId, location }) => {
      io.to(rideId).emit("locationUpdate", location);
    });

    socket.on("rideComplete", ({ rideId }) => {
      io.to(rideId).emit("rideCompleted");
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export default socketServer;
