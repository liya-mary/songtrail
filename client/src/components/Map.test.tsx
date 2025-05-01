import { render, screen } from '@testing-library/react';
import Map from './Map';
import { MapContainer, TileLayer } from 'react-leaflet';

describe('Map', () => {
  
  const mockTagList = [
    {
      _id: "tag1",
      artist: "Taylor Swift",
      title: "Cruel Summer",
      src: "spotify:track:1BxfuPKGuaTgP7aM0Bbdwr",
      coordinates: [52.5467648, 13.1858432],
      timestamp: 1745499259468,
      __v: 0
    },
    {
      _id: "tag2",
      artist: "Ed Sheeran",
      title: "Shape of You",
      src: "spotify:track:7qiZfU4dY1lWllzX7mPBI3",
      coordinates: [52.5200066, 13.404954],
      timestamp: 1745499260123,
      __v: 0
    }
  ];

  it('renders Map', () => {
    render(<Map position={[51.505, -0.09]} tagList={[]} handleClick={null} />);

    screen.debug();
    expect(<MapContainer/>).toBeTruthy();

  });

  it('renders correct number of tags', () => {
    const {container}=render(<Map position={[51.505, -0.09]} tagList={mockTagList} handleClick={null} />);

    screen.debug();
    const renderedMarkers = container.querySelectorAll('.leaflet-marker-icon');
    expect(renderedMarkers.length).toBe(mockTagList.length);

  });
});