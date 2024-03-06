import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Results from './Results';

describe('Results', () => {
    it('renders Results heading', () => {
        const { getByText } = render(<Results />);
        const heading = getByText('Result');
        expect(heading).toBeInTheDocument()
        // screen.debug(heading);

        // check if App components renders headline
    });
    it('renders the input placeholder text', () => {
        const { getByPlaceholderText } = render(<Results />)
        expect(getByPlaceholderText('Your Name')).toBeInTheDocument();
        // screen.debug();
    })
    it('displays highscore on click of save button', () => {
        const {getByPlaceholderText,getByText} = render(<Results />)

        const inputElement = getByPlaceholderText('Your Name')
        const saveButton = getByText('Save');

        fireEvent.change(inputElement, {target: {value: 'Anussha'} })
        fireEvent.click(saveButton)

        expect(getByText('Ranking')).toBeInTheDocument();
        expect(getByText('Name')).toBeInTheDocument();

        // screen.debug(inputElement)
    })
    it('Try Again button resets scores', () => {
        const onTryAgainMock = vi.fn();
        const { getByText } = render(<Results onTryAgain={onTryAgainMock} />);
      
        const tryAgainButton = getByText('Try Again');
        fireEvent.click(tryAgainButton);
      
        // Check if onTryAgainMock is called
        expect(onTryAgainMock).toHaveBeenCalled(1);
      });
});