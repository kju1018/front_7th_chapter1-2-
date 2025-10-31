
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen, within } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { ReactElement } from 'react';

import {
  setupMockHandlerCreation,
} from '../__mocks__/handlersUtils';
import App from '../App';
import { Event } from '../types';

const theme = createTheme();

// ! Hard 여기 제공 안함
const setup = (element: ReactElement) => {
  const user = userEvent.setup();

  return {
    ...render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>{element}</SnackbarProvider>
      </ThemeProvider>
    ),
    user,
  };
};

// ! Hard 여기 제공 안함
const saveSchedule = async (
  user: UserEvent,
  form: Omit<Event, 'id' | 'notificationTime' | 'repeat'>
) => {
  const { title, date, startTime, endTime, location, description, category } = form;

  await user.click(screen.getAllByText('일정 추가')[0]);

  await user.type(screen.getByLabelText('제목'), title);
  await user.type(screen.getByLabelText('날짜'), date);
  await user.type(screen.getByLabelText('시작 시간'), startTime);
  await user.type(screen.getByLabelText('종료 시간'), endTime);
  await user.type(screen.getByLabelText('설명'), description);
  await user.type(screen.getByLabelText('위치'), location);
  await user.click(screen.getByLabelText('카테고리'));
  await user.click(within(screen.getByLabelText('카테고리')).getByRole('combobox'));
  await user.click(screen.getByRole('option', { name: `${category}-option` }));

  await user.click(screen.getByTestId('event-submit-button'));
};


describe("일정 생성 또는 수정 시 반복 유형 선택 기능", () => {
    it("일정 생성 폼에 반복 유형 선택 컨트롤이 존재해야 한다", async () => {
      // [RED]
      // Given: 일정 생성 폼이 열린 상태
      // When: 폼이 로드됨
      // Then: 반복 유형 선택 컨트롤이 표시되어야 함
    });
  
    it("일정 수정 폼에 반복 유형 선택 컨트롤이 존재해야 한다", async () => {
      // [RED]
      // Given: 기존 일정의 수정 폼이 열린 상태
      // When: 폼이 로드됨
      // Then: 반복 유형 선택 컨트롤이 표시되어야 함
    });
  
    it("반복 유형 선택 컨트롤에서 매일을 선택할 수 있어야 한다", async () => {
      // [RED]
      // Given: 반복 유형 선택 컨트롤이 표시된 상태
      // When: 사용자가 매일 옵션을 클릭함
      // Then: 매일 옵션이 선택 상태가 되어야 함
    });
  
    it("반복 유형 선택 컨트롤에서 매주를 선택할 수 있어야 한다", async () => {
      // [RED]
      // Given: 반복 유형 선택 컨트롤이 표시된 상태
      // When: 사용자가 매주 옵션을 클릭함
      // Then: 매주 옵션이 선택 상태가 되어야 함
    });
  
    it("반복 유형 선택 컨트롤에서 매월을 선택할 수 있어야 한다", async () => {
      // [RED]
      // Given: 반복 유형 선택 컨트롤이 표시된 상태
      // When: 사용자가 매월 옵션을 클릭함
      // Then: 매월 옵션이 선택 상태가 되어야 함

    });
  
    it("반복 유형 선택 컨트롤에서 매년을 선택할 수 있어야 한다", async () => {
      // [RED]
      // Given: 반복 유형 선택 컨트롤이 표시된 상태
      // When: 사용자가 매년 옵션을 클릭함
      // Then: 매년 옵션이 선택 상태가 되어야 함
    });
});
