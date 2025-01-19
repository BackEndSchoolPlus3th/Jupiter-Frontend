// 유효성 검사
document.addEventListener('DOMContentLoaded', () => {
    var input = document.getElementById("email");
    var errorEmail = document.getElementById("error-message-email");
    
    input.addEventListener('input', () => {
        if (!input.checkValidity()){
            // 유효하지 않은 입력
            input.style.border = '1px solid #d21e1e';
            input.style.backgroundColor = '#fff0f0';
            errorEmail.style.padding = '5px 10px 10px 10px';
            errorEmail.innerHTML = "정확하지 않은 이메일입니다.";
        } else {
            // 유효한 입력
            input.style.border = '';
            input.style.setProperty('background-color', '#f8f8f8', 'important');
            errorEmail.style.padding = '';
            errorEmail.innerHTML = '';
        }
    });
});

// 복구 테스트