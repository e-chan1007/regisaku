export default defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open");
  },

  message(peer, message) {
    console.log("[ws] message", message.text());
  },

  close(peer, event) {
    console.log("[ws] close", event);
  },

  error(peer, error) {
    console.log("[ws] error", error);
  },
});
