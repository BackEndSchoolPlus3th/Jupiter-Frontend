// 채팅 메시지를 표시할 DOM
const chatbotContent = document.querySelector('.chatbot-content');
// 사용자 입력 필드
const chatbotInput = document.querySelector('.chatbot-input');
// 전송 버튼
const sendButton = document.querySelector('.send-button');

// 전역 변수 선언
let stompClient = null;

// 웹소켓 연결 함수 (연결 완료 후에만 메시지 전송 가능)
function connectWebSocket() {
  const socket = new SockJS('http://localhost:8080/chat'); // 서버의 WebSocket 엔드포인트
  stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);

    // 서버로부터 받은 메시지를 처리
    stompClient.subscribe("/topic/response", function (response) {
      const botMessage = response.body;
      addMessageToChatbot(botMessage, 'bot');
    });

    // 연결된 후에는 전송 버튼이 제대로 동작하도록 초기화
    sendButton.disabled = false;
  });

  // 연결이 끊어졌을 때 다시 연결 시도 (선택 사항)
  stompClient.onDisconnect = function() {
    sendButton.disabled = true;  // 연결이 끊어지면 전송 버튼 비활성화
    console.log("Disconnected. Trying to reconnect...");
    setTimeout(connectWebSocket, 5000);  // 5초 후에 다시 연결 시도
  };
}

// 처음에 웹소켓 연결 시작
connectWebSocket();

// 챗봇 관련 변수들
const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeButton = document.getElementById('closeButton');

// 챗봇 버튼 클릭 시 창 열기/닫기
chatbotButton.addEventListener('click', () => {
  console.log("Chatbot button clicked");  // 디버깅용 로그
  chatbotWindow.classList.toggle('open');
});

// 챗봇 창 닫기 버튼 클릭 시 창 닫기
closeButton.addEventListener('click', () => {
  chatbotWindow.classList.remove('open');
});

// 전송 버튼 클릭 이벤트
sendButton.addEventListener('click', () => {
  const userMessage = chatbotInput.value.trim();
  if (userMessage && stompClient !== null) {  // stompClient가 null이 아닌지 확인
    addMessageToChatbot(userMessage, 'user');
    stompClient.send("/app/ask", {}, userMessage);
    chatbotInput.value = ''; // 입력창 초기화
  } else {
    console.error("WebSocket is not connected.");
  }
});

// Enter 키를 눌러서 메시지 전송
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

// 메시지를 챗봇 창에 추가하는 함수
function addMessageToChatbot(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);  // sender에 따라 'user' 또는 'bot' 클래스 추가
  messageElement.textContent = message;
  chatbotContent.appendChild(messageElement);

  // 챗봇 내용이 많아지면 자동 스크롤
  chatbotContent.scrollTop = chatbotContent.scrollHeight;
}

// 메시지를 챗봇 창에 추가하는 함수
function addMessageToChatbot(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);  // sender에 따라 'user' 또는 'bot' 클래스 추가
  messageElement.textContent = message;
  chatbotContent.appendChild(messageElement);

  // 챗봇 내용이 많아지면 자동 스크롤
  chatbotContent.scrollTop = chatbotContent.scrollHeight;
}
