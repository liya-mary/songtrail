import { fireEvent, render, screen } from '@testing-library/react';


import Radio from './Radio';
import { vi } from 'vitest';

const mockTrack = {
     name: 'Love is a game',
     artists: [{ name: 'Adele' }],
     artist: 'Adele',
     album: { images: [ { url: 'https://static.wikia.nocookie.net/adeles/images/7/74/30_Cover.jpg/revision/latest?cb=20211013144301' }] },
     id: 0
};

describe('Radio', () => {
  it('renders Radio without a player', () => {
    render(<Radio current_track={mockTrack} player={null} playerFunction={null} isPaused={true}/>);
  });

  it('renders Radio with a player', () => {
     render(<Radio current_track={mockTrack} player={true} playerFunction={null} isPaused={true}/>);
  });

  it('renders Radio with a player', () => {
     render(<Radio current_track={mockTrack} player={true} playerFunction={null} isPaused={true}/>);
  });

  it('handles pause, play, next, last song button clicks with playerFunction', () => {
     let fn = vi.fn();
     render(<Radio current_track={mockTrack} player={true} playerFunction={fn} isPaused={true}/>);
     let controlsContainer = screen.getByTestId('player-controls');
     let controlButtons = controlsContainer.getElementsByTagName("button");
     for (let button of Array.from(controlButtons)) {
          fireEvent.click(button);
     }
     expect(fn.mock.calls.length).toBe(3);
  });

});