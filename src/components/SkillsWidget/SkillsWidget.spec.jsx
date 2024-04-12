import { render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import SkillsWidget from './SkillsWidget.jsx';
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
  const { container, getByTestId } = render(<SkillsWidget title={'a'} content={'b'} skills={skills} />);

  // -- load css
  loadCss(container, './src/index.css');
  loadCss(container, './src/components/SkillsWidget/SkillsWidget.css');

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
      'The prop `title` is marked as required in `SkillsWidget`, but its value is `undefined`.',
      'The prop `content` is marked as required in `SkillsWidget`, but its value is `undefined`.',
    ];

    // Act
    render(<SkillsWidget />);

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
      'Invalid prop `title` of type `number` supplied to `SkillsWidget`, expected `string`.',
      'Invalid prop `content` of type `number` supplied to `SkillsWidget`, expected `string`.',
      'Invalid prop `skills[0]` of type `number` supplied to `SkillsWidget`, expected `object`.',
    ];

    // Act
    render(<SkillsWidget title={1} content={2} skills={[3]} />);

    // Assert
    expect(spy).toHaveBeenCalledTimes(3);
    // -- for each expected error, check if it exists in the actual errors
    for (const expected of expectedErrors) {
      expect(actualErrors.find((actual) => actual === expected)).toBeTruthy();
    }
  });

  test('Default props have correct values', async () => {
    const component = renderer.create(<SkillsWidget title={'a'} content={'b'} />);
    const testInstance = component.root;
    expect(testInstance.props.skills).toStrictEqual([]);
  });
});

// 10pts
describe('Check structure', () => {
  test('SkillsWidget has correct structure', async () => {
    const skills = [{ icon: '🎨', name: 'Design', proficiency: 8 }];

    const { getByTestId } = render(<SkillsWidget title={'a'} content={'b'} skills={skills} />);
    const skillsWidget = getByTestId('skillsWidget');
    const skillsWidgetTitle = getByTestId('skillsWidgetTitle');
    const skillsWidgetContent = getByTestId('skillsWidgetContent');
    const skillsWidgetItem0 = getByTestId('skillsWidgetItem0');
    const skillsWidgetItemLogo0 = getByTestId('skillsWidgetItemLogo0');
    const skillsWidgetItemProficiency0 = getByTestId('skillsWidgetItemProficiency0');
    const skillsWidgetItemName0 = getByTestId('skillsWidgetItemName0');

    expect(skillsWidget).toBeTruthy();
    expect(skillsWidgetTitle).toBeTruthy();
    expect(skillsWidgetContent).toBeTruthy();
    expect(skillsWidgetItem0).toBeTruthy();
    expect(skillsWidgetItemLogo0).toBeTruthy();
    expect(skillsWidgetItemProficiency0).toBeTruthy();
    expect(skillsWidgetItemName0).toBeTruthy();
  });
});

// 20pts
describe('Check behavior', () => {
  test('SkillsWidget has correct behavior', async () => {
    const skills = [
      { icon: '🎨', name: 'Design', proficiency: 8 },
      { icon: '🎨', name: 'Design', proficiency: 8 },
      { icon: '💻', name: 'Programming', proficiency: 9 },
      { icon: '📝', name: 'Writing', proficiency: 7 },
    ];

    const { getByTestId } = render(<SkillsWidget title={'a'} content={'b'} skills={skills} />);
    const skillsWidget = getByTestId('skillsWidget');
    const skillsWidgetItem0 = getByTestId('skillsWidgetItem0');
    const skillsWidgetItem1 = getByTestId('skillsWidgetItem1');
    const skillsWidgetItem2 = getByTestId('skillsWidgetItem2');
    const skillsWidgetItem3 = getByTestId('skillsWidgetItem3');

    expect(skillsWidget).toBeTruthy();
    expect(skillsWidgetItem0).toBeTruthy();
    expect(skillsWidgetItem1).toBeTruthy();
    expect(skillsWidgetItem2).toBeTruthy();
    expect(skillsWidgetItem3).toBeTruthy();
  });
});

// 10pts
describe('Check style', () => {
  test('section tag has correct style', () => {
    // Arrange
    const section = getByTestId('skillsWidget');
    const { display, flexDirection, padding, border, borderRadius, width, maxWidth, boxShadow, rowGap } =
      window.getComputedStyle(section);

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
    const h2 = getByTestId('skillsWidgetTitle');
    const { margin, fontSize, fontWeight, color } = window.getComputedStyle(h2);
    expect(margin).toBe('0px');
    expect(fontSize).toBe('24px');
    expect(fontWeight).toBe('bold');
    expect(color).toBe('rgb(51, 51, 51)');
  });

  test('p tag has correct style', () => {
    // Arrange
    const p = getByTestId('skillsWidgetContent');
    const { fontSize, color } = window.getComputedStyle(p);
    expect(fontSize).toBe('16px');
    expect(color).toBe('rgb(119, 119, 119)');
  });

  test('img tag has correct style', () => {
    // Arrange
    const img = getByTestId('skillsWidgetItemLogo0');
    const { width, height } = window.getComputedStyle(img);
    expect(width).toBe('52px');
    expect(height).toBe('52px');
  });

  test('h3 tag has correct style', async () => {
    // Arrange
    const h3 = getByTestId('skillsWidgetItemName0');
    const { flexShrink, margin, fontSize, fontWeight, color } = window.getComputedStyle(h3);
    expect(flexShrink).toBe('1');
    expect(margin).toBe('0px');
    expect(fontSize).toBe('16px');
    expect(fontWeight).toBe('bold');
    expect(color).toBe('rgb(51, 51, 51)');
  });
});
