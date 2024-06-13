export function registerIOListeners(io) {
  // listeners
  io.on("connection", (socket) => {
    // when someone connects, they are assigned a socket object.
    console.log("a user connected");

    // you can listen to socket object events. For example, this is when
    // a user disconnects
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}
