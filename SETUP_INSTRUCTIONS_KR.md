# 🚨 구글 시트 연동 긴급 수정 가이드

## 문제 상황
사용자가 입력한 데이터가 구글 시트에 저장되지 않는 문제가 발생했습니다.

**에러 메시지**: `ReferenceError: SPREADSHEET_ID is not defined`

## 원인
Google Apps Script에 코드가 제대로 업로드되지 않았거나, 이전 버전이 배포되어 있습니다.

---

## ✅ 해결 방법 (단계별)

### 1단계: 구글 시트 열기
```
https://docs.google.com/spreadsheets/d/1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs/edit
```

### 2단계: Apps Script 에디터 열기
1. 구글 시트 상단 메뉴에서 **확장 프로그램** 클릭
2. **Apps Script** 선택

### 3단계: 기존 코드 완전히 삭제
- Apps Script 에디터에 있는 **모든 코드를 삭제**하세요
- `function myFunction() { ... }` 같은 기본 코드도 모두 삭제

### 4단계: 새 코드 복사 & 붙여넣기
1. 프로젝트 폴더의 `google-apps-script.gs` 파일을 엽니다
2. **전체 코드를 복사**합니다 (Cmd+A → Cmd+C)
3. Apps Script 에디터에 **붙여넣기**합니다 (Cmd+V)

### 5단계: 저장
- **Cmd+S** 또는 상단의 💾 아이콘 클릭
- 프로젝트 이름을 "Dog Training Lead Collector"로 변경 (선택사항)

### 6단계: 테스트 실행
1. 함수 선택 드롭다운에서 **`testConnection`** 선택
2. **실행** 버튼 (▶️) 클릭
3. 권한 요청 시:
   - **권한 검토** 클릭
   - 구글 계정 선택
   - **고급** 클릭
   - **[프로젝트 이름](으)로 이동** 클릭
   - **허용** 클릭
4. 실행 로그 확인 (하단 로그 패널):
   - `✅ 스프레드시트 연결 성공!` 메시지가 나오면 성공

### 7단계: 기존 배포 삭제 및 재배포

#### 7-1. 기존 배포 삭제
1. 상단 **배포** 버튼 클릭
2. **배포 관리** 선택
3. 기존 배포 옆의 **⋮** (점 3개) 클릭
4. **보관처리** 선택

#### 7-2. 새 배포 생성
1. **배포** > **새 배포** 클릭
2. **유형 선택** 옆의 ⚙️ 아이콘 클릭
3. **웹 앱** 선택
4. 설정:
   - **설명**: `Dog Training Lead Collection v2`
   - **실행 계정**: **나**
   - **액세스 권한**: **모든 사용자**
5. **배포** 클릭

### 8단계: 새 웹 앱 URL 복사
배포 완료 후 표시되는 **웹 앱 URL**을 복사합니다:
```
https://script.google.com/macros/s/[NEW_DEPLOYMENT_ID]/exec
```

### 9단계: 랜딩 페이지에 새 URL 업데이트
1. `components/sections/CTA.tsx` 파일을 엽니다
2. 17번 라인을 찾습니다:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqeLMjIlHjOhLamB3jVVsuhI5eSHfQnggwZ23y9Ujwyrk3UmANXMcW3NXCz_7WhzcG/exec';
   ```
3. 새로 복사한 URL로 변경합니다
4. 저장 (Cmd+S)

---

## 🧪 테스트 방법

### 방법 1: 테스트 HTML 파일 사용
1. 프로젝트 폴더의 `test-form.html` 파일을 브라우저에서 엽니다
2. 파일 상단의 `GOOGLE_SCRIPT_URL`을 새 URL로 변경합니다
3. 테스트 데이터를 입력하고 전송합니다
4. 로그 섹션에서 전송 결과를 확인합니다
5. 구글 시트를 새로고침하여 데이터가 저장되었는지 확인합니다

### 방법 2: 실제 랜딩 페이지 테스트
1. 개발 서버가 실행 중인지 확인: `npm run dev`
2. http://localhost:3000 접속
3. 폼 섹션까지 스크롤
4. 테스트 데이터 입력:
   - 이름: 테스트
   - 연락처: 010-1234-5678
   - 이메일: test@example.com
   - 강아지 품종/나이: 골든 리트리버, 3세
   - 문제 행동: 테스트입니다
5. **무료 상담 신청하기** 버튼 클릭
6. 브라우저 개발자 도구 (F12) → Console 탭 확인
   - `📤 전송 데이터:` 로그 확인
   - `✅ 전송 완료:` 로그 확인
7. 구글 시트 새로고침하여 데이터 확인

### 방법 3: cURL로 직접 테스트
```bash
curl -X POST "https://script.google.com/macros/s/[YOUR_NEW_DEPLOYMENT_ID]/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "테스트",
    "phone": "010-1234-5678",
    "email": "test@example.com",
    "dogBreed": "골든 리트리버, 3세",
    "issue": "테스트입니다"
  }'
```

---

## 📊 예상 결과

### 구글 시트에서 확인할 내용

첫 번째 행 (헤더):
```
| 접수 시간 | 이름 | 연락처 | 이메일 | 강아지 품종/나이 | 문제 행동 설명 | 상태 |
```
- 배경색: 보라색 (#6B46C1)
- 글자색: 흰색
- 글꼴: 굵게
- 정렬: 가운데

두 번째 행 이후 (데이터):
```
| 2024-12-14 11:30:45 | 테스트 | 010-1234-5678 | test@example.com | 골든 리트리버, 3세 | 테스트입니다 | 신규 |
```
- 정렬: 왼쪽

---

## 🔧 문제 해결

### 문제 1: "권한이 없습니다" 오류
**해결**:
- 7단계의 배포 설정에서 **액세스 권한**을 **"모든 사용자"**로 설정했는지 확인
- 재배포 필요

### 문제 2: 여전히 `SPREADSHEET_ID is not defined` 에러
**해결**:
- Apps Script 에디터에서 코드 첫 부분에 다음이 있는지 확인:
  ```javascript
  const SPREADSHEET_ID = '1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs';
  ```
- 없다면 3-5단계를 다시 진행 (코드 전체 재복사)

### 문제 3: 데이터가 여전히 저장되지 않음
**해결**:
1. Apps Script 에디터에서 **보기** > **로그** 클릭
2. 실제 폼 제출 후 로그 확인
3. 에러 메시지가 있다면 해당 내용 확인

### 문제 4: CORS 에러
**해결**:
- `CTA.tsx`에 `mode: 'no-cors'` 설정이 되어 있는지 확인
- 웹 앱 URL이 `/exec`로 끝나는지 확인 (NOT `/dev`)

---

## ✨ 완료 확인

다음 사항들이 모두 확인되면 성공:

- [ ] Apps Script에서 `testConnection` 실행 시 "✅ 스프레드시트 연결 성공!" 메시지
- [ ] 구글 시트에 보라색 헤더가 생성됨
- [ ] 테스트 데이터 제출 시 구글 시트에 새 행이 추가됨
- [ ] 접수 시간이 한국 시간으로 표시됨
- [ ] 상태가 "신규"로 자동 설정됨

---

## 📞 추가 도움이 필요한 경우

1. Apps Script 실행 로그 스크린샷
2. 브라우저 개발자 도구 Console 로그 스크린샷
3. 구글 시트 현재 상태 스크린샷

위 3가지를 준비하면 문제 해결이 빠릅니다.
