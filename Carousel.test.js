import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

const photos = [
  { src: "test1.jpg", caption: "Test Caption 1" },
  { src: "test2.jpg", caption: "Test Caption 2" },
  // Add more if needed for testing
];

describe("Carousel component tests", () => {
  // Smoke Test
  it('renders without crashing', () => {
    render(<Carousel photos={photos} title="Test Title" />);
  });

  // Snapshot Test
  it('matches snapshot', () => {
    const { asFragment } = render(<Carousel photos={photos} title="Test Title" />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Test for Left Arrow Bug
  it('left arrow moves to the previous image', () => {
    const { getByTestId, getByAltText } = render(<Carousel photos={photos} title="Test Title" />);
    const rightArrow = getByTestId('right-arrow');
    fireEvent.click(rightArrow); // Move forward to the second image
    const leftArrow = getByTestId('left-arrow');
    fireEvent.click(leftArrow); // Attempt to move back to the first image
    expect(getByAltText('Test Caption 1')).toBeInTheDocument(); // This should pass after fixing the bug
  });

  // Tests for Arrow Visibility
  it('hides the left arrow on the first image and the right arrow on the last image', () => {
    const { getByTestId, queryByTestId } = render(<Carousel photos={photos} title="Test Title" />);
    expect(queryByTestId('left-arrow')).toBeNull(); // Left arrow should not be visible initially

    const rightArrow = getByTestId('right-arrow');
    fireEvent.click(rightArrow); // Move to the last image

    expect(queryByTestId('right-arrow')).toBeNull(); // Right arrow should not be visible now
  });
});
