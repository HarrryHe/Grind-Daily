import Card from '../components/helper/Card'; // 确认路径是否正确

test('renders Card with mock data', () => {
  const mockTask = {
    title: 'Test Task',
    description: 'Task description',
    duration: 30,
    difficulty: 2,
  };

  render(<Card task={mockTask} image="/path/to/image.jpg" />);
  expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
});

