import { fireEvent, render } from '@testing-library/react';
import { afterEach, expect, test, vi, describe } from 'vitest';
import fs from 'fs';
import path from 'path';
import Dropdown from './Dropdown.jsx';

function loadCss(container, filePath) {
  const cssFileContent = fs.readFileSync(path.resolve(filePath), 'utf8');
  const style = document.createElement('style');
  style.innerHTML = cssFileContent;
  container.append(style);
}

function renderValidDropdown() {
  const { container, getByTestId } = render(<Dropdown />);
  // Load css
  loadCss(container, './src/index.css');
  loadCss(container, './src/components/Dropdown/Dropdown.css');

  return getByTestId('dropdown');
}

afterEach(() => {
  // Restore the original console.error function after all tests
  vi.restoreAllMocks();
});

describe('Check properties', () => {
  test('Props are being validated', async () => {
    // Arrange
    let actualErrors = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((_, __, message) => {
      actualErrors.push(message);
    });
    // -- define the expected errors
    let expectedErrors = [
      'Invalid prop `onPreview` of type `string` supplied to `Dropdown`, expected `function`.',
      'Invalid prop `onEdit` of type `string` supplied to `Dropdown`, expected `function`.',
      'Invalid prop `onClone` of type `string` supplied to `Dropdown`, expected `function`.',
      'Invalid prop `onDelete` of type `string` supplied to `Dropdown`, expected `function`.',
    ];

    // Act
    render(<Dropdown onPreview={'a'} onEdit={'b'} onClone={'c'} onDelete={'d'} />);

    // Assert
    expect(spy).toHaveBeenCalledTimes(4);
    // -- for each expected error, check if it exists in the actual errors
    for (const expected of expectedErrors) {
      expect(actualErrors.find((actual) => actual === expected)).toBeTruthy();
    }
  });
  test('Props have default value', async () => {
    // Arrange
    //-- return true confirm when window.confirm is called
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Arrange: create and open the dropdown
    const { getByTestId } = render(<Dropdown />);
    const menuButton = getByTestId('menuButton');
    fireEvent.click(menuButton);

    // Select the buttons
    const buttons = getByTestId('dropdown').querySelectorAll('.dropdown-item');

    // Act: simulate click on each button
    for (let i = 0; i < buttons.length; i++) {
      fireEvent.click(buttons[i]);
    }

    // Assert
    expect(buttons.length).toBe(4);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
describe('Check structure', () => {
  test('Dropdown has the correct structure', () => {
    const dropdown = renderValidDropdown();
    // .dropdown structure
    const dropdownButton = dropdown.querySelector('.dropdown-btn');
    expect(dropdownButton.textContent).toBe('Menu');
    // click the button to open the dropdown
    fireEvent.click(dropdownButton);
    // .dropdown-container structure
    const dropdownContainer = dropdown.querySelector('.dropdown-container');
    expect(dropdownContainer).toBeTruthy();
    // .dropdown-item structure
    const dropdownLinks = dropdown.querySelectorAll('.dropdown-item');
    expect(dropdownLinks.length).toBe(4);
    expect(dropdownLinks[0].textContent).toBe('Preview');
    expect(dropdownLinks[1].textContent).toBe('Edit');
    expect(dropdownLinks[2].textContent).toBe('Clone');
    expect(dropdownLinks[3].textContent).toBe('Delete');
  });
});
describe('Check behavior', () => {
  test('Prop onPreview works', async () => {
    // Arrange: define a variable that will be set to true when the button is clicked
    let clicked = false;
    const { getByTestId } = render(<Dropdown onPreview={() => (clicked = true)} />);
    // -- open the dropdown
    const menuButton = getByTestId('menuButton');
    fireEvent.click(menuButton);

    // Act: simulate click
    const previewButton = getByTestId('previewButton');
    fireEvent.click(previewButton);

    // Assert
    expect(clicked).toBe(true);
  });
  test('Prop onEdit works', async () => {
    // Arrange: define a variable that will be set to true when the button is clicked
    let clicked = false;
    const { getByTestId } = render(<Dropdown onEdit={() => (clicked = true)} />);
    // -- open the dropdown
    const menuButton = getByTestId('menuButton');
    fireEvent.click(menuButton);

    // Act: simulate click
    const editButton = getByTestId('editButton');
    fireEvent.click(editButton);

    // Assert
    expect(clicked).toBe(true);
  });
  test('Prop onClone works', async () => {
    // Arrange: define a variable that will be set to true when the button is clicked
    let clicked = false;
    const { getByTestId } = render(<Dropdown onClone={() => (clicked = true)} />);
    // -- open the dropdown
    const menuButton = getByTestId('menuButton');
    fireEvent.click(menuButton);

    // Act: simulate click
    const cloneButton = getByTestId('cloneButton');
    fireEvent.click(cloneButton);

    // Assert
    expect(clicked).toBe(true);
  });
  test('Prop oneDelete works', async () => {
    // Arrange: define a variable that will be set to true when the button is clicked
    let clicked = false;
    // -- mock window.confirm
    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    const { getByTestId } = render(<Dropdown onDelete={() => (clicked = true)} />);
    // Open the dropdown
    const menuButton = getByTestId('menuButton');
    fireEvent.click(menuButton);

    // Act: simulate click
    const deleteButton = getByTestId('deleteButton');
    fireEvent.click(deleteButton);

    // Assert
    expect(clicked).toBe(true);
  });
});
describe('Check style', () => {
  test('Dropdown has the correct style', () => {
    const dropdown = renderValidDropdown();
    // .dropdown style
    const dropdownStyles = window.getComputedStyle(dropdown);
    expect(dropdownStyles.position).toBe('relative');
    // .dropdown-btn styles
    const menuButton = dropdown.querySelector('.dropdown-btn');
    const menuButtonStyles = window.getComputedStyle(menuButton);
    expect(menuButtonStyles.backgroundColor).toBe('rgb(76, 175, 80)');
    expect(menuButtonStyles.color).toBe('rgb(255, 255, 255)');
    expect(menuButtonStyles.padding).toBe('16px');
    expect(menuButtonStyles.fontSize).toBe('16px');
    expect(menuButtonStyles.cursor).toBe('pointer');

    // open the menu by clicking on it
    fireEvent.click(menuButton);

    // .dropdown-container styles
    const dropdownContainer = dropdown.querySelector('.dropdown-container');
    const dropdownContainerStyles = window.getComputedStyle(dropdownContainer);
    expect(dropdownContainerStyles.position).toBe('absolute');
    expect(dropdownContainerStyles.backgroundColor).toBe('rgb(249, 249, 249)');
    expect(dropdownContainerStyles.minWidth).toBe('160px');
    expect(dropdownContainerStyles.zIndex).toBe('1');
    expect(dropdownContainerStyles.overflow).toBe('hidden');

    // .dropdown-item styles
    const dropdownLinks = dropdown.querySelectorAll('.dropdown-item');
    dropdownLinks.forEach((link) => {
      const linkStyles = window.getComputedStyle(link);
      expect(linkStyles.color).toBe('rgb(0, 0, 0)');
      expect(linkStyles.padding).toBe('12px 0px 12px 8px');
      expect(linkStyles.display).toBe('block');
      expect(linkStyles.cursor).toBe('pointer');
      expect(linkStyles.width).toBe('100%');

      // open the menu by clicking on it
      fireEvent.mouseOver(link);
      const linkHoverStyles = window.getComputedStyle(link);
      if (link.classList.contains('danger')) {
        expect(linkHoverStyles.backgroundColor).toBe('rgb(241, 188, 185)');
        return;
      }

      expect(linkHoverStyles.backgroundColor).toBe('rgb(241, 241, 241)');
    });
  });
});
