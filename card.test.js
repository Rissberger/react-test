import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like .toBeInTheDocument
import Card from './Card';

describe('Card Component', () => {
  // Smoke Test
  it('renders without crashing', () => {
    render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
  });

  // Snapshot Test
  it('matches snapshot for a given set of props', () => {
    const { asFragment } = render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Additional Test: Check if the card displays the correct caption and image count
  it('displays the correct caption and image count', () => {
    const { getByText, getByAltText } = render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
    
    // Check if the caption is displayed
    expect(getByText("Test Caption")).toBeInTheDocument();
    
    // Check if the image has the correct alt text
    expect(getByAltText("Test Caption")).toBeInTheDocument();
    
    // Check if the current image number and total number of images are displayed correctly
    expect(getByText("Image 1 of 3")).toBeInTheDocument();
  });
});
