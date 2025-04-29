import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';
import { vi } from 'vitest';

beforeAll(() => {

  global.navigator = {
    ...global.navigator,
    geolocation: {
      ...global.navigator.geolocation,
      getCurrentPosition: vi.fn().mockImplementation(
        (success: PositionCallback) => {
          success({
            coords: {
              latitude: 51.505,
              longitude: -0.09,
              accuracy: 100,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
              toJSON: function () {
                return {};
              }
            },
            toJSON: function () {
              return {};
            },
            timestamp: Date.now()
          });
        }
      )
    }
  };

});

describe('App', () => {
  it('renders the application properly without error', () => {
    render(<App/>);

    let loginButton = screen.getByText('Login with Spotify');
    expect(loginButton).toBeTruthy();

    fireEvent.mouseDown(loginButton);

    screen.debug();
  });
});