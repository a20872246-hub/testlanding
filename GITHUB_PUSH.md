# 🚀 GitHub에 푸시하기

## ✅ Git 설정 완료

```
✓ Git 초기화 완료
✓ 사용자 이름: 김지민
✓ 이메일: a20872246@gmail.com
✓ 첫 커밋 완료 (52 files changed, 11787 insertions)
```

---

## 📦 GitHub 저장소 생성 및 푸시

### 1단계: GitHub 저장소 생성

1. **GitHub 접속**: https://github.com/new
2. **Repository name**: `dog-training-landing` (또는 원하는 이름)
3. **Description** (선택사항): "강아지 행동 교정 전문 랜딩 페이지 - Next.js 14 + Google Sheets 연동"
4. **Public** 또는 **Private** 선택
5. ⚠️ **중요**: 다음 항목들을 **체크하지 마세요**:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. **Create repository** 클릭

### 2단계: 로컬 저장소 연결 및 푸시

GitHub에서 저장소를 생성하면 나오는 명령어 중에서 **"…or push an existing repository from the command line"** 부분의 명령어를 사용합니다:

```bash
cd /Users/palla/Desktop/ai/dog-training-landing

# GitHub 원격 저장소 연결 (YOUR-USERNAME을 본인의 GitHub 아이디로 변경!)
git remote add origin https://github.com/YOUR-USERNAME/dog-training-landing.git

# 브랜치 이름 확인 및 변경 (main으로)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

### 3단계: 인증

GitHub 인증 방법 2가지:

#### 옵션 1: Personal Access Token (권장)
1. **GitHub Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)** 클릭
3. Note: `dog-training-landing`
4. Expiration: 원하는 기간 선택
5. Scopes: `repo` 체크
6. **Generate token** 클릭
7. 토큰 복사 (다시 볼 수 없으니 저장!)
8. `git push` 실행 시:
   - Username: GitHub 아이디
   - Password: 복사한 토큰

#### 옵션 2: SSH Key
```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "a20872246@gmail.com"

# 공개키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub Settings → SSH and GPG keys → New SSH key
# 복사한 공개키 붙여넣기

# 원격 저장소 URL을 SSH로 변경
git remote set-url origin git@github.com:YOUR-USERNAME/dog-training-landing.git
```

---

## 🔄 푸시 후 확인

푸시가 완료되면:

1. **GitHub 저장소 페이지**에서 코드 확인
2. **Vercel 자동 배포** (GitHub 연동 시)
   - Vercel 대시보드에서 GitHub 저장소 Import
   - 이후 자동 배포 설정 완료

---

## 📝 빠른 명령어 (복사해서 사용)

```bash
# 1. GitHub 저장소 연결 (YOUR-USERNAME 변경 필수!)
git remote add origin https://github.com/YOUR-USERNAME/dog-training-landing.git

# 2. 브랜치 main으로 설정
git branch -M main

# 3. 푸시
git push -u origin main
```

---

## 🎯 다음 커밋 방법

코드 수정 후:

```bash
# 변경사항 확인
git status

# 모든 변경사항 스테이징
git add .

# 커밋 (의미 있는 메시지 작성)
git commit -m "Update: 새로운 기능 추가"

# 푸시
git push
```

---

## ⚡ Vercel GitHub 연동 (선택사항)

GitHub에 푸시 완료 후:

1. **Vercel 대시보드**: https://vercel.com
2. **Import Project**
3. **GitHub 저장소** 선택: `dog-training-landing`
4. **Import** 클릭
5. **Deploy**

이후 GitHub에 푸시할 때마다 Vercel이 자동으로 재배포합니다! 🚀

---

## 🔧 문제 해결

### "remote origin already exists" 에러
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/dog-training-landing.git
```

### 인증 실패
- Personal Access Token 재발급
- 또는 SSH 키 사용

### 푸시 거부 (rejected)
```bash
# 강제 푸시 (처음 한 번만, 주의!)
git push -u origin main --force
```

---

## 📚 Git 기본 명령어

```bash
# 상태 확인
git status

# 변경 이력
git log --oneline

# 브랜치 확인
git branch

# 원격 저장소 확인
git remote -v
```

---

## 🎉 완료!

이제 코드가 GitHub에 안전하게 보관됩니다!

**저장소 URL**: `https://github.com/YOUR-USERNAME/dog-training-landing`

**다음 단계:**
1. ✅ GitHub에 푸시 완료
2. ✅ Vercel GitHub 연동 (자동 배포)
3. ✅ README.md 업데이트 (선택사항)
