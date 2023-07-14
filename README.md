# PB 투자자 매칭 플랫폼 관리자 페이지

## 💁🏻 프로젝트 소개
![머니브릿지](https://github.com/FINALALT1/money-bridge/assets/100064540/ad37937b-2f8e-4e17-aee7-d4606133ece3)
> PB와 투자자를 이어주는 위치기반의 매칭 플랫폼 관리자 페이지<br />

#### ⏰ 개발 기간

- 2023.06.27 ~ 2023. 07. 14

#### 🔗 배포 사이트

- [💻 PB 투자자 매칭 플랫폼 💻]([https://lupintech.netlify.app/](https://www.moneybridge.co.kr/))
- 관리자 로그인 후 관리자만 접근가능

## 👥 팀원 소개
| 권범준(팀장)                                                                                        | 유선주(팀원)                                                                                 | 이병욱(팀원)                                                                                | 
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![title](https://avatars.githubusercontent.com/u/100064540?v=4)                                     | ![title](https://avatars.githubusercontent.com/u/102499959?v=4)                               | ![title](https://avatars.githubusercontent.com/u/75530371?v=4)                              | ![title](https://avatars.githubusercontent.com/u/83224463?v=4)                                              |
| [@kjungit](https://github.com/kjungit)                                                          | [@yousunzoo](https://github.com/yousunzoo)                                                   | [@lbw3973](https://github.com/lbw3973)                                                    | 
|📍공지사항<br />📍FAQ |📍관리자 로그인 <br/> 📍상담현황 </br>📍게시물 관리  | 📍PB 회원가입 승인<br />📍회원관리<br />📍지점 관리| 
| [권범준 작업 내역](https://github.com/FINALALT1/admin/issues?q=author%3Akjungit+) | [유선주 작업 내역](https://github.com/FINALALT1/admin/issues?q=author%3Ayousunzoo+) | [이병욱 작업 내역](https://github.com/FINALALT1/admin/issues?q=author%3Albw3973) |


## 💻 개발 환경
### 🔧 스킬셋
![FE_skillset](https://github.com/FINALALT1/admin/assets/100064540/9bcf8808-d216-4798-af21-64891fd4787b)


<br /><br />

### 📁 프로젝트 폴더 구조
```
money-bridge
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ assets
│     └─ images
├─ README.md
├─ src
│  ├─ app
│  │  ├─ analysis
│  │  ├─ apis
│  │  ├─ branch
│  │  ├─ contents
│  │  ├─ counseling
│  │  ├─ faq
│  │  ├─ joinAccept
│  │  ├─ login
│  │  ├─ notice
│  │  └─ users
│  ├─ components
│  │  └─ common
│  ├─ constants
│  ├─ hooks
│  ├─ middleware.ts
│  ├─ store
│  ├─ styles
│  ├─ types
│  └─ utils
├─ tailwind.config.js
├─ tsconfig.json
└─ yarn.lock
```
<br />

### 🖥 프로젝트 미리보기

|**대시보드**|
| --- |
|<p align="center"><img src="https://github.com/FINALALT1/admin/assets/100064540/4892e46f-7f8d-4c26-9b84-e467b17a5bfe"></p>
|<p align="center">대시보드에서는 현재 상담현황 및 승인 대기 PB 수를 확인할 수 있습니다.</p>|

<br />

|**PB 회원가입 승인**|
| --- | 
|<p align="center"><img src="https://github.com/FINALALT1/admin/assets/100064540/7c1bbe83-ce15-4c7f-98e1-0da79fca8163"></p>|
|<p align="center">실제 PB인지 명함 확인 후 승인 및 거절을 할 수 있습니다.</p>|

<br />

|**회원 관리**|
| --- |
|<p align="center"><img src="https://github.com/FINALALT1/admin/assets/100064540/ee7787c3-4107-4a31-8f7d-9d4e32302354" ></p>|
|<p align="center">PB, 투자자 별로 관리가 가능하고 관리자 권한 여부를 지정할 수 있습니다.</p>|

<br />

|**상담 현황**|
| --- |
|<p align="center"><img src="https://github.com/FINALALT1/admin/assets/100064540/cf0047c9-1773-4974-9b0b-01b4ecb0c510"></p>|
|<p align="center">자세한 상담 현황들을 개별적으로 확인할 수 있습니다.</p>|

<br />

|**게시글 관리**|
| --- |
|<p align="center"><img src="https://github.com/FINALALT1/admin/assets/100064540/8bd1d06d-c07f-4550-b45e-9f27a9066e6b"></p>|
|<p align="center">작성된 게시글을 확인할 수 있으며, 댓글 관리 또한 가능합니다.</p>|

<br />

|**지점 관리**|
| --- |
|<p align="center"><img src="https://github.com/FINALALT1/admin/assets/100064540/574ad9d4-0820-4c2a-899d-20921caac105"></p>|
|<p align="center">증권자 지점을 등록, 수정, 삭제할 수 있습니다.</p>|

<br />


|**공지사항 관리**|
| --- |
|<p align="center"><img src="https://github.com/FINALALT1/admin/assets/100064540/03e0bbda-9271-4549-948b-fa4f21b18c94"></p>|
|<p align="center">공지사항을 등록, 수정, 삭제할 수 있습니다.</p>|

<br />

|**FAQ 관리**|
| --- |
|<p align="center"><img src="https://github.com/FINALALT1/admin/assets/100064540/4efca2d6-6331-4f02-8b2d-b564f8643996"></p>
|<p align="center">FAQ를 등록, 수정, 삭제할 수 있습니다.</p>|
