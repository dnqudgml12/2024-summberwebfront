import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';

function ChatRoom() {
  const { roomId } = useParams();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const sender = queryParams.get('sender');
  const receiver = queryParams.get('receiver');

  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws`);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/chat-room/${roomId}`, (response) => {
        const newMessage = JSON.parse(response.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    setStompClient(client);

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (stompClient && message.trim() !== '') {
      const chatMessage = {
        roomId: roomId,
        content: message,
        sender: sender, // Use sender from query params
        receiver: receiver, // Use receiver from query params
      };

      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setMessage('');  // Clear message input
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <h3>Chat Room: {roomId}</h3>
      </ChatHeader>
      <ChatMessages>
        {messages.map((msg, index) => (
          <Message key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </Message>
        ))}
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <ChatSendButton onClick={sendMessage}>Send</ChatSendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
}

export default ChatRoom;

// Styled components (same as before)


const ChatContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    background: white;
    border: 1px solid #ccc;
    z-index: 1000;
`;

const ChatHeader = styled.div`
    padding: 10px;
    background: #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ChatMessages = styled.div`
    height: 200px;
    overflow-y: scroll;
    padding: 10px;
    background: #fafafa;
`;

const Message = styled.div`
    margin-bottom: 5px;
`;

const ChatInputContainer = styled.div`
    display: flex;
    padding: 10px;
    background: #f1f1f1;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
`;

const ChatSendButton = styled.button`
    padding: 5px 10px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
        background: #0056b3;
    }
`;
