// src/__tests__/Preloader.test.js
import { render, screen } from '@testing-library/react';
import Preloader from '../Preloader';

test('renders Preloader and displays a random quote', () => {
  render(<Preloader />);

  // 验证随机名言是否渲染
  const quote = screen.getByText(/Believe in yourself/i);
  expect(quote).toBeInTheDocument();
});