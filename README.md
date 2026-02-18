
# 🌊 어업인 작업일지 관리자 시스템 (Fisherman Admin)

어업인 계정 관리, 가두리 시설 사진 관리, 작업일지 조회 및 양식 설정을 위한 통합 관리자 플랫폼입니다.

## 🚀 주요 기능
- **어업인 관리**: 계정 생성, 수정, 삭제 및 가두리 시설 배정 (메인 화면)
- **가두리 시설 관리**: 구역별(A-Z) 가두리 현장 사진 등록 및 관리
- **작업일지 조회**: 제출된 일지 필터링 조회, 상세 확인, 수정 및 엑셀 다운로드
- **일지 양식 설정**: 현장 상황에 맞는 유연한 문항(먹이 종류 등) 설계 및 배포
- **공지사항 관리**: 어업인 앱 사용자를 위한 실시간 공지 등록
- **보안 설정**: 시스템 DB 설정 메뉴 접근 시 개발자 전용 패스워드(`220993`) 확인

## 🛠 기술 스택
- **Frontend**: React, TypeScript, Tailwind CSS
- **Icons**: Lucide React, FontAwesome (CDN)
- **Backend/DB**: Supabase (PostgreSQL)
- **Library Loading**: esm.sh (No-build system)

## 📦 실행 및 배포 방법
이 프로젝트는 별도의 `npm install` 과정 없이 브라우저에서 즉시 실행 가능하도록 설계되었습니다.

1. 저장소를 클론합니다.
2. `supabaseClient.ts`에 본인의 Supabase API 정보를 입력합니다.
3. `index.html`을 실행하거나 Vercel, Netlify 등에 폴더째로 업로드하여 배포합니다.

## 🔐 관리자 정보
- **초기 계정**: `admin@aquapro.com` / `aquapro`
- **DB 설정 패스워드**: `220993`

---
© 2024 AQUAPRO Corp. All rights reserved.
