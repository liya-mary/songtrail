import { render, screen } from '@testing-library/react';

import Login from './Login';

describe('Login', () => {
  it('renders the login screen correctly', () => {
    render(<Login/>);

    screen.debug();

    let element = screen.getByText("Login with Spotify");
    expect(element).toBeTruthy();
  });

  // it("validate function should fail on incorrect input ", () => {
  //   const text = "text";
  //   expect((text)).not.toBe(true);
  // });
});

