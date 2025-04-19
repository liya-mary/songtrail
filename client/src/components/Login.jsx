import React from "react";

function Login() {
  return (
      <div className="login">
          <a className="btn-spotify" href="/auth/login" >
            <button>
                Login with Spotify
            </button>
          </a>
      </div>
  );
}

export default Login