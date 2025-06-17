# <header>리눅스활용실습</header>

터미널 탐험대

팀장: 2024403095 정서진

팀원: 2024403033 고은빈, 2024403082 장호정


## 외부 패키지 설치
1. npm
```bash
sudo apt install -y npm
npm install
```
2. python, pip
```bash
sudo apt install python3 python3-pip -y
#Python 가상환경 생성 및 활성화
python3 -m venv venv
source venv/bin/activate
```
3. Node.js
```bash
sudo apt install -y nodejs
```
4. MySQL, MySQL2
```bash
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql #자동 실행 설정
#sudo mysql 접속  
npm init -y #만약 package.json이 없다면 초기화 필요
npm install mysql2
```
5. Express, CORS
```bash
npm install express cors
```
6. vite
```bash
npm create vite@latest . #현재 폴더에 최신 버전 vite 설치
```

7. flask 관련
```bash
pip install flask flask-cors mysql-connector-python
```
9. React
```bash
npm install react-icons
npm install react-router-dom
```


## 빌드
1. 서버 노트북에서 IP 확인 및 코드 수정
```bash
sudo apt install curl
curl ifconfig.me
```
2. 백엔드 연결
```bash
python3 app.py
node server.js
```
3. 실행
```bash
npm run dev
```
