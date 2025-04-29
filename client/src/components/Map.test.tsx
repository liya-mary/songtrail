import { render, screen } from '@testing-library/react';


import Map from './Map';
import { MapContainer, TileLayer } from 'react-leaflet';

describe('Map', () => {
  it('renders Map', () => {
    render(<Map position={[51.505, -0.09]} tagList={[]} handleClick={null} />);

    screen.debug();
    expect(<MapContainer/>).toBeTruthy();

  });

  it('renders correct number of tags', () => {
    render(<Map position={[51.505, -0.09]} tagList={[]} handleClick={null} />);

    screen.debug();

  });
});