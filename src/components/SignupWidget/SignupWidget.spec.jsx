import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import SignupWidget from './SignupWidget.jsx';
import fs from 'fs';
import path from 'path';
import renderer from 'react-test-renderer';

function loadCss(container, filePath) {
  const cssFileContent = fs.readFileSync(path.resolve(filePath), 'utf8');
  const style = document.createElement('style');
  style.innerHTML = cssFileContent;
  container.append(style);
}

function getByTestId(testId) {
  // -- render component
  const { container, getByTestId } = render(<SignupWidget title={'a'} content={'b'} />);

  // -- load css
  loadCss(container, './src/index.css');
  loadCss(container, './src/components/SignupWidget/SignupWidget.css');

  // Act & Assert
  return getByTestId(testId);
}

afterEach(() => {
  // Restore the original console.error function after all tests
  vi.restoreAllMocks();
});

test('Required props are set correctly', async () => {
  // Arrange
  let actualErrors = [];
  const spy = vi.spyOn(console, 'error').mockImplementation((_, __, message) => {
    actualErrors.push(message);
  });
  // -- define the expected errors
  let expectedErrors = [
    'The prop `title` is marked as required in `SignupWidget`, but its value is `undefined`.',
    'The prop `content` is marked as required in `SignupWidget`, but its value is `undefined`.',
  ];

  // Act
  render(<SignupWidget />);

  // Assert
  expect(spy).toHaveBeenCalledTimes(2);
  // -- for each expected error, check if it exists in the actual errors
  for (const expected of expectedErrors) {
    expect(actualErrors.find((actual) => actual === expected)).toBeTruthy();
  }
});

test('Prop types are set correctly', async () => {
  // Arrange
  let actualErrors = [];
  const spy = vi.spyOn(console, 'error').mockImplementation((_, __, message) => {
    actualErrors.push(message);
  });
  // -- define the expected errors
  let expectedErrors = [
    'Invalid prop `title` of type `number` supplied to `SignupWidget`, expected `string`.',
    'Invalid prop `content` of type `number` supplied to `SignupWidget`, expected `string`.',
  ];

  // Act
  render(<SignupWidget title={1} content={2} />);

  // Assert
  expect(spy).toHaveBeenCalledTimes(2);
  // -- for each expected error, check if it exists in the actual errors
  for (const expected of expectedErrors) {
    expect(actualErrors.find((actual) => actual === expected)).toBeTruthy();
  }
});

test('Default props have correct values', async () => {
  const component = renderer.create(<SignupWidget title={'a'} content={'b'} />);
  const testInstance = component.root;
  expect(testInstance.props.simulateNetworkRequestTime).toBe(2000);
});

test('SignupWidget has correct behavior', async () => {
  const { getByTestId } = render(<SignupWidget title={'a'} content={'b'} simulateNetworkRequestTime={200} />);
  const signupWidgetTitle = getByTestId('signupWidgetTitle');
  const signupWidgetContent = getByTestId('signupWidgetContent');
  const signupWidgetInput = getByTestId('signupWidgetInput');
  const signupWidgetButton = getByTestId('signupWidgetButton');

  // Invalidate email
  fireEvent.change(signupWidgetInput, { target: { value: 'user' } });
  fireEvent.blur(signupWidgetButton);
  expect(document.querySelector('input:valid')).toBeFalsy();

  // Title and content are set correctly
  expect(signupWidgetTitle.textContent).toBe('a');
  expect(signupWidgetContent.textContent).toBe('b');

  // Type email
  fireEvent.change(signupWidgetInput, { target: { value: 'user@email.com' } });
  fireEvent.blur(signupWidgetButton);
  expect(document.querySelector('input:valid')).toBeTruthy();

  fireEvent.click(signupWidgetButton);
  await new Promise((resolve) => setTimeout(resolve, 100));
  expect(signupWidgetButton.textContent).toBe('Joining...');
  expect(signupWidgetInput.disabled).toBeTruthy();
  expect(signupWidgetButton.disabled).toBeTruthy();

  // Wait for the network request to finish
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  expect(getByTestId('signupWidgetMessage')).toBeTruthy();
});

describe('SignupWidget has correct style', () => {
  test('form tag has correct style', () => {
    // Arrange
    const articleCard = getByTestId('signupWidget');
    const { display, flexDirection, padding, border, borderRadius, width, maxWidth, boxShadow, rowGap } =
      window.getComputedStyle(articleCard);

    expect(display).toBe('flex');
    expect(flexDirection).toBe('column');
    expect(padding).toBe('24px');
    expect(border).toBe('1px solid #e0e0e0');
    expect(borderRadius).toBe('6px');
    expect(width).toBe('100%');
    expect(maxWidth).toBe('420px');
    expect(rowGap).toBe('12px');
    expect(boxShadow).toBe('0 0 10px 0 rgba(0, 0, 0, 0.1)');
  });

  test('h2 tag has correct style', () => {
    // Arrange
    const h2 = getByTestId('signupWidgetTitle');
    const { margin, fontSize, fontWeight, color } = window.getComputedStyle(h2);
    expect(margin).toBe('0px');
    expect(fontSize).toBe('24px');
    expect(fontWeight).toBe('bold');
    expect(color).toBe('rgb(51, 51, 51)');
  });

  test('p tag has correct style', () => {
    // Arrange
    const p = getByTestId('signupWidgetContent');
    const { fontSize, color } = window.getComputedStyle(p);
    expect(fontSize).toBe('16px');
    expect(color).toBe('rgb(119, 119, 119)');
  });

  test('input tag has correct style', () => {
    // Arrange
    const input = getByTestId('signupWidgetInput');
    const { padding, border, borderRadius, flex } = window.getComputedStyle(input);
    expect(padding).toBe('10px');
    expect(border).toBe('1px solid #e0e0e0');
    expect(borderRadius).toBe('6px');
    expect(flex).toBe('1');
  });

  test('button tag has correct style', async () => {
    // Arrange
    const button = getByTestId('signupWidgetButton');
    const { display, padding, width, textAlign, borderRadius, backgroundColor, color, lineHeight, fontSize, cursor } =
      window.getComputedStyle(button);
    expect(display).toBe('inline-block');
    expect(padding).toBe('2px 24px');
    expect(width).toBe('42px');
    expect(textAlign).toBe('center');
    expect(borderRadius).toBe('6px');
    expect(backgroundColor).toBe('rgb(69, 160, 73)');
    expect(color).toBe('rgb(255, 255, 255)');
    expect(lineHeight).toBe('16px');
    expect(fontSize).toBe('14px');
    expect(cursor).toBe('pointer');

    // -- hover
    fireEvent.mouseOver(button);
    const { backgroundColor: hoverBackgroundColor } = window.getComputedStyle(button);
    expect(hoverBackgroundColor).toBe('rgb(69, 160, 73)');

    // -- disabled
    button.disabled = true;
    const { opacity, cursor: disabledCursor } = window.getComputedStyle(button);
    expect(opacity).toBe('0.7');
    expect(disabledCursor).toBe('not-allowed');
  });
});
