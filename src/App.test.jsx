import { render ,screen,waitFor} from '@testing-library/react';
import { describe, it, expect, vi} from 'vitest';
import App from './App';


vi.mock("getApiQuestions");
describe('App Component', () => {

  it('Should render API Response', async () => {
  
    render(<App />);
  
    expect(await screen.findByText("______ provide a way to pass data from one component to another. Fill in the blank.")).toBeInTheDocument();
  });
});



