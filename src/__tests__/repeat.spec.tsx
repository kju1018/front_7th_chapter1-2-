
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
      
      const { user } = setup(<App />);
      
      // 반복 일정 체크박스 활성화
      const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
      await user.click(repeatCheckbox);
      
      // 반복 유형 Select가 표시되어야 함 (현재는 주석 처리되어 있으므로 실패)
      const repeatTypeSelect = screen.getByRole('combobox', { name: '반복 유형' });
      expect(repeatTypeSelect).toBeInTheDocument();
    });
  
    it("일정 수정 폼에 반복 유형 선택 컨트롤이 존재해야 한다", async () => {
      // [RED]
      // Given: 기존 일정의 수정 폼이 열린 상태
      // When: 폼이 로드됨
      // Then: 반복 유형 선택 컨트롤이 표시되어야 함
      
      const { user } = setup(<App />);
      
      // 기존 일정을 생성하고 수정 모드로 진입
      const existingEvent: Omit<Event, 'id' | 'notificationTime' | 'repeat'> = {
        title: '테스트 반복 일정',
        date: '2025-12-25',
        startTime: '10:00',
        endTime: '11:00',
        location: '회의실',
        description: '테스트',
        category: '업무'
      };
      
      await saveSchedule(user, existingEvent);
      
      // 일정 목록에서 Edit 버튼 클릭
      const editButtons = screen.getAllByRole('button', { name: 'Edit event' });
      await user.click(editButtons[0]);
      
      // 수정 폼에서 반복 일정 체크박스 활성화
      const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
      await user.click(repeatCheckbox);
      
      // 반복 유형 Select가 표시되어야 함
      const repeatTypeSelect = screen.getByRole('combobox', { name: '반복 유형' });
      expect(repeatTypeSelect).toBeInTheDocument();
    });
  
    it("반복 유형 선택 컨트롤에서 매일을 선택할 수 있어야 한다", async () => {
      // [RED]
      // Given: 반복 유형 선택 컨트롤이 표시된 상태
      // When: 사용자가 매일 옵션을 클릭함
      // Then: 매일 옵션이 선택 상태가 되어야 함
      
      const { user } = setup(<App />);
      
      // 반복 일정 활성화
      const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
      await user.click(repeatCheckbox);
      
      // 반복 유형 Select 열기
      const repeatTypeSelect = screen.getByRole('combobox', { name: '반복 유형' });
      await user.click(repeatTypeSelect);
      
      // 매일 옵션 선택
      const dailyOption = screen.getByRole('option', { name: '매일' });
      await user.click(dailyOption);
      
      // 매일이 선택되어야 함
      expect(repeatTypeSelect).toHaveTextContent('매일');
    });
  
    it("반복 유형 선택 컨트롤에서 매주를 선택할 수 있어야 한다", async () => {
      // [RED]
      // Given: 반복 유형 선택 컨트롤이 표시된 상태
      // When: 사용자가 매주 옵션을 클릭함
      // Then: 매주 옵션이 선택 상태가 되어야 함
      
      const { user } = setup(<App />);
      
      // 반복 일정 활성화
      const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
      await user.click(repeatCheckbox);
      
      // 반복 유형 Select 열기
      const repeatTypeSelect = screen.getByRole('combobox', { name: '반복 유형' });
      await user.click(repeatTypeSelect);
      
      // 매주 옵션 선택
      const weeklyOption = screen.getByRole('option', { name: '매주' });
      await user.click(weeklyOption);
      
      // 매주가 선택되어야 함
      expect(repeatTypeSelect).toHaveTextContent('매주');
    });
  
    it("반복 유형 선택 컨트롤에서 매월을 선택할 수 있어야 한다", async () => {
      // [RED]
      // Given: 반복 유형 선택 컨트롤이 표시된 상태
      // When: 사용자가 매월 옵션을 클릭함
      // Then: 매월 옵션이 선택 상태가 되어야 함
      
      const { user } = setup(<App />);
      
      // 반복 일정 활성화
      const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
      await user.click(repeatCheckbox);
      
      // 반복 유형 Select 열기
      const repeatTypeSelect = screen.getByRole('combobox', { name: '반복 유형' });
      await user.click(repeatTypeSelect);
      
      // 매월 옵션 선택
      const monthlyOption = screen.getByRole('option', { name: '매월' });
      await user.click(monthlyOption);
      
      // 매월이 선택되어야 함
      expect(repeatTypeSelect).toHaveTextContent('매월');
    });
  
    it("반복 유형 선택 컨트롤에서 매년을 선택할 수 있어야 한다", async () => {
      // [RED]
      // Given: 반복 유형 선택 컨트롤이 표시된 상태
      // When: 사용자가 매년 옵션을 클릭함
      // Then: 매년 옵션이 선택 상태가 되어야 함
      
      const { user } = setup(<App />);
      
      // 반복 일정 활성화
      const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
      await user.click(repeatCheckbox);
      
      // 반복 유형 Select 열기
      const repeatTypeSelect = screen.getByRole('combobox', { name: '반복 유형' });
      await user.click(repeatTypeSelect);
      
      // 매년 옵션 선택
      const yearlyOption = screen.getByRole('option', { name: '매년' });
      await user.click(yearlyOption);
      
      // 매년이 선택되어야 함
      expect(repeatTypeSelect).toHaveTextContent('매년');
    });
});

