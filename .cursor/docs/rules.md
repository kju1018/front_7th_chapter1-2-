# Cursor Rules

## 🎯 목적
이 프로젝트는 **Vite + React + TypeScript + Vitest + MSW** 기반으로 동작합니다.  
테스트 주도 개발(TDD)과 일관된 코드 품질을 위해,  
모든 에이전트는 아래 규칙을 전역적으로 따릅니다.

---

## 🧩 전역 개발 환경
| 항목 | 값 |
|------|------|
| 언어 | TypeScript |
| 프레임워크 | React (Vite 환경) |
| 테스트 | Vitest + React Testing Library + MSW |
| 포맷터 | Prettier |
| 린터 | ESLint (`eslint.config.js`) |
| 코드 규칙 | Airbnb + Prettier 기반 |
| 버전 | ECMAScript 2022 |
| 전역 객체 | window, document, process, vi, describe, it, expect |

---

## 🧪 테스트 규칙
- 테스트는 **`TEST_RULES.md`** 와 **`TestDesignerAgent.md`** 기준을 따른다.  
- `setupTest.ts`처럼 공통 설정이 있는 경우, 중복 구성 금지.  
- `describe`는 **기능 단위**, `it`은 **행동 단위**로 작성한다.  
- 테스트는 항상 **Red → Green → Refactor** 사이클을 따른다.  
- 각 테스트는 **하나의 기대 결과(expectation)** 만 검증한다.  
- MSW 핸들러는 테스트마다 `server.use()` 설정 후 `server.resetHandlers()`로 초기화한다.  
- 타이머는 `vi.useFakeTimers()`로 고정하고, 테스트 종료 시 `vi.useRealTimers()` 복원한다.  
- 테스트 파일 네이밍은 다음과 같다:
  - 단위(Unit): `easy.*.spec.ts(x)`
  - 통합(Integration): `medium.*.spec.ts(x)`

---

## 🧠 코드 스타일
### ESLint 규칙 반영 (요약)
- `@typescript-eslint` 권장 규칙 사용
- `react-hooks` 권장 규칙 포함
- `import/order`: 그룹별 정렬 및 알파벳 순서 강제
- `no-unused-vars`: 경고 수준으로 유지
- `prettier/prettier`: 오류 수준으로 강제
- `storybook`, `vitest` 규칙 활성화
- 테스트 환경에서 `describe`, `it`, `expect`, `beforeEach`, `afterEach` 등 전역 사용 허용

### Prettier 스타일 (요약)
- 따옴표: **double**
- 세미콜론: **필수**
- 줄바꿈 폭: 80
- 탭 너비: 2
- 화살표 함수: 항상 괄호 사용
- 객체/배열: trailing comma 유지
- `eslint-config-prettier`와 통합하여 린트 충돌 방지

---

## 🧱 폴더 및 네이밍 컨벤션
| 구분 | 규칙 |
|------|------|
| 함수명 | 동사 + 목적 (`getEvents`, `checkValidation`, `saveSchedule`) |
| 컴포넌트 | PascalCase (`EventCard`, `ScheduleDialog`) |
| 유틸 | camelCase (`formatDate`, `parseTime`) |
| 파일 | kebab-case 또는 lowerCamelCase (`event-utils.ts`, `useCalendarView.ts`) |
| 테스트 | `<scope>.<feature>.spec.ts(x)` 형식 유지 |
| import 순서 | builtin → external → parent/sibling → index |

---

## 💬 커밋 메시지 규칙
| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `test` | 테스트 코드 추가/수정 |
| `refactor` | 코드 구조 개선 |
| `chore` | 설정, 빌드 관련 변경 |
| `docs` | 문서 수정 |

📘 **예시**
```
test: add overlap detection tests for event scheduler  
fix: correct time validation for end-before-start edge case
```

---

## 🧩 에이전트 협업 규칙
| 에이전트 | 역할 | 범위 |
|-----------|------|------|
| `TestDesignerAgent` | 테스트 설계 및 케이스 생성 | 명세 기반 TDD 설계만 |
| `DevEngineer` | 코드 구현 및 리팩터링 | 테스트 통과 중심 |
| `CodeReviewer` | 코드/테스트 품질 검토 | 규칙 일관성, 커버리지, 플래키니스 확인 |

- 모든 에이전트는 PRD 및 `TEST_RULES.md`를 참조해야 한다.  
- 명세 범위를 벗어나는 구현/수정 금지.  
- 테스트 설계는 **명세의 구체적 설명(TDD 기반)** 으로 제한된다.

---

## 📦 산출물 포맷
- **테스트 설계 결과물**:  
  `요약 → AC(Given/When/Then) → 테스트 전략 → 케이스 표 → 코드 스캐폴드`
- **출력 형태**:  
  - 신규 테스트 파일(`*.spec.ts(x)`)  
  - 기존 테스트 파일 내 신규 케이스 추가  

---

## 🚧 품질 게이트
| 항목 | 기준 |
|------|------|
| 단위 테스트 커버리지 | 90% 이상 |
| 통합 테스트 커버리지 | 100% |
| 단일 테스트 실행 시간 | 3초 이하 |
| 통합 시나리오 실행 시간 | 10초 이하 |
| 안정성 | Fake timers 및 MSW 핸들러 복원 필수 |
| 리뷰 체크리스트 | 네이밍 명확성, 단언 일관성, 중복 최소화 |

---

## 📚 참고 문서
- [TEST_RULES.md](./TEST_RULES.md)  
- [TestDesignerAgent.md](./agents/TestDesignerAgent.md)  
- [eslint.config.js](./eslint.config.js)  
- [.prettierrc](./.prettierrc)  
- [setupTest.ts](./src/setupTest.ts)
