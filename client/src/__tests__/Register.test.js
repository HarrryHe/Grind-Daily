import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';
import { AuthContext } from './helper/auth';

const mockSetIsLoggedIn = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Register Component', () => {
  beforeEach(() => {
    fetch.resetMocks(); // Reset fetch mock for each test
  });

  test('renders Register form', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: mockSetIsLoggedIn }}>
          <Register />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please enter a user name here/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please enter email here/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please enter password here/i)).toBeInTheDocument();
  });

  test('shows error when passwords do not match', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: mockSetIsLoggedIn }}>
          <Register />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/Please enter password here/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/Please enter password here/i);
    const submitButton = screen.getByText(/Register/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Password not match/i)).toBeInTheDocument();
  });

  test('submits form and navigates on success', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        token: 'fake_token',
        userId: '12345',
        userName: 'TestUser',
        userEmail: 'test@example.com',
      })
    );

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: mockSetIsLoggedIn }}>
          <Register />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Please enter a user name here/i);
    const emailInput = screen.getByPlaceholderText(/Please enter email here/i);
    const passwordInput = screen.getAllByPlaceholderText(/Please enter password here/i)[0];
    const confirmPasswordInput = screen.getAllByPlaceholderText(/Please enter password here/i)[1];
    const submitButton = screen.getByText(/Register/i);

    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Mocked fetch call
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:9000/api/register',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          username: 'TestUser',
          email: 'test@example.com',
          password: 'password123',
        }),
      })
    );

    // Expect login state to be updated and navigation called
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('shows error message when API fails', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ error: 'Registration failed' }),
      { status: 400 }
    );

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: mockSetIsLoggedIn }}>
          <Register />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Please enter a user name here/i);
    const emailInput = screen.getByPlaceholderText(/Please enter email here/i);
    const passwordInput = screen.getAllByPlaceholderText(/Please enter password here/i)[0];
    const confirmPasswordInput = screen.getAllByPlaceholderText(/Please enter password here/i)[1];
    const submitButton = screen.getByText(/Register/i);

    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Expect error message
    const errorMessage = await screen.findByText(/Registration failed/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
