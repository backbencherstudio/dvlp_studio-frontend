import { io } from "socket.io-client";

let socket:any;

export function getSocket() {
  if (!socket) {
    socket = io("https://internship-registered-pens-tests.trycloudflare.com", {
      transports: ["websocket"],
      reconnection: true,
    });
  }
  return socket;
}
