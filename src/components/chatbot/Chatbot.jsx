import React, { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

function Chatbot() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState('user1');
    const [userMessage, setUserMessage] = useState('');
    const chatbotContentRef = useRef(null);
    const chatbotInputRef = useRef(null);
    const stompClientRef = useRef(null);

    // 챗봇 열기/닫기
    const toggleChatbot = () => {
        setIsChatbotOpen((prev) => {
            const newState = !prev;
            if (newState) {
                fetchPreviousMessages();
            }
            return newState;
        });
    };

    const closeChatbot = () => {
        setIsChatbotOpen(false);
    };

    const sendMessage = () => {
        const trimmedMessage = userMessage.trim();

        if (trimmedMessage) {
            addMessageToChatbot(trimmedMessage, 'user');
            sendMessageToServer(trimmedMessage);
        }

        setUserMessage(''); // 입력값 초기화
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const addMessageToChatbot = (message, sender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { message, sender },
        ]);
    };

    useEffect(() => {
        if (isChatbotOpen && chatbotContentRef.current) {
            chatbotContentRef.current.scrollTop = chatbotContentRef.current.scrollHeight;
        }
    }, [isChatbotOpen, messages]);  // 챗봇 열릴 때와 메시지 추가될 때마다 실행

    useEffect(() => {
        const socket = new SockJS('http://localhost:8090/chat');
        stompClientRef.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('웹소켓 연결 성공!');
                stompClientRef.current.subscribe('/topic/response', (messageOutput) => {
                    const botMessage = messageOutput.body;
                    addMessageToChatbot(botMessage, 'bot');
                });
            },
            onStompError: (error) => {
                console.error('STOMP 연결 오류:', error);
            },
        });

        stompClientRef.current.activate();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    }, [userId, isChatbotOpen]);

    const sendMessageToServer = (message) => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            const messageObject = { userId, userMessage: message };

            stompClientRef.current.publish({
                destination: '/app/ask',
                body: JSON.stringify(messageObject),
            });
        } else {
            console.error('STOMP 연결이 열리지 않았습니다.');
        }
    };

    const fetchPreviousMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8090/api/v1/chat/previousMessages', {
                params: { userId },
            });

            if (Array.isArray(response.data)) {
                const formattedMessages = response.data
                    .map((msg) => [
                        { message: msg.userMessage, sender: 'user' },
                        { message: msg.botResponse, sender: 'bot' },
                    ])
                    .flat();

                setMessages(formattedMessages);
            } else {
                console.error('서버에서 잘못된 형식의 응답을 받았습니다.');
            }
        } catch (error) {
            console.error('이전 메시지 불러오기 오류:', error);
        }
    };

    return (
        <div className="chatbot-container">
            <button className="chatbot-button" onClick={toggleChatbot}>
                💬
            </button>

            <div className={`chatbot-window ${isChatbotOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <span>Chatbot</span>
                    <button className="close-button" onClick={closeChatbot}>
                        ×
                    </button>
                </div>
                <div className="chatbot-content" ref={chatbotContentRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.message}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    className="chatbot-input"
                    ref={chatbotInputRef}
                    autoComplete="off"
                    placeholder="메시지를 입력하세요..."
                    onKeyPress={handleKeyPress}
                    value={userMessage}  // state로 관리하는 값
                    onChange={(e) => setUserMessage(e.target.value)}  // onChange로 상태 업데이트
                />
                <button className="send-button" onClick={sendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
