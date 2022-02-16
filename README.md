## Glanner

글래너는 온라인 상의 다양한 그룹 활동을 위한 웹 어플리케이션 플래너 플랫폼으로 개인 및 그룹의 다양한 일정을 관리하기 위한 서비스를 제공합니다.

[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/querydsl.github.io.svg)](https://butter-node-0ad.notion.site/Glanner-b16e6b30b2d64e76b05c75cfccc0862f)

## Logo

![logo](http://localhost:3000/static/media/glannerLogo1.3190f666fb1ee6ffc4c2.png)

 사각형으로 깔끔하게 캘린더를 표현

편한 느낌을 주는 분홍색 컬러로 사용

## 개발 환경

#### Front
<img src="https://img.shields.io/badge/-MUI-007396?style=flat-square"/>
<img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=black" height="20px">
<img src="https://img.shields.io/badge/React_router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" height="20px">
<img src="https://img.shields.io/badge/redux-764ABC?style=flat-square&logo=redux&logoColor=white" height="20px">
<img src="https://img.shields.io/badge/-Axios-007396?style=flat-square"/>
<img src="https://img.shields.io/badge/-OpenVidu-007396?style=flat-square"/>

#### Backend
<img src="https://img.shields.io/badge/-JAVA-007396?style=flat-square&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/-Spring Boot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/> 
<img src="https://img.shields.io/badge/-Spring%20Data%20JPA-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>
<img src="https://img.shields.io/badge/-Querydsl-181717?style=flat-square&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/-Spring%20Security-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>
<img src="https://img.shields.io/badge/-Spring%20AOP-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>
<img src="https://img.shields.io/badge/-JWT-007396?style=flat-square&logo=java&logoColor=white"/>
<img src="https://img.shields.io/badge/-JUnit5-007396?style=flat-square&logo=java&logoColor=white"/>
<img src="https://img.shields.io/badge/-Mockito-007396?style=flat-square&logo=java&logoColor=white"/>
<img src="https://img.shields.io/badge/-Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=black"/>
<img src="https://img.shields.io/badge/-Gradle-02303A?style=flat-square&logo=Gradle"/>

#### DB
<img src="https://img.shields.io/badge/-mariaDB-003545?style=flat-square&logo=mariaDB&logoColor=white">
<img src="https://img.shields.io/badge/-H2-181717?style=flat-square"/>

#### DevOps
<img src="https://img.shields.io/badge/-Amazon AWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white"/>
<img src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
<img src="https://img.shields.io/badge/-Ngnix-181717?style=flat-square"/>
<img src="https://img.shields.io/badge/-Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=black"/>
<img src="https://img.shields.io/badge/-Jira-0052CC?style=flat-square&logo=jira&logoColor=black"/>

#### Development methodology
<img src="https://img.shields.io/badge/-Doamin%20Driven%20Desigin-181717?style=flat-square"/>
<img src="https://img.shields.io/badge/-SOLID-181717?style=flat-square"/>
<img src="https://img.shields.io/badge/-Test%20Driven%20Design-181717?style=flat-square"/>
<img src="https://img.shields.io/badge/-Agile-181717?style=flat-square"/>
## 팀원

#### Backend

정주헌

이정음

안지애

#### Frontend

송민주

안재영

나지엽

## 폴더 구조

#### BE Directory

```
.
└── main
    ├── generated
    ├── java
    │   └── com
    │       └── glanner
    │       ├── api
    │       │   ├── controller
    │       │   ├── service
    │       │   ├── queryrepository
    │       │   ├── exception
    │       │   │   └── handler
    │       │   ├── dto
    │       │   │   ├── request
    │       │   │   └── response
    │       ├── core
    │       │   ├── domain
    │       │   │   ├── user
    │       │   │   ├── glanner
    │       │   │   └── board
    │       │   └── repository
    │       ├── security
    │       │   └── jwt
    │       ├── aop
    │       │   ├── aspect
    │       │   ├── annotation
    │       │   └── logtrace
    │       └── config
    └── resources

```

#### FE Directory

```
Glanner
└── src
    ├── App.js
    ├── Modal
    │	├── ModalContainer.js
    │	├── ModalPresenter.js
    │	└── Modal.style.js
    │	
    ├── Components 
    │   ├── Common
    │   │   ├── Footer.js
    │   │   ├── App.js
    │   │   ├── SideNavigationBar.js
    │   │   ├── Router.js
    │   │   └── globalStyle.js
    │   ├── Member
    │   │   ├── SignUp.js
    │   │   └── SignIn.js
    ├── Routes
    │   ├── Community
    │   │   ├── Community.style.js
    │   │   ├── CommunityContainer.js
    │   │   └── CommunityPresenter.js
    │   ├── Member
    │   │   ├── SignUp
    │		│   │   ├── SignUp.js
    │  	│   │   └── SignUp.style.js
    │   │   └── SignIn
    │		│   │   ├── SignIn.js
    │  	│   │   └── SignIn.style.js
    │   ├── Conference
    │   │   ├── Conference.style.js
    │   │   ├── ConferenceContainer.js
    │   │   └── ConferencePresenter.js
    │   ├── Planner
    │   │   ├── Planner.style.js
    │   │   ├── PlannerContainer.js
    │   │   └── PlannerPresenter.js
    │   ├── Setting
    │   │   ├── .style.js
    │   │   ├── CurriculumContainer.js
    │   │   └── CurriculumPresenter.js
    │   └── Review
    │       ├── Review.style.js
    │       ├── ReviewContainer.js
    │       └── ReviewPresenter.js
    ├── api
    │   └── api.js
    ├── assets  // 이미지 파일 등 관리
    ├── data
    │   └── classInformation.json
    ├── index.js
    ├── react-app-env.d.js
    └── store
        └── reducers
            ├── ClassInformation.js
            └── index.js
```

프로젝트 실행방법

