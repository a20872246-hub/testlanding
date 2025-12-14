# 📊 구글 시트 연동 설정 가이드

## 🎯 개요

랜딩 페이지에서 수집된 리드 데이터를 구글 시트에 자동으로 저장하는 방법입니다.

**구글 시트 ID**: `1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs`

---

## 📝 단계별 설정 방법

### 1단계: 구글 시트 열기

아래 링크를 클릭하여 구글 시트를 엽니다:

```
https://docs.google.com/spreadsheets/d/1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs/edit
```

### 2단계: Apps Script 에디터 열기

1. 구글 시트 상단 메뉴에서 **확장 프로그램** 클릭
2. **Apps Script** 선택

### 3단계: 코드 붙여넣기

1. Apps Script 에디터가 열리면 기존 코드를 **모두 삭제**
2. 프로젝트의 `google-apps-script.gs` 파일 내용을 **복사**
3. Apps Script 에디터에 **붙여넣기**
4. **저장** (Ctrl+S 또는 💾 아이콘)

### 4단계: 웹 앱으로 배포

1. 상단의 **배포** 버튼 클릭
2. **새 배포** 선택
3. **유형 선택** 옆의 ⚙️ 아이콘 클릭
4. **웹 앱** 선택
5. 다음 정보 입력:
   - **설명**: `Dog Training Lead Collection`
   - **실행 계정**: `나`
   - **액세스 권한**: `모든 사용자`
6. **배포** 클릭

### 5단계: 권한 승인

1. **액세스 승인** 클릭
2. Google 계정 선택
3. **고급** 클릭
4. **[프로젝트 이름](으)로 이동** 클릭
5. **허용** 클릭

### 6단계: 웹 앱 URL 복사

배포가 완료되면 **웹 앱 URL**이 표시됩니다.

```
https://script.google.com/macros/s/AKfycby.../exec
```

이 URL을 **복사**하세요.

### 7단계: 랜딩 페이지에 URL 입력

1. `components/sections/CTA.tsx` 파일을 엽니다
2. 17번 라인을 찾습니다:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. 복사한 URL로 변경:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. 저장합니다

---

## ✅ 테스트하기

### Apps Script에서 테스트

1. Apps Script 에디터에서 `testConnection` 함수 선택
2. **실행** 버튼 클릭
3. 로그 확인: `✅ 스프레드시트 연결 성공!` 메시지가 나오면 성공

### 웹에서 테스트

1. 복사한 웹 앱 URL을 브라우저에서 열기
2. 다음과 같은 응답이 나오면 성공:
   ```json
   {
     "status": "ok",
     "message": "Dog Training Lead Collection API is running!",
     "spreadsheetId": "1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs"
   }
   ```

### 랜딩 페이지에서 테스트

1. 개발 서버 실행: `npm run dev`
2. http://localhost:3000 접속
3. 폼 섹션까지 스크롤
4. 테스트 데이터 입력:
   - 이름: 테스트
   - 연락처: 010-1234-5678
   - 이메일: test@example.com
   - 강아지 품종/나이: 골든 리트리버, 3세
   - 문제 행동: 테스트입니다
5. **무료 상담 신청하기** 버튼 클릭
6. "신청이 완료되었습니다!" 메시지 확인
7. 구글 시트 새로고침하여 데이터 확인

---

## 📊 구글 시트 구조

폼 데이터는 다음과 같이 저장됩니다:

| 접수 시간 | 이름 | 연락처 | 이메일 | 강아지 품종/나이 | 문제 행동 설명 | 상태 |
|---------|------|-------|--------|--------------|-------------|------|
| 2024-12-14 10:30:45 | 홍길동 | 010-1234-5678 | test@example.com | 골든 리트리버, 3세 | 짖음 문제 | 신규 |

### 열 설명

- **접수 시간**: 신청한 시간 (한국 시간)
- **이름**: 신청자 이름
- **연락처**: 전화번호
- **이메일**: 이메일 주소
- **강아지 품종/나이**: 강아지 정보
- **문제 행동 설명**: 고민 내용
- **상태**: 처리 상태 (신규/진행중/완료)

---

## 🔔 이메일 알림 설정 (선택사항)

새로운 신청이 들어올 때마다 이메일로 알림을 받으려면:

### 1. Apps Script 코드 수정

`google-apps-script.gs` 파일의 143번 라인 근처:

```javascript
function sendEmailNotification(data, timestamp) {
  // 이 부분의 주석을 해제하세요
  const recipient = 'your-email@gmail.com'; // 실제 이메일로 변경
  const subject = '[새 상담 신청] ' + data.name + ' 님';
  // ... 나머지 코드
```

### 2. 이메일 주소 입력

`YOUR_EMAIL@gmail.com`을 실제 이메일 주소로 변경:

```javascript
const recipient = 'your-actual-email@gmail.com';
```

### 3. 주석 해제

`/*`와 `*/`를 삭제하여 주석을 해제합니다.

### 4. 저장 및 재배포

1. **저장** (Ctrl+S)
2. **배포 > 배포 관리**
3. 연필 아이콘(편집) 클릭
4. **버전 > 새 버전**
5. **배포** 클릭

---

## 🔧 문제 해결

### 문제: "권한이 없습니다" 오류

**해결방법**:
- Apps Script 배포 시 **실행 계정**을 **"나"**로 설정했는지 확인
- **액세스 권한**을 **"모든 사용자"**로 설정했는지 확인

### 문제: 데이터가 시트에 저장되지 않음

**해결방법**:
1. 브라우저 개발자 도구 (F12) 열기
2. Console 탭에서 에러 확인
3. 웹 앱 URL이 올바른지 확인
4. Apps Script에서 `testConnection` 함수 실행하여 연결 테스트

### 문제: CORS 에러

**해결방법**:
- `mode: 'no-cors'` 설정이 되어 있는지 확인 (CTA.tsx에 이미 설정됨)
- 웹 앱 URL이 `/exec`로 끝나는지 확인 (`/dev`가 아님)

### 문제: 이메일 알림이 안 옴

**해결방법**:
- 주석이 제대로 해제되었는지 확인
- 이메일 주소가 올바른지 확인
- Gmail 스팸 폴더 확인
- Apps Script 로그에서 에러 확인

---

## 📈 데이터 관리 팁

### 상태 관리

상태 열을 사용하여 리드를 관리하세요:
- **신규**: 새로 들어온 신청
- **진행중**: 상담 진행 중
- **완료**: 상담 완료
- **보류**: 추후 연락

### 필터 사용

1. 헤더 행 선택
2. **데이터 > 필터 만들기**
3. 상태별로 필터링하여 리드 관리

### 조건부 서식

상태에 따라 색상 표시:
1. **상태** 열 선택
2. **서식 > 조건부 서식**
3. 규칙 추가:
   - 신규 → 노란색
   - 진행중 → 파란색
   - 완료 → 초록색

---

## 🎉 완료!

이제 랜딩 페이지에서 제출된 모든 데이터가 자동으로 구글 시트에 저장됩니다!

구글 시트 바로가기:
https://docs.google.com/spreadsheets/d/1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs/edit

문제가 있으시면 `testConnection()` 함수를 실행하여 연결 상태를 확인하세요.
