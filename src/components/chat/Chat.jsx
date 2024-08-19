import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styled from 'styled-components';

function Chat({ currentUser, targetUser, onClose }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        // WebSocket 연결 초기화
        const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws`);
        const client = Stomp.over(socket);

        client.connect({}, () => {
            // 현재 로그인한 사용자 큐에 구독
            client.subscribe(`/user/${currentUser}/queue/messages`, (response) => {
                const newMessage = JSON.parse(response.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });

        setStompClient(client);

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, [currentUser]);

    const sendMessage = () => {
        if (stompClient && message.trim() !== '') {
            const chatMessage = {
                receiver: targetUser,
                content: message,
            };

            // 서버로 메시지 전송
            stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
            setMessage('');  // 메시지 전송 후 입력 필드 비우기
        }
    };

    return (
        <ChatContainer>
            <ChatHeader>
                <h3>{targetUser}님과 채팅</h3>
                <button onClick={onClose}>닫기</button>
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
                    placeholder="메시지를 입력하세요..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <ChatSendButton onClick={sendMessage}>전송</ChatSendButton>
            </ChatInputContainer>
        </ChatContainer>
    );
}

export default Chat;

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
