import Home from '../Home'; // 确认路径

test('renders Home component', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  expect(screen.getByText(/Daily Challenges/i)).toBeInTheDocument();
});

