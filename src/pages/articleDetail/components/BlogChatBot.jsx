import React, { useState } from "react";
import { ChatBotWidget } from "chatbot-widget-ui";
import { askChatBot } from "../../../services/index/chatbot";
import { images } from "../../../constants";


const BlogChatBot = () => {
  // Conversation history
  const [messages, setMessages] = useState([]);

  // Called by the widget whenever the user sends a message
  const customApiCall = async (message) => {
    console.log("User message:", message);
    try {
      const answer = await askChatBot(message);
      console.log("Bot answer:", answer);
      return answer; // must return a string
    } catch (err) {
      console.error("Error:", err);
      return "Oops! Something went wrong while getting an answer.";
    }
  };

  // Fires when the widget receives the bot’s response
  const handleBotResponse = (response) => {
    console.log("Bot response:", response);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
  };

  // Fires when a new user message is added to the conversation
  const handleNewMessage = (message) => {
    console.log("New message object:", message);
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatBotWidget
      callApi={customApiCall}
      onBotResponse={handleBotResponse}
      handleNewMessage={handleNewMessage}
      messages={messages}
      primaryColor="#1565D8"
      chatbotName="HelperBot"
      inputMsgPlaceholder="Type your question…"
      isTypingMessage="HelperBot is typing…"
      IncommingErrMsg="Oops! Something went wrong. Try again."
chatIcon={<img src={images.ChatIcon} alt="open chat" style={{ width: 28, height: 28 }} />}
botIcon={<img src={images.ChatIcon} alt="bot avatar" style={{ width: 28, height: 28 }} />}
      botFontStyle={{
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "15px",
        color: "#333",
        lineHeight: "1.6",
      }}
      typingFontStyle={{
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "13px",
        color: "#777",
        fontStyle: "italic",
      }}
      userBubbleStyle={{
        backgroundColor: "#1565D8",
        color: "#fff",
        borderRadius: "18px",
        padding: "8px 14px",
      }}
      botBubbleStyle={{
        backgroundColor: "#f5f5f5",
        color: "#222",
        borderRadius: "18px",
        padding: "8px 14px",
      }}
    />
  );
};

export default BlogChatBot;
