import Challenge from '../components/Challenge'; // 确认路径

test('renders Challenge and interacts with buttons', () => {
  render(<Challenge />);
  fireEvent.click(screen.getByText(/Generate Random Challenge/i));
  expect(screen.getByText(/Default Title/i)).toBeInTheDocument();
});

