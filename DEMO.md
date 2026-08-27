# Video Demo Guide

Tài liệu này dùng để quay video demo cho bài HW04. Mọi output demo được lưu
trong `demo/`; các findings chính thức vẫn lưu trong `src/findings/`.

## 1. Chuẩn bị chung

Mở terminal tại root repository và hiển thị bằng chứng tác giả:

```bash
whoami
hostname
mkdir -p demo/agent demo/scripts
```

Khởi động SUT trong các terminal riêng:

```bash
cd eshop-sut/backend && node server.js
cd eshop-sut/frontend-web && npm run dev
cd eshop-sut/frontend-admin && npm run dev
```

Các URL sử dụng:

- User frontend: `http://localhost:5173`
- Admin frontend: `http://localhost:5174`
- Backend: `http://localhost:3000`

## 2. Demo Agent Skill

Trong video mở `.agents/skills/automation-testing/SKILL.md` và giải thích
workflow gồm ba subskill: tạo test data, tạo/chạy Playwright, và tổng hợp
findings. Sau đó gửi prompt mẫu:

```text
Use $automation-testing.

Project root: /path/to/project
Specification: /path/to/requirements.md
Application URL: http://localhost:5173
Feature: FR-01
Output directory: demo/agent/fr01
Browsers: chrome, edge, firefox

Create external JSON test data and a maintainable data-driven Playwright
script. Inspect the real DOM before choosing locators, preserve honest
failures/skips, run the browsers, and summarize findings into a bug report.
```

Trong video chỉ ra các output do agent tạo/kiểm tra:

```text
demo/agent/
├── fr01-test-data.json
├── fr01.spec.ts
└── findings/
    ├── test-results/
    └── playwright-report/
```

Đồng thời mở `demo/agent/fr01/bug-report.md` và một finding để
giải thích cách phân biệt lỗi locator, lỗi môi trường và product bug.

## 3. Demo Playwright scripts

Demo agent FR-01 có project độc lập tại `demo/agent/fr01/`. Cài dependency và
browser một lần:

```bash
cd demo/agent/fr01
npm install
npx playwright install
```

Chạy script agent trên ba browser; report và test result được ghi trực tiếp
trong `demo/agent/fr01/`:

```bash
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:chrome
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:edge
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:firefox
```

Hoặc lưu từng browser vào `demo/scripts/` để trình bày riêng:

```bash
cd demo/agent/fr01
FINDINGS_DIR=../../scripts/fr01-chrome \
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 \
npm run test:chrome

FINDINGS_DIR=../../scripts/fr01-edge \
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 \
npm run test:edge

FINDINGS_DIR=../../scripts/fr01-firefox \
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 \
npm run test:firefox
```

Với FR-18, dùng admin URL và seed trước khi chạy:

```bash
cd ../eshop-sut/backend && npm run seed:fr18
cd ../../src
FINDINGS_DIR=../demo/scripts/fr18-chrome \
STUDENT_ID=23127075 ADMIN_BASE_URL=http://localhost:5174 \
npm run test:fr18 -- --project=chrome --workers=1
```

Mở report trong video:

```bash
npx playwright show-report ../../scripts/fr01-chrome/playwright-report
```

Chỉ ra title hoặc metadata `Run by: 23127075`, test cases data-driven từ JSON,
assertion URL/visible text/control state, screenshot hoặc trace của failure,
và điền kết luận bug tương ứng trong `demo/agent/fr01/bug-report.md`.

## 4. Gợi ý bố cục video ≥5 phút

1. 0:00–0:30: `whoami`, `hostname`, giới thiệu project và ba feature.
2. 0:30–1:30: giới thiệu Agent Skill và prompt sử dụng.
3. 1:30–3:30: mở spec, JSON, chạy FR-01 trên ba browser.
4. 3:30–4:30: mở HTML report và giải thích một human-review fix.
5. 4:30–5:30+: mở findings/bug report, phân loại product bug và nêu limitation.

Video phải do sinh viên tự thuyết minh bằng tiếng Việt, có face-cam hoặc
terminal chứa `whoami` và `hostname`, và đặt ở chế độ YouTube unlisted.
