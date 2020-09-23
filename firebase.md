# firebase 설치 및 설정

## 1. node.js 설치하기 - 각 컴퓨터에서 한번만
- [nodejs.org](https://nodejs.org)에서 최신버전을 클릭하여 설치한다.
- 좌측 하단의 윈도우 검색에서 **cmd**를 입력하고 command 창을 띄운다.\
- 아래와 같이 설치가 잘 되었는지 확인한다.
```bash
node -v
npm -v
```

## 2. firebase를 설치하기 - 각 컴퓨터에서 한번만
- firebase.com에 가입한다.
- 1번의 cmd 창에서 아래와 같이 설치한다.
```bash
npm i -g firebase-tools
```
- 설치가 완료되면 본 firebase를 사용할 사용자 계정을 아래와 같이 등록한다.
```bash
firebase login

# 만약에 PC방 같은 공공장소에서 firebase를 사용한다면, 모든 작업이 완료된 후 야래와 같이 로그아웃 해야 한다.
firebase logout
```

## 3. firebase 프로젝트 만들기
- 폴더 확인 [C:\Users\1\Documents\임덕규\00.cdn]
```bash
firebase init

? Are you ready to proceed? (Y/n) => Yes

# 화살표 키로 원하는 서비스에 접근하여 Space로 선택한다. (보통 hosting만 선택)
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. Hosting: Configure and deploy Firebase Hosting sites

# firebase.com에서 프로젝트를 만들었다면 'Use an existing project' 를 선택한다.
? Please select an option: Use an existing project

# 'Use an existing project' 를 선택했다면 아래에 본인이 만든 프로젝트들이 나올 것이며 화살표 키로 이동하여 원하는 프로젝트에서 'Enter'키를 누른다.
? Select a default Firebase project for this directory: booldook-cdn (booldook-cdn)
i  Using project booldook-cdn (booldook-cdn)

# 위에서 선택한 서비스에 대한 Setup과정
=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your builds output directory.

# 호스팅 루트(root)폴더를 선택한다 - (public)기본값에서 'enter'한다 
? What do you want to use as your public directory? public

# index.html을 만들어 줄것인지 질문: Y로 선택
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
+  Wrote public/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...
i  Writing gitignore file to .gitignore...

# 아래의 글이 나오면 Setup이 성공적으로 이루어 졌음
+  Firebase initialization complete!
```