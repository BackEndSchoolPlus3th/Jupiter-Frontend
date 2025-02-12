import React, { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { jwtDecode } from "jwt-decode";
import SockJS from 'sockjs-client';
import axios from 'axios';
import './Chatbot.css';
import { API_BACKEND_URL } from '../../config';

function Chatbot() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userMessage, setUserMessage] = useState('');
    const chatbotContentRef = useRef(null);
    const chatbotInputRef = useRef(null);
    const stompClientRef = useRef(null);
    
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const decodedToken = jwt_decode(accessToken);  // 토큰 디코딩
                const id = decodedToken.id;
                setUserId(id);  // userId를 상태로 설정
            } catch (error) {
                console.error('토큰 디코딩 실패:', error);
            }
        }
    }, []);

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

    const formatMessage = (message) => {
        return <span dangerouslySetInnerHTML={{ __html: message }} />;
    };

    useEffect(() => {
        if (isChatbotOpen && chatbotContentRef.current) {
            chatbotContentRef.current.scrollTop = chatbotContentRef.current.scrollHeight;
        }
    }, [isChatbotOpen, messages]);  // 챗봇 열릴 때와 메시지 추가될 때마다 실행

    useEffect(() => {
        // const socket = new SockJS('http://localhost:8090/chat');
        const socket = new SockJS(`${API_BACKEND_URL}/chat`);
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
        if (!userId) return;

        try {
            // const response = await axios.get('http://localhost:8090/api/v1/chat/previousMessages', {
            const response = await axios.get(`${API_BACKEND_URL}/api/v1/chat/previousMessages`, {
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
        <div className="chatbot-container fixed bottom-5 right-5 z-50">
            {/* 챗봇 버튼 */}
            <button className="btn btn-primary btn-circle shadow-lg" onClick={toggleChatbot}>
                💬
            </button>

            {/* 챗봇 창 */}
            <div className={`chatbot-window card bg-base-100 shadow-lg transition-all duration-300 ${isChatbotOpen ? 'opacity-100 scale-100' : 'hidden opacity-0 scale-95'} fixed bottom-16 right-5 w-80`}>
                {/* 헤더 */}
                <div className="card-header chatbot-headdiv flex justify-between items-center p-3 rounded-t-lg">
                    <span className="chatbot-header text-white text-bold">영화 추천 도우미</span>
                    <button className="chatbot-header btn btn-sm btn-ghost text-white" onClick={closeChatbot}>
                        ×
                    </button>
                </div>

                {/* 채팅 내용 */}
                <div className="chatbot-content p-4 h-64 overflow-y-auto space-y-3" ref={chatbotContentRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat ${msg.sender === 'bot' ? 'chat-start' : 'chat-end'} chatbot-text`}>
                            <div className={`chat-bubble ${msg.sender === 'bot' ? 'chat-bubble' : 'chat-bubble-primary'} chatbot-text`}>
                                {formatMessage(msg.message)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 입력창 */}
                <div className="flex gap-2 p-3">
                    <input
                        type="text"
                        className="chatbot-input input input-bordered input-primary flex-1 box-white"
                        ref={chatbotInputRef}
                        autoComplete="off"
                        placeholder="메시지를 입력하세요..."
                        onKeyPress={handleKeyPress}
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={sendMessage}>
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
