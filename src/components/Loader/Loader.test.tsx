// Loader.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from './Loader'; // 确保这里是默认导入

describe('[components] - Loader', () => {
  const setup = () => {
    return render(<Loader />);
  };

  test('should render correctly', () => {
    const { container } = setup();
    const divs = container.querySelectorAll('div');
    // 第一个 div 是容器 div, 所以我们期望有 5 个 div
    expect(divs.length).toBe(5);
  });

  test('should render the Loader container', () => {
    const { container } = setup();
    const loaderContainer = container.querySelector('div');
    expect(loaderContainer).toBeInTheDocument();
  });
});