describe("캘린더 뷰에서 반복 일정을 아이콘으로 구분하여 표시하기", () => {
    it("주(Week) 뷰에서 반복 일정에 repeat-icon이 표시되어야 한다", async () => {
        // [RED]
        // Given: 반복 일정이 저장된 상태
        // When: 캘린더 주(Week) 뷰가 로드됨
        // Then: 반복 일정에 repeat-icon testId를 가진 RepeatIcon이 표시되어야 함
        setupMockHandlerCreation();
        const { user } = setup(<App />);

        // 반복 일정 생성
        await user.click(screen.getAllByText('일정 추가')[0]);

        await user.type(screen.getByLabelText('제목'), '반복 테스트 일정');
        await user.type(screen.getByLabelText('날짜'), '2025-10-03');
        await user.type(screen.getByLabelText('시작 시간'), '10:00');
        await user.type(screen.getByLabelText('종료 시간'), '11:00');
        await user.type(screen.getByLabelText('설명'), '반복 테스트');
        await user.type(screen.getByLabelText('위치'), '회의실');

        await user.click(within(screen.getByLabelText('카테고리')).getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: '업무-option' }));

        // 반복 일정 활성화 및 유형 선택
        await user.click(screen.getByRole('checkbox', { name: '반복 일정' }));

        await user.click(screen.getByRole('combobox', { name: '반복 유형' }));
        await user.click(screen.getByRole('option', { name: '매주' }));

        await user.click(screen.getByTestId('event-submit-button'));

        // Week 뷰로 전환
        await user.click(within(screen.getByLabelText('뷰 타입 선택')).getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: 'week-option' }));

        // Week 뷰에서 repeat-icon 확인
        const weekView = screen.getByTestId('week-view');
        const repeatIcon = within(weekView).getByTestId('repeat-icon');
        expect(repeatIcon).toBeInTheDocument();
    });

    it("주(Week) 뷰에서 일회성 일정에는 repeat-icon이 표시되지 않아야 한다", async () => {
        // [RED]
        // Given: 일회성 일정이 저장된 상태
        // When: 캘린더 주(Week) 뷰가 로드됨
        // Then: 일회성 일정에 repeat-icon이 표시되지 않아야 함

        const { user } = setup(<App />);

        // 일회성 일정 생성 (반복 일정 체크박스 클릭하지 않음)
        const oneTimeEvent: Omit<Event, 'id' | 'notificationTime' | 'repeat'> = {
            title: '일회성 일정',
            date: '2025-10-03',
            startTime: '14:00',
            endTime: '15:00',
            location: '사무실',
            description: '일회성',
            category: '개인'
        };

        await saveSchedule(user, oneTimeEvent);

        // Week 뷰로 전환
        await user.click(within(screen.getByLabelText('뷰 타입 선택')).getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: 'week-option' }));

        // Week 뷰에서 repeat-icon이 없는지 확인
        const weekView = screen.getByTestId('week-view');
        const repeatIcon = within(weekView).queryByTestId('repeat-icon');
        expect(repeatIcon).not.toBeInTheDocument();
    });

    it("월(Month) 뷰에서 반복 일정에 repeat-icon이 표시되어야 한다", async () => {
        // [RED]
        // Given: 반복 일정이 저장된 상태
        // When: 캘린더 월(Month) 뷰가 로드됨
        // Then: 반복 일정에 repeat-icon testId를 가진 RepeatIcon이 표시되어야 함
        setupMockHandlerCreation();
        const { user } = setup(<App />);

        // 반복 일정 생성
        await user.click(screen.getAllByText('일정 추가')[0]);
        await user.type(screen.getByLabelText('날짜'), '2025-10-15');
        await user.type(screen.getByLabelText('시작 시간'), '10:00');
        await user.type(screen.getByLabelText('종료 시간'), '11:00');
        await user.type(screen.getByLabelText('제목'), '반복 테스트 일정');
        await user.type(screen.getByLabelText('설명'), '반복 테스트');
        await user.type(screen.getByLabelText('위치'), '회의실');
        await user.click(within(screen.getByLabelText('카테고리')).getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: '업무-option' }));

        // 반복 일정 활성화 및 유형 선택
        await user.click(screen.getByRole('checkbox', { name: '반복 일정' }));

        await user.click(screen.getByRole('combobox', { name: '반복 유형' }));
        await user.click(screen.getByRole('option', { name: '매일' }));

        await user.click(screen.getByTestId('event-submit-button'));

        // Month 뷰로 전환
        await user.click(within(screen.getByLabelText('뷰 타입 선택')).getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: 'month-option' }));

        // Month 뷰에서 repeat-icon 확인
        const monthView = screen.getByTestId('month-view');
        const repeatIcon = await within(monthView).findByTestId('repeat-icon');
        expect(repeatIcon).toBeInTheDocument();
    });

    it("월(Month) 뷰에서 일회성 일정에는 repeat-icon이 표시되지 않아야 한다", async () => {
        // [RED]
        // Given: 일회성 일정이 저장된 상태
        // When: 캘린더 월(Month) 뷰가 로드됨
        // Then: 일회성 일정에 repeat-icon이 표시되지 않아야 함

        const { user } = setup(<App />);

        // 일회성 일정 생성 (반복 일정 체크박스 클릭하지 않음)
        const oneTimeEvent: Omit<Event, 'id' | 'notificationTime' | 'repeat'> = {
            title: '일회성 일정',
            date: '2025-10-15',
            startTime: '16:00',
            endTime: '17:00',
            location: '카페',
            description: '일회성',
            category: '기타'
        };

        await saveSchedule(user, oneTimeEvent);

        // Month 뷰로 전환
        await user.click(within(screen.getByLabelText('뷰 타입 선택')).getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: 'month-option' }));

        // Month 뷰에서 repeat-icon이 없는지 확인
        const monthView = screen.getByTestId('month-view');
        const repeatIcon = within(monthView).queryByTestId('repeat-icon');
        expect(repeatIcon).not.toBeInTheDocument();
    });
});
