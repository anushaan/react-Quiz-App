import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Quiz from './Quiz';

// Mock questions data
const questions = [
  {
    question: 'What is 2 + 2?',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4',
    type: 'MCQ'
  },
  {
    question: 'Fill in the blank: 2 * ___ = 6',
    correctAnswer: '3',
    type: 'FIB'
  }
];

describe('Quiz Component', () => {
  it('renders quiz questions and choices', () => {
    const { getByText, getAllByRole } = render(<Quiz questions={questions} />);
    
    // Ensure the first question is rendered
    expect(getByText('What is 2 + 2?')).toBeInTheDocument();

    // Ensure all choices for the first question are rendered
    const choices = getAllByRole('listitem');
    expect(choices).toHaveLength(4);
  });

  it('allows users to select answers for MCQ questions', () => {
    const { getByText } = render(<Quiz questions={questions} />);
    
    // Select an answer choice
    fireEvent.click(getByText('4'));
    
    // Ensure the selected choice is highlighted
    expect(getByText('4')).toHaveClass('seleted-answer');
  });
});






