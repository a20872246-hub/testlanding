/**
 * Google Apps Script for Dog Training Landing Page
 * 구글 시트 ID: 1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs
 *
 * 📌 설정 방법:
 *
 * 1. 구글 시트 열기
 *    https://docs.google.com/spreadsheets/d/1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs/edit
 *
 * 2. 확장 프로그램 > Apps Script 클릭
 *
 * 3. 기존 코드를 모두 삭제하고 이 코드를 붙여넣기
 *
 * 4. 저장 (Ctrl+S 또는 💾 아이콘)
 *
 * 5. 배포 > 새 배포 클릭
 *
 * 6. 설정:
 *    - 유형 선택: ⚙️ > 웹 앱
 *    - 설명: "Dog Training Lead Collection"
 *    - 실행 계정: 나
 *    - 액세스 권한: 모든 사용자
 *
 * 7. 배포 클릭 → 권한 승인
 *
 * 8. 웹 앱 URL 복사 (예: https://script.google.com/macros/s/.../exec)
 *
 * 9. components/sections/CTA.tsx 파일에서
 *    GOOGLE_SCRIPT_URL을 복사한 URL로 변경
 */

// 스프레드시트 ID (직접 지정)
const SPREADSHEET_ID = '1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs';

/**
 * POST 요청 처리 - 폼 데이터 저장
 */
function doPost(e) {
  try {
    // 스프레드시트 연결
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();

    // 헤더 설정 (첫 행이 비어있으면 추가)
    if (sheet.getLastRow() === 0) {
      const headers = [
        '접수 시간',
        '이름',
        '연락처',
        '이메일',
        '강아지 품종/나이',
        '문제 행동 설명',
        '상태'
      ];

      sheet.appendRow(headers);

      // 헤더 스타일 설정
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#6B46C1');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }

    // POST 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 현재 시간 (한국 시간)
    const now = new Date();
    const koreaTime = Utilities.formatDate(now, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

    // 시트에 데이터 추가
    const newRow = [
      koreaTime,                    // 접수 시간
      data.name || '',              // 이름
      data.phone || '',             // 연락처
      data.email || '',             // 이메일
      data.dogBreed || '',          // 강아지 품종/나이
      data.issue || '',             // 문제 행동 설명
      '신규'                        // 상태
    ];

    sheet.appendRow(newRow);

    // 새로 추가된 행 스타일 설정
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, newRow.length);
    dataRange.setHorizontalAlignment('left');

    // 열 너비 자동 조정 (처음 한 번만)
    if (lastRow === 2) {
      sheet.autoResizeColumns(1, newRow.length);
    }

    // 이메일 알림 보내기 (선택사항)
    sendEmailNotification(data, koreaTime);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: '신청이 완료되었습니다.',
        timestamp: koreaTime
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 로깅
    Logger.log('Error in doPost: ' + error.toString());

    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: '신청 처리 중 오류가 발생했습니다: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리 - 테스트용
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Dog Training Lead Collection API is running!',
      timestamp: new Date().toISOString(),
      spreadsheetId: SPREADSHEET_ID
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 이메일 알림 전송 (선택사항)
 * 주의: 이메일을 받으려면 아래 함수의 주석을 해제하고
 * YOUR_EMAIL@gmail.com을 실제 이메일로 변경하세요
 */
function sendEmailNotification(data, timestamp) {
  // 이메일 알림을 받으시려면 아래 주석을 해제하고 이메일 주소를 입력하세요
  /*
  const recipient = 'YOUR_EMAIL@gmail.com'; // 여기에 실제 이메일 주소 입력
  const subject = '[새 상담 신청] ' + data.name + ' 님';
  const body = `
새로운 상담 신청이 접수되었습니다.

📋 신청 정보
─────────────────────
⏰ 접수 시간: ${timestamp}
👤 이름: ${data.name}
📞 연락처: ${data.phone}
📧 이메일: ${data.email}
🐕 강아지: ${data.dogBreed}

💬 문제 행동:
${data.issue}

─────────────────────
구글 시트에서 확인하기:
https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit

이 이메일은 자동으로 발송되었습니다.
  `;

  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body
    });
  } catch (error) {
    Logger.log('Email notification failed: ' + error.toString());
  }
  */
}

/**
 * 테스트 함수 - Apps Script 에디터에서 실행 가능
 */
function testConnection() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    Logger.log('✅ 스프레드시트 연결 성공!');
    Logger.log('시트 이름: ' + sheet.getName());
    Logger.log('현재 행 수: ' + sheet.getLastRow());
    return true;
  } catch (error) {
    Logger.log('❌ 스프레드시트 연결 실패: ' + error.toString());
    return false;
  }
}
