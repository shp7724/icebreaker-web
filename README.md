# Getting started

### 로컬 실행
```
cd icebreaker
yarn
yarn dev
```

### 도커 배포
```shell
 docker build -t pfcjeong/icebreaker-web:0.0.1-SNAPSHOT . 
 docker docker run -p 3000:80 pfcjeong/icebreaker-web:0.0.1-SNAPSHOT
 # localhost:3000으로 도커 잘 빌드되었는지 확인
 docker push pfcjeong/icebreaker-web:0.0.1-SNAPSHOT 
```