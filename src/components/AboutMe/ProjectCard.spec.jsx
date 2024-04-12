import { render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import ProjectCard from './ProjectCard.jsx';
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
  const skills = [
    {
      logo: '/slack.png',
      organization: 'Slack',
      jobTitle: 'Software Engineer',
      startYear: 2016,
      endYear: 2018,
    },
  ];
  const { container, getByTestId } = render(<ProjectCard title={'a'} content={'b'} skills={skills} />);

  // -- load css
  loadCss(container, './src/index.css');
  loadCss(container, './src/components/ProjectCard/ProjectCard.css');

  // Act & Assert
  return getByTestId(testId);
}

afterEach(() => {
  // Restore the original console.error function after all tests
  vi.restoreAllMocks();
});

// 10pts
describe('Check properties', () => {
  test('Required props are set correctly', async () => {
    // Arrange
    let actualErrors = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((_, __, message) => {
      actualErrors.push(message);
    });
    // -- define the expected errors
    let expectedErrors = [
      'The prop `logo` is marked as required in `ProjectCard`, but its value is `undefined`.',
      'The prop `name` is marked as required in `ProjectCard`, but its value is `undefined`.',
      'The prop `content` is marked as required in `ProjectCard`, but its value is `undefined`.',
    ];

    // Act
    render(<ProjectCard />);

    // Assert
    expect(spy).toHaveBeenCalledTimes(3);
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
      'Invalid prop `logo` of type `number` supplied to `ProjectCard`, expected `string`.',
      'Invalid prop `name` of type `number` supplied to `ProjectCard`, expected `string`.',
      'Invalid prop `content` of type `number` supplied to `ProjectCard`, expected `string`.',
    ];

    // Act
    render(<ProjectCard logo={1} content={2} name={3} />);

    // Assert
    expect(spy).toHaveBeenCalledTimes(3);
    // -- for each expected error, check if it exists in the actual errors
    for (const expected of expectedErrors) {
      expect(actualErrors.find((actual) => actual === expected)).toBeTruthy();
    }
  });

  test('Default props have correct values', async () => {
    const component = renderer.create(<ProjectCard name={'a'} content={'b'} logo={''} />);
    const testInstance = component.root;
    expect(testInstance.props.link).toBe('#');
  });
});

// 10pts
describe('Check structure', () => {
  test('ProjectCard has correct structure', async () => {
    const { getByTestId } = render(<ProjectCard title={'a'} content={'b'} logo={'c'} />);
    const projectCard = getByTestId('projectCard');
    const projectCardLogo = getByTestId('projectCardLogo');
    const projectCardName = getByTestId('projectCardName');
    const projectCardContent = getByTestId('projectCardContent');
    const projectCardLink = getByTestId('projectCardLink');

    expect(projectCard).toBeTruthy();
    expect(projectCardLogo).toBeTruthy();
    expect(projectCardName).toBeTruthy();
    expect(projectCardContent).toBeTruthy();
    expect(projectCardLink).toBeTruthy();
  });
});

// 20pts
describe('Check behavior', () => {
  test('ProjectCard has correct behavior', async () => {
    const { getByTestId } = render(<ProjectCard title={'a'} content={'b'} logo={'c'} />);
    const projectCard = getByTestId('projectCard');
    const projectCardLogo = getByTestId('projectCardLogo');
    const projectCardName = getByTestId('projectCardName');
    const projectCardContent = getByTestId('projectCardContent');
    const projectCardLink = getByTestId('projectCardLink');

    expect(projectCard).toBeTruthy();
    expect(projectCardLogo).toBeTruthy();
    expect(projectCardName).toBeTruthy();
    expect(projectCardContent).toBeTruthy();
    expect(projectCardLink).toBeTruthy();
  });
});

// 10pts
describe('Check style', () => {
  test('projectCard has correct style', () => {
    // Arrange
    const projectCard = getByTestId('projectCard');

    const { display, flexDirection, padding, border, borderRadius, width, maxWidth, boxShadow, rowGap } =
      window.getComputedStyle(projectCard);

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

  test('projectCardLogo correct style', () => {
    // Arrange
    const projectCardLogo = getByTestId('projectCardLogo');

    const { width, height, borderRadius, padding, border } = window.getComputedStyle(projectCardLogo);

    expect(width).toBe('64px');
    expect(height).toBe('64px');
    expect(borderRadius).toBe('50%');
    expect(padding).toBe('4px');
    expect(border).toBe('2px solid #e0e0e0');
  });

  test('projectCardName has correct style', () => {
    // Arrange
    const projectCardName = getByTestId('projectCardName');
    const { margin, fontSize, fontWeight, color } = window.getComputedStyle(projectCardName);

    expect(margin).toBe('8px 0px 0px 0px');
    expect(fontSize).toBe('24px');
    expect(fontWeight).toBe('bold');
    expect(color).toBe('rgb(51, 51, 51)');
  });

  test('projectCardContent has correct style', () => {
    // Arrange
    const projectCardContent = getByTestId('projectCardContent');

    const { fontSize, color, overflow, display } = window.getComputedStyle(projectCardContent);

    expect(fontSize).toBe('16px');
    expect(color).toBe('rgb(119, 119, 119)');
    expect(overflow).toBe('hidden');
    expect(display).toBe('-webkit-box');
  });

  test('projectCardLink has correct style', async () => {
    // Arrange
    const projectCardLink = getByTestId('projectCardLink');

    const { display, alignItems, fontSize, color, textDecoration, paddingBottom, borderBottom } =
      window.getComputedStyle(projectCardLink);

    expect(display).toBe('inline-flex');
    expect(alignItems).toBe('center');
    expect(fontSize).toBe('16px');
    expect(color).toBe('rgb(0, 0, 0)');
    expect(textDecoration).toBe('none');
    expect(paddingBottom).toBe('4px');
    expect(borderBottom).toBe('1px solid #000');
  });
});
