# Firebase 배포 및 Google OAuth 설정 가이드

## Google Cloud Console에서 JavaScript 출처 등록하기

### 1. Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 프로젝트 선택: `ccfm-ai-studio-f905a` (또는 해당 OAuth Client ID가 속한 프로젝트)

### 2. API 및 서비스 > 사용자 인증 정보로 이동
1. 왼쪽 메뉴에서 **"API 및 서비스"** 클릭
2. **"사용자 인증 정보"** 클릭

### 3. OAuth 2.0 클라이언트 ID 수정
1. OAuth Client ID 목록에서 다음 Client ID를 찾아 클릭:
   ```
   888653193970-65qtb3m2134rpn8rfk1ovnumolv59a14.apps.googleusercontent.com
   ```
2. 또는 **"웹 클라이언트"** 타입의 클라이언트를 찾아 클릭

### 4. 승인된 JavaScript 출처 추가
**"승인된 JavaScript 출처"** 섹션에서 **"+ URI 추가"** 버튼을 클릭하고 다음 URL들을 추가:

```
https://ccfm-ai-studio-f905a.web.app
https://ccfm-ai-studio-f905a.firebaseapp.com
http://localhost:5174
```

**중요:**
- 각 URL은 별도의 줄에 하나씩 추가
- `http://`와 `https://`를 정확히 구분
- 마지막에 슬래시(`/`)를 붙이지 않음

### 5. 승인된 리디렉션 URI 확인 (필요시)
**"승인된 리디렉션 URI"** 섹션도 확인하고, 필요하면 다음을 추가:
```
https://ccfm-ai-studio-f905a.web.app
https://ccfm-ai-studio-f905a.firebaseapp.com
```

### 6. 저장
- **"저장"** 버튼 클릭
- 변경사항이 적용되는데 몇 분 정도 걸릴 수 있음

### 7. 테스트
1. 브라우저 캐시를 지우거나 시크릿 모드로 열기
2. `https://ccfm-ai-studio-f905a.web.app` 접속
3. Google 로그인 버튼 클릭하여 정상 작동 확인

## 문제 해결

### 여전히 오류가 발생하는 경우:
1. **캐시 삭제**: 브라우저 캐시 및 쿠키 삭제
2. **시간 대기**: 변경사항 적용까지 5-10분 대기
3. **URL 확인**: 
   - JavaScript 출처에 정확한 URL이 입력되었는지 확인
   - `http://`와 `https://` 구분 확인
   - 슬래시(`/`)가 끝에 없는지 확인
4. **프로젝트 확인**: 올바른 Google Cloud 프로젝트에 있는지 확인

## 현재 설정된 정보

- **Firebase 프로젝트 ID**: `ccfm-ai-studio-f905a`
- **배포 URL**: `https://ccfm-ai-studio-f905a.web.app`
- **Google OAuth Client ID**: `888653193970-65qtb3m2134rpn8rfk1ovnumolv59a14.apps.googleusercontent.com`




