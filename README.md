### .gitmessage.txt 설정 방법
```
git config --global commit.template /path/to/.gitmessage.txt
```
/path/to 는 클론받은 파일의 path 입니다.

### 적용 여부 확인
```
git config --get commit.template
```
출력이 .gitmessage.txt 경로를 가리키면 성공입니다.
