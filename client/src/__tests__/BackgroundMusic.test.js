// Mock HTMLMediaElement.play
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: jest.fn(),
  });
  
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: jest.fn(),
  });
  
  test('renders BackgroundMusic and toggles play/pause', () => {
    render(<BackgroundMusic />);
    const button = screen.getByRole('button');
  
    // 验证默认状态是播放中
    fireEvent.click(button);
    expect(button).toHaveTextContent(/FaVolumeMute/);
  
    // 再次点击切换为播放
    fireEvent.click(button);
    expect(button).toHaveTextContent(/FaVolumeUp/);
  });
  