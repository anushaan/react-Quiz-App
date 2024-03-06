import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AnswerTimer from './AnswerTimer';


describe('Render the AnsweTimer', () => {
    it('Render the AnswerTimer succesfully', () => {
        const { container, getByTestId } = render(<AnswerTimer />);
        const progressBar = getByTestId('progress-bar');

        expect(container.firstChild).toHaveClass('answer-timer-container');
        expect(progressBar).toBeInTheDocument();

        // screen.debug(container.firstChild);
        // screen.debug(progressBar);

    })

    it('AnswerTimer progress over time', () => {
        vi.useFakeTimers();
        render(<AnswerTimer duration={10} />);

        act(() => {
            vi.advanceTimersByTime(5000); // Advance timer by 5 seconds
        });
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toHaveStyle({ width: '50%' });

        // screen.debug(progressBar);

        act(() => {
            vi.advanceTimersByTime(5000);
        })
        expect(progressBar).toHaveStyle({ width: '100%' });
        // screen.debug(progressBar);

    })
    it('AnswerTimer calls onTimeUp when time is up', () => {
        const onTimeUpMock = vi.fn();
        vi.useFakeTimers(); // Use fake timers
        render(<AnswerTimer duration={5} onTimeUp={onTimeUpMock} />);
      
        act(() => {
          vi.advanceTimersByTime(5000); // Advance timer by 5 seconds
        });
      
        expect(onTimeUpMock).toHaveBeenCalled();
      });
})