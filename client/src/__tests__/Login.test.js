// src/__tests__/Login.test.js
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../helper/auth';
import Login from '../Login';

const mockSetIsLoggedIn = jest.fn();

test('renders login form and submits correctly', async () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Login />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText(/Please enter email here/i);
  const passwordInput = screen.getByPlaceholderText(/Please enter password here/i);
  const submitButton = screen.getByText(/Login/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  // 验证调用 fetch
  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:9000/api/login',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    })
  );
});