import React, { useState } from "react";
import "./ChatBot.css";
import { askAI } from "../services/chatService";

function ChatBot() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Hi! I'm MediStock AI. Tell me your symptoms."
        }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message
        };

        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const reply = await askAI(message);

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: reply
                }
            ]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: "Something went wrong."
                }
            ]);
        }

        setLoading(false);
        setMessage("");
    };

    return (
        <>
            <button
                className="chat-button"
                onClick={() => setOpen(!open)}
            >
                💊
            </button>

            {open && (
                <div className="chat-box">

                    <div className="chat-header">
                        PharmaPulse AI
                    </div>

                    <div className="chat-body">

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={
                                    msg.sender === "user"
                                        ? "user-msg"
                                        : "bot-msg"
                                }
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="bot-msg">
                                Typing...
                            </div>
                        )}

                    </div>

                    <div className="chat-footer">

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="Describe symptoms..."
                        />

                        <button onClick={sendMessage}>
                            Send
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}

export default ChatBot;