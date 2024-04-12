import { render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import WorkWidget from './WorkWidget.jsx';
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
  const experiences = [
    {
      logo: '/slack.png',
      organization: 'Slack',
      jobTitle: 'Software Engineer',
      startYear: 2016,
      endYear: 2018,
    },
  ];
  const { container, getByTestId } = render(<WorkWidget title={'a'} content={'b'} experiences={experiences} />);

  // -- load css
  loadCss(container, './src/index.css');
  loadCss(container, './src/components/WorkWidget/WorkWidget.css');

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
      'The prop `title` is marked as required in `WorkWidget`, but its value is `undefined`.',
      'The prop `content` is marked as required in `WorkWidget`, but its value is `undefined`.',
    ];

    // Act
    render(<WorkWidget />);

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
      'Invalid prop `title` of type `number` supplied to `WorkWidget`, expected `string`.',
      'Invalid prop `content` of type `number` supplied to `WorkWidget`, expected `string`.',
      'Invalid prop `experiences[0]` of type `number` supplied to `WorkWidget`, expected `object`.',
    ];

    // Act
    render(<WorkWidget title={1} content={2} experiences={[3]} />);

    // Assert
    expect(spy).toHaveBeenCalledTimes(3);
    // -- for each expected error, check if it exists in the actual errors
    for (const expected of expectedErrors) {
      expect(actualErrors.find((actual) => actual === expected)).toBeTruthy();
    }
  });

  test('Default props have correct values', async () => {
    const experiences = [
      {
        logo: '/slack.png',
        organization: 'Slack',
        jobTitle: 'Software Engineer',
        startYear: 2016,
        endYear: 2018,
      },
    ];
    const component = renderer.create(<WorkWidget title={'a'} content={'b'} experiences={experiences} />);
    const testInstance = component.root;
    expect(testInstance.props.experiences).toBe(experiences);
  });
});

// 10pts
describe('Check structure', () => {
  test('WorkWidget has correct structure', async () => {
    const experiences = [
      {
        logo: '/slack.png',
        organization: 'Slack',
        jobTitle: 'Software Engineer',
        startYear: 2016,
        endYear: 2018,
      },
    ];

    const { getByTestId } = render(<WorkWidget title={'a'} content={'b'} experiences={experiences} />);
    const workWidget = getByTestId('workWidget');
    const workWidgetItem0 = getByTestId('workWidgetItem0');
    const workWidgetItemLogo0 = getByTestId('workWidgetItemLogo0');
    const workWidgetItemTitle0 = getByTestId('workWidgetItemTitle0');
    const workWidgetItemContent0 = getByTestId('workWidgetItemContent0');
    const workWidgetItemDates0 = getByTestId('workWidgetItemDates0');

    expect(workWidget).toBeTruthy();
    expect(workWidgetItem0).toBeTruthy();
    expect(workWidgetItemLogo0).toBeTruthy();
    expect(workWidgetItemTitle0).toBeTruthy();
    expect(workWidgetItemContent0).toBeTruthy();
    expect(workWidgetItemDates0).toBeTruthy();
  });
});

// 20pts
describe('Check behavior', () => {
  test('WorkWidget has correct behavior', async () => {
    const experiences = [
      {
        logo: '/slack.png',
        organization: 'Slack',
        jobTitle: 'Software Engineer',
        startYear: 2016,
        endYear: 2018,
      },
      {
        logo: '/spotify.png',
        organization: 'Spotify',
        jobTitle: 'Software Engineer',
        startYear: 2014,
        endYear: 2015,
      },
      {
        logo: '/audible.png',
        organization: 'Audible',
        jobTitle: 'Software Engineer',
        startYear: 2012,
        endYear: 2013,
      },
      {
        logo: '/microsoft.png',
        organization: 'Microsoft',
        jobTitle: 'Software Engineer',
        startYear: 2010,
        endYear: 2011,
      },
    ];

    const { getByTestId } = render(<WorkWidget title={'a'} content={'b'} experiences={experiences} />);
    const workWidget = getByTestId('workWidget');
    const workWidgetItem0 = getByTestId('workWidgetItem0');
    const workWidgetItem1 = getByTestId('workWidgetItem1');
    const workWidgetItem2 = getByTestId('workWidgetItem2');
    const workWidgetItem3 = getByTestId('workWidgetItem3');

    expect(workWidget).toBeTruthy();
    expect(workWidgetItem0).toBeTruthy();
    expect(workWidgetItem1).toBeTruthy();
    expect(workWidgetItem2).toBeTruthy();
    expect(workWidgetItem3).toBeTruthy();
  });
});

// 10pts
describe('Check style', () => {
  test('section tag has correct style', () => {
    // Arrange
    const section = getByTestId('workWidget');
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
    const h2 = getByTestId('workWidgetTitle');
    const { margin, fontSize, fontWeight, color } = window.getComputedStyle(h2);
    expect(margin).toBe('0px');
    expect(fontSize).toBe('24px');
    expect(fontWeight).toBe('bold');
    expect(color).toBe('rgb(51, 51, 51)');
  });

  test('p tag has correct style', () => {
    // Arrange
    const p = getByTestId('workWidgetContent');
    const { fontSize, color } = window.getComputedStyle(p);
    expect(fontSize).toBe('16px');
    expect(color).toBe('rgb(119, 119, 119)');
  });

  test('img tag has correct style', () => {
    // Arrange
    const img = getByTestId('workWidgetItemLogo0');
    const { width, height, borderRadius } = window.getComputedStyle(img);
    expect(width).toBe('40px');
    expect(height).toBe('40px');
    expect(borderRadius).toBe('50%');
  });

  test('h3 tag has correct style', async () => {
    // Arrange
    const h3 = getByTestId('workWidgetItemTitle0');
    const { flexShrink, margin, fontSize, fontWeight, color } = window.getComputedStyle(h3);
    expect(flexShrink).toBe('1');
    expect(margin).toBe('0px');
    expect(fontSize).toBe('16px');
    expect(fontWeight).toBe('bold');
    expect(color).toBe('rgb(51, 51, 51)');
  });
});
