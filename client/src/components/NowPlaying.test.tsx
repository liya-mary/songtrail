import { render, screen } from '@testing-library/react';


import NowPlaying from './NowPlaying';

const mockTrack = {
     name: 'Love is a game',
     artists: [{ name: 'Adele' }],
     artist: 'Adele',
     album: { images: [ { url: 'https://static.wikia.nocookie.net/adeles/images/7/74/30_Cover.jpg/revision/latest?cb=20211013144301' }] },
     id: 0
};

describe('NowPlaying', () => {
  it('renders NowPlaying', () => {
    render(<NowPlaying track={mockTrack}/>);
  });

  it('renders the title of the song', () => {
     render(<NowPlaying track={mockTrack}/>);
     let titleEl = screen.getByText('Love is a game');
     expect(titleEl).toBeTruthy();
   });

   it('renders the artist name', () => {
     render(<NowPlaying track={mockTrack}/>);
     let artistEl = screen.getByText('Adele');
     expect(artistEl).toBeTruthy();
   });

   it('renders the album image', () => {
     render(<NowPlaying track={mockTrack}/>);
     let img = screen.getByRole("img");
     expect(img).toBeTruthy();
     expect(img.getAttribute("src")).toBe(mockTrack.album.images[0].url);
   });

});