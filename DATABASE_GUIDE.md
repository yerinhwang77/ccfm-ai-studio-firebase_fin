# Firebase Firestore 데이터베이스 구조 가이드

## 📊 데이터베이스 구조

Firebase Firestore는 **컬렉션(Collection)** 기반으로 구성되어 있습니다.

### 1. `tools` 컬렉션
각 툴의 정보를 저장하는 메인 컬렉션입니다.

**문서 ID**: 각 툴의 고유 ID (예: `tool_imweb_shortform`)

**필드 구조**:
```typescript
{
  id: string;                    // 툴 고유 ID (문서 ID와 동일)
  department: string;            // 부서명 (예: "콘크리트 파머스", "유통콘텐츠 사업부")
  category: string;              // 카테고리 (예: "데이터 분석", "운영/관리")
  tool_name: string;             // 툴 이름
  description: string;           // 툴 설명
  logoUrl: string;               // 로고 이미지 URL
  manual_link: string;           // 매뉴얼 링크 (없으면 빈 문자열)
  service_url: string;           // 툴 서비스 랜딩 페이지 URL
  login_id: string;             // 로그인 ID
  login_pw: string;              // 로그인 비밀번호
  memo: string;                  // 메모 (추가 정보)
  in_use: "Y" | "N";            // 사용 여부
  is_paid: "Y" | "N";           // 유료 여부
  order: number;                 // 정렬 순서 (선택사항, 기본값: 0)
}
```

**부서(Department) 값**:
- `"브랜드 사업부"`
- `"마케팅 사업부"`
- `"유통콘텐츠 사업부"`
- `"콘크리트 파머스"`

**카테고리 예시**:
- `"텍스트 AI"`
- `"이미지 AI"`
- `"비디오 AI"`
- `"보이스 AI"`
- `"데이터 분석"`
- `"운영/관리"`
- `"생산성/협업"`
- `"미디어 소스"`
- `"교육/인사이트"`
- `"디자인"`
- `"일반"`

### 2. `settings` 컬렉션
부서별 카테고리 순서 설정을 저장합니다.

**문서 ID**: `categoryOrder_{부서명}` (예: `categoryOrder_콘크리트 파머스`)

**필드 구조**:
```typescript
{
  order: string[];  // 카테고리 이름 배열 (순서대로)
}
```

**예시**:
```json
{
  "order": [
    "텍스트 AI",
    "이미지 AI",
    "비디오 AI",
    "데이터 분석",
    "운영/관리",
    "생산성/협업",
    "일반"
  ]
}
```

---

## ➕ 데이터 추가 방법

### 방법 1: Admin Portal에서 추가 (권장)

1. **관리자 계정으로 로그인**
   - 허용된 관리자 계정으로 로그인
   - 상단 `ADMIN` 버튼 클릭

2. **Tool Manager에서 추가**
   - `Tool Manager` 탭 선택
   - `+ 새 툴 추가` 버튼 클릭
   - 모든 필드 입력 후 저장

**장점**: 
- UI로 쉽게 추가 가능
- 즉시 반영
- 검증 로직 포함

---

### 방법 2: Firebase Console에서 직접 추가

1. **Firebase Console 접속**
   - https://console.firebase.google.com/
   - 프로젝트 선택: `ccfm-ai-studio-f905a`

2. **Firestore Database로 이동**
   - 왼쪽 메뉴: `Firestore Database` 클릭

3. **컬렉션 선택 및 문서 추가**
   - `tools` 컬렉션 클릭
   - `문서 추가` 버튼 클릭
   - 문서 ID 입력 (예: `tool_new_tool_name`)
   - 필드 추가:
     ```
     id (string): tool_new_tool_name
     department (string): 콘크리트 파머스
     category (string): 데이터 분석
     tool_name (string): 새 툴 이름
     description (string): 툴 설명
     logoUrl (string): https://www.google.com/s2/favicons?domain=example.com&sz=128
     manual_link (string): (비어있으면 "")
     service_url (string): https://example.com
     login_id (string): 로그인ID
     login_pw (string): 비밀번호
     memo (string): (비어있으면 "")
     in_use (string): Y
     is_paid (string): Y
     order (number): 999
     ```
   - `저장` 클릭

**주의사항**:
- 모든 필수 필드를 정확히 입력해야 함
- `department` 값은 정확한 부서명 사용
- `in_use`, `is_paid`는 반드시 `"Y"` 또는 `"N"` (대문자)

---

### 방법 3: 코드에서 마이그레이션 (대량 추가)

1. **`constants.ts` 파일 수정**
   - `INITIAL_TOOLS` 배열에 새 툴 추가

2. **Admin Portal에서 마이그레이션 실행**
   - 관리자 계정으로 로그인
   - `ADMIN` → `Database` 탭
   - `데이터 마이그레이션` 버튼 클릭
   - 확인 후 실행

**주의사항**:
- 기존 데이터와 ID가 겹치면 덮어쓰기됨
- 신중하게 사용

---

## 📝 데이터 추가 예시

### 예시 1: 새 툴 추가 (Admin Portal)

```
툴 이름: 블랙키위
부서: 콘크리트 파머스
카테고리: 데이터 분석
설명: 네이버 키워드 검색량 및 경쟁도 분석 SEO 툴
로고 URL: https://www.google.com/s2/favicons?domain=blackkiwi.net&sz=128
서비스 URL: https://blackkiwi.net
로그인 ID: ccfmedu@ccfm.co.kr
로그인 PW: password123
메모: (비어있음)
사용 여부: Y
유료 여부: Y
순서: 10
```

### 예시 2: Firebase Console에서 직접 추가

**문서 ID**: `tool_blackkiwi`

**필드**:
```
id: "tool_blackkiwi"
department: "콘크리트 파머스"
category: "데이터 분석"
tool_name: "블랙키위"
description: "네이버 키워드 검색량 및 경쟁도 분석 SEO 툴"
logoUrl: "https://www.google.com/s2/favicons?domain=blackkiwi.net&sz=128"
manual_link: ""
service_url: "https://blackkiwi.net"
login_id: "ccfmedu@ccfm.co.kr"
login_pw: "password123"
memo: ""
in_use: "Y"
is_paid: "Y"
order: 10
```

---

## 🔍 데이터 확인 방법

1. **앱에서 확인**
   - 해당 부서 선택
   - 카테고리에서 툴 확인

2. **Firebase Console에서 확인**
   - Firestore Database → `tools` 컬렉션
   - 문서 클릭하여 필드 확인

---

## ⚠️ 주의사항

1. **문서 ID는 고유해야 함**
   - 중복된 ID 사용 시 기존 데이터 덮어쓰기됨

2. **필수 필드 누락 주의**
   - 모든 필드를 입력하지 않으면 앱에서 오류 발생 가능

3. **부서명 정확히 입력**
   - 정확한 부서명 사용 (대소문자, 띄어쓰기 주의)

4. **order 필드**
   - 숫자가 작을수록 앞에 표시됨
   - 같은 숫자면 추가된 순서대로

---

## 🛠️ 문제 해결

### 툴이 화면에 안 보일 때
1. `department` 값이 현재 선택한 부서와 일치하는지 확인
2. `in_use`가 `"Y"`인지 확인
3. 브라우저 새로고침

### 카테고리 순서가 이상할 때
1. `settings` 컬렉션의 `categoryOrder_{부서명}` 문서 확인
2. Admin Portal에서 카테고리 순서 재정렬

