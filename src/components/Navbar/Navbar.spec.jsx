// import renderer from 'react-test-renderer';
import { getByTestId, render } from '@testing-library/react';
import Navbar from './Navbar.jsx';
import { afterEach, describe, expect, test, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

function loadCss(container, filePath) {
  const cssFileContent = fs.readFileSync(path.resolve(filePath), 'utf8');
  const style = document.createElement('style');
  style.innerHTML = cssFileContent;
  container.append(style);
}

function renderValidComponent() {
  const options = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const { container, getByTestId } = render(<Navbar options={options} />);
  // Load css
  loadCss(container, './src/index.css');
  loadCss(container, './src/components/Navbar/Navbar.css');

  return getByTestId('nav');
}

afterEach(() => {
  // Restore the original console.error function after all tests
  vi.restoreAllMocks();
});

describe('Check properties', () => {
  test('Prop options is required', async () => {
    // Arrange
    let error;
    const spy = vi.spyOn(console, 'error').mockImplementation((_, __, message) => {
      error = message;
    });
    // Act
    render(<Navbar />);

    // Assert
    expect(spy).toHaveBeenCalled();
    expect(error).toBe('The prop `options` is marked as required in `Navbar`, but its value is `undefined`.');
  });
});
describe('Check structure', () => {
  test('Navbar has correct structure', () => {
    const nav = renderValidComponent();
    expect(nav).not.toBeNull();
    expect(nav.tagName).toBe('NAV');
    const ul = getByTestId(nav, 'ul');
    expect(ul).not.toBeNull();
    expect(ul.tagName).toBe('UL');
    const lis = ul.querySelectorAll('li');
    expect(lis.length).toBe(3);
    const links = ul.querySelectorAll('a');
    expect(links.length).toBe(3);
  });
});
describe('Check behavior', () => {
  test('Navbar has correct behavior', () => {
    const nav = renderValidComponent();
    const links = nav.querySelectorAll('a');
    expect(links[0].href).toBe('http://localhost:3000/');
    expect(links[0].textContent).toBe('Home');
    expect(links[1].href).toBe('http://localhost:3000/about');
    expect(links[1].textContent).toBe('About');
    expect(links[2].href).toBe('http://localhost:3000/contact');
    expect(links[2].textContent).toBe('Contact');
  });
});
describe('Check style', () => {
  test('nav has correct style', () => {
    const navbar = renderValidComponent();
    const styles = window.getComputedStyle(navbar);
    expect(styles.display).toBe('inline-block');
    expect(styles.backgroundColor).toBe('rgb(248, 250, 252)');
    expect(styles.borderRadius).toBe('48px');
    expect(styles.borderColor).toBe('#d4d4d8');
    expect(styles.borderStyle).toBe('solid');
    expect(styles.borderWidth).toBe('1px');
  });

  test('ul has correct style', () => {
    const navbar = renderValidComponent();
    const ul = getByTestId(navbar, 'ul');
    const styles = window.getComputedStyle(ul);
    expect(styles.display).toBe('flex');
    expect(styles.columnGap).toBe('24px');
    expect(styles.padding).toBe('0px 24px');
    expect(styles.justifyContent).toBe('center');
    expect(styles.alignItems).toBe('center');
    expect(styles.height).toBe('32px');
  });
});
