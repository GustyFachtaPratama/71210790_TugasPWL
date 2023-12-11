import React from "react";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatBar from "../components/ChatBar";
import { useEffect, useState, useRef } from "react";
const ChatPage = ({ socket }) => {
const [messages, setMessages] = useState([]);
const [typingStatus, setTypingStatus] = useState("");
const lastMessageRef = useRef(null);

useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
    }, [socket, messages]);
    useEffect(() => {
    // 👇 scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
return (
<div className="chat">
<ChatBar socket={socket} />
<div className="chat__main">
<ChatBody
typingStatus={typingStatus}
messages={messages}
lastMessageRef={lastMessageRef}
/>
<ChatFooter socket={socket} />
</div>
</div>
);
};
export default ChatPage;
