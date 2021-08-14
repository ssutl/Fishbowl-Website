import { useEffect, useRef, useState, useContext } from "react";
import socketIOClient from "socket.io-client";
import { UserContext } from "../Context/CurrentUser";


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "https://fishbowl-heroku.herokuapp.com";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();
  const info = useContext(UserContext)


  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    var currentdate = new Date();
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      text: messageBody,
      senderId: socketRef.current.id,
      sentBy: info.name,
      sentByImage: info.image,
      date: { year: currentdate.getFullYear(), month: currentdate.getMonth(), day: currentdate.getDate(), hour: currentdate.getHours() },
      likes: []
    });
  };

  return { messages, sendMessage };
};

export default useChat;