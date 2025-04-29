import spotifyService from './spotifyService';

describe('Spotify Service', () => {

     it('exports getAccessToken', () => {
          expect(spotifyService).toHaveProperty('getAccessToken');
     });

     it('exports searchSong', () => {
          expect(spotifyService).toHaveProperty('searchSong');
     });

     it('exports getAuthToken', () => {
          expect(spotifyService).toHaveProperty('getAuthToken');
     });

});