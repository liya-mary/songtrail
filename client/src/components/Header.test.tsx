import { render, screen } from '@testing-library/react';


import Header from './Header';

describe('Header', () => {
  it('renders headline', () => {
    render(<Header />);

    screen.debug();
    expect(screen.getByText('SongTrail')).toBeInTheDocument();

    // check if Header components renders headline
  });
});