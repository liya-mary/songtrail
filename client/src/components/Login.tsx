import React from "react";
// import logo from '../assets/pin.png'

function Login() {
  return (
    <>
      {/* <img src={logo}/> */}
      <div className="login">
        <h1 className="login-songTrail">SongTrail</h1>
        <p className="slogan">The soundtrack of your life, mapped.</p>
        <div className="login-section">
            <a href="/auth/login" >
              <button className="login-button">
                  Login with Spotify
              </button>
            </a>
        </div>
      </div>
    </>
  );
}

export default Login;