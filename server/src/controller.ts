
import { Request, Response, NextFunction } from 'express';
import Tags from './models';
import { URLSearchParams } from "url";

var access_token: string|null = null

export async function getTags(req:Request, res:Response) {
  try {
    const tags = await Tags.find();
    res.status(200).json(tags);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

export async function addTag(req:Request, res:Response) {
  try {
    const newTag = await Tags.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
}

export async function getToken(req:Request, res:Response) {
  try {
    const { CLIENT_ID, CLIENT_SECRET } = process.env;
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    })
    const tokenObject = await response.json()
    res.status(200).json(tokenObject)

  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
}

const generateRandomString = function (length:number) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export async function spotifyLogin(req:Request, res:Response) {


  const scope:string = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
  const state:string = generateRandomString(16);
  const { CLIENT_ID } = process.env;
  console.log("client id : ", CLIENT_ID)

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: `${CLIENT_ID}`,
    scope: scope,
    redirect_uri: "http://127.0.0.1:3000/auth/callback",
    state: state
  });
  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
}



export async function spotifyAuth(req:Request, res:Response)  {
  const code = req.query.code;
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code: `${code}`,
      redirect_uri: "http://127.0.0.1:3000/auth/callback",
      grant_type: 'authorization_code'
    })
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error("Spotify API Error:", errorText);
    res.status(400).json({ error: "Failed to get token", details: errorText });
    return;
  }

  const tokenData = await tokenResponse.json();
  access_token = tokenData.access_token;
  res.redirect('https://localhost:5173')

}


export async function returnToken(req:Request, res:Response) {
  if (!access_token) {
    res.status(401).json({ error: "No token available" });
    return ;
  }
  res.json({ access_token: access_token });
}


