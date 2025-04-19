import React from "react";

function Login() {
  return (
    <>
      <h1 className="songTrail">SongTrail</h1>
      <p className="slogan">The soundtrack of your life, mapped.</p>
        <div className="login">
            <a className="btn-spotify" href="/auth/login" >
              <button>
                  Login with Spotify
              </button>
            </a>
        </div>
    </>
  );
}

export default Login