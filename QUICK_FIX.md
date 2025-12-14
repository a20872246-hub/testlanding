# ⚡ 빠른 해결 가이드

## 🔴 문제
구글 시트에 데이터가 저장되지 않음

## 🟢 원인
Apps Script 코드가 제대로 배포되지 않음

## ⚡ 5분 해결법

### 1️⃣ 구글 시트 열기
```
https://docs.google.com/spreadsheets/d/1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs/edit
```

### 2️⃣ Apps Script 열기
확장 프로그램 → Apps Script

### 3️⃣ 코드 교체
1. 기존 코드 **모두 삭제**
2. `google-apps-script.gs` 파일 열기
3. **전체 복사** (Cmd+A → Cmd+C)
4. Apps Script에 **붙여넣기** (Cmd+V)
5. **저장** (Cmd+S)

### 4️⃣ 테스트
1. 함수 선택: `testConnection`
2. 실행 ▶️
3. 권한 승인 (처음 한 번만)
4. 로그 확인: `✅ 스프레드시트 연결 성공!`

### 5️⃣ 재배포
1. **배포** → **배포 관리**
2. 기존 배포 → **⋮** → **보관처리**
3. **배포** → **새 배포**
4. 유형: **웹 앱**
5. 실행 계정: **나**
6. 액세스 권한: **모든 사용자**
7. **배포** 클릭
8. **웹 앱 URL 복사**

### 6️⃣ URL 업데이트
`components/sections/CTA.tsx` 파일:
```typescript
// 17번 라인
const GOOGLE_SCRIPT_URL = '여기에_새_URL_붙여넣기';
```

### 7️⃣ 테스트
```bash
npm run dev
```
http://localhost:3000 → 폼 제출 → 구글 시트 확인

---

## 📚 자세한 설명

더 자세한 내용은 다음 파일들을 참고하세요:

- **[README_DATABASE_FIX.md](./README_DATABASE_FIX.md)** - 전체 설명
- **[SETUP_INSTRUCTIONS_KR.md](./SETUP_INSTRUCTIONS_KR.md)** - 단계별 가이드
- **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** - 일반 설정 가이드

---

## ✅ 성공 확인

- [ ] Apps Script 테스트 성공
- [ ] 구글 시트에 보라색 헤더 생성
- [ ] 테스트 데이터 저장 확인

---

**문제 해결 완료 후 이 파일은 삭제해도 됩니다.**
