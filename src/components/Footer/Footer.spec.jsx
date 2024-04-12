import { render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import Footer from './Footer.jsx';
import fs from 'fs';
import path from 'path';
import renderer from 'react-test-renderer';

const links = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Projects',
    url: '/projects',
  },
  {
    title: 'Uses',
    url: '/uses',
  },
];

function loadCss(container, filePath) {
  const cssFileContent = fs.readFileSync(path.resolve(filePath), 'utf8');
  const style = document.createElement('style');
  style.innerHTML = cssFileContent;
  container.append(style);
}

function getByTestId(testId) {
  // -- render component
  const { container, getByTestId } = render(<Footer links={links} />);

  // -- load css
  loadCss(container, './src/index.css');
  loadCss(container, './src/components/Footer/Footer.css');

  // Act & Assert
  return getByTestId(testId);
}

afterEach(() => {
  // Restore the original console.error function after all tests
  vi.restoreAllMocks();
});

// 10pts
describe('Check properties', () => {
  test('Default props have correct values', async () => {
    const component = renderer.create(<Footer />);
    const testInstance = component.root;
    expect(testInstance.props.links).toStrictEqual([]);
  });
});

// 10pts
describe('Check structure', () => {
  test('Footer has correct structure', async () => {
    const { getByTestId } = render(<Footer links={links} />);
    const footer = getByTestId('footer');
    const footerLink0 = getByTestId('footerLink0');
    const footerLink1 = getByTestId('footerLink1');
    const footerLink2 = getByTestId('footerLink2');
    const footerLink3 = getByTestId('footerLink3');

    expect(footer).toBeTruthy();
    expect(footerLink0).toBeTruthy();
    expect(footerLink1).toBeTruthy();
    expect(footerLink2).toBeTruthy();
    expect(footerLink3).toBeTruthy();
  });
});

// 20pts
describe('Check behavior', () => {
  test('Footer has correct behavior', async () => {
    const year = new Date().getFullYear();
    const { getByTestId } = render(<Footer links={links} />);
    const footerContent = getByTestId('footerContent');

    // footerContent inner text
    const text = footerContent.textContent;
    expect(text).toBe(`© ${year}`);
  });
});

// 10pts
describe('Check style', () => {
  test('section tag has correct style', () => {
    // Arrange
    const section = getByTestId('footer');
    const { display, flexDirection, justifyItems, justifyContent, backgroundColor, padding, borderTop } =
      window.getComputedStyle(section);

    expect(display).toBe('flex');
    expect(flexDirection).toBe('row');
    expect(padding).toBe('24px 40px');
    expect(justifyItems).toBe('center');
    expect(justifyContent).toBe('space-between');
    expect(backgroundColor).toBe('rgb(248, 249, 250)');
    expect(borderTop).toBe('1px solid #e9ecef');
  });

  test('a tag has correct style', () => {
    const section = getByTestId('footerLink0');
    const { color, textDecoration } = window.getComputedStyle(section.querySelector('a'));

    // get tag a inside section
    expect(color).toBe('rgb(51, 51, 51)');
    expect(textDecoration).toBe('underline');
  });
});
