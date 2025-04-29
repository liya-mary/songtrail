import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  
    const mockTracks = [
        {
            id: 1,
            name: "Mock Song One",
            artist: "Taylor Swift",
            artists: [
              { name: "Taylor Swift" }
            ],
            uri: "spotify:track:track1",
            album: {
              name: "Mock Album One",
              images: [
                {
                  url: "https://via.placeholder.com/300x300?text=Album+1"
                }
              ]
            }
          }
      ];

  it('renders search results', () => {
    render(<SearchResults tracks={mockTracks} handleTrackClick={()=>{}}/>);

    screen.debug();
    expect(screen.findByText('Mock Song One')).toBeTruthy();

  });

});