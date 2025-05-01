import { fireEvent, render, screen } from '@testing-library/react';
import Map from './Map';

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
  describe('Map component', () => {
    it('shows Tag popup content when marker is clicked', async () => {
  
      const { container } = render(
        <Map position={[52.54, 13.19]} tagList={mockTagList} handleClick={() => {}} />
      );
  
      const marker = container.querySelector('.leaflet-marker-icon');
      expect(marker).toBeTruthy();
  
      if (marker) {
        fireEvent.click(marker)
        expect(await screen.findByText('Cruel Summer')).toBeInTheDocument();
        expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
      }

    });
  });



