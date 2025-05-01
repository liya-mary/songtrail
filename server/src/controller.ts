
import { Request, Response, NextFunction } from 'express';
import Tags from './models';
import { URLSearchParams } from "url";

var userAccessToken: string|null = null
var userRefreshToken: string|null = null
var userAccessTokenExpiry:any|null =null

var appAccessToken: string|null = null
var appRefreshToken: string|null = null
var appAccessTokenExpiry:any|null =null


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

//creating new token everytime getToken called search function

export async function getToken(req:Request, res:Response) {
  try {
    const { CLIENT_ID, CLIENT_SECRET } = process.env;

    if(Date.now()>appAccessTokenExpiry){
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
      })
      const tokenObject = await response.json();
      appAccessToken=tokenObject.access_token;
      appAccessTokenExpiry=Date.now()+ tokenObject.expires_in *1000
      console.log("new app token: ",appAccessToken);
      res.status(200).json({access_token:appAccessToken})
    }else{
      console.log("saved app token: ",appAccessToken);
      res.status(200).json({access_token:appAccessToken})
    }


  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
}


// export async function getToken(req:Request, res:Response):Promise<any>{
//   try {
//     const { CLIENT_ID, CLIENT_SECRET } = process.env;
//     if (!(appRefreshToken && CLIENT_SECRET && CLIENT_ID)) {
//       return null;
//     }

//     if(!appAccessToken ||Date.now()>appAccessTokenExpiry){
//       const authOptions = {
//         url: "https://accounts.spotify.com/api/token",
//         headers: {
//           "content-type": "application/x-www-form-urlencoded",
//           Authorization:
//             "Basic " +
//             Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
//         },
//         form: {
//           grant_type: "client_credentials",
//         },
//         json: true,
//       };
    
//       const response = await fetch(authOptions.url, {
//         method: "post",
//         body: new URLSearchParams(authOptions.form),
//         headers: authOptions.headers,
//       });
//       const res_data = await response.json();
//       appAccessToken=res_data.access_token;
//       console.log("app access token: ",appAccessToken);
//       appAccessTokenExpiry=Date.now()+res_data.expires_in *1000;
//       console.log("app token updated..");
//       console.log(appAccessToken);
//       return res.status(200).json({ access_token: appAccessToken }); 

//     }else{
//       console.log("app saved token..",appAccessToken);
//       return res.status(200).json({ access_token: appAccessToken });
//     }

//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err)
//   }
// }


// export async function getToken(req:Request, res:Response) {
//   try {
//     const { CLIENT_ID, CLIENT_SECRET } = process.env;
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
//     })
//     const tokenObject = await response.json()


//     res.status(200).json(tokenObject)

//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err)
//   }
// }


const generateRandomString = function (length:number) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//on login with spotify it gives an access token for user
//reqest user authorizaton so that app can access spotify resources
//spotify api-
//play-spotify login
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


//request an access token of  user
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
  userAccessToken = tokenData.access_token;
  userRefreshToken=tokenData.refresh_token;
  console.log("user refresh tokens: ",userRefreshToken);
  console.log("user expires in: ",tokenData.expires_in);
  userAccessTokenExpiry=Date.now()+ tokenData.expires_in *1000;
  res.redirect('https://localhost:5173')

}


export async function returnToken(req:Request, res:Response):Promise<any> {
  // if (!userAccessToken) {
  //   res.status(401).json({ error: "No token available" });
  //   return ;
  // }
  // res.json({ access_token: userAccessToken });

  try {
        const { CLIENT_ID, CLIENT_SECRET } = process.env;
        if (!(userRefreshToken && CLIENT_SECRET && CLIENT_ID)) {
          return null;
        }
    
        if(!userAccessToken ||Date.now()>userAccessTokenExpiry){
          const authOptions = {
            url: "https://accounts.spotify.com/api/token",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Authorization:
                "Basic " +
                Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
            },
            form: {
              grant_type: "refresh_token",
              refresh_token: userRefreshToken,
            },
            json: true,
          };
        
          const response = await fetch(authOptions.url, {
            method: "post",
            body: new URLSearchParams(authOptions.form),
            headers: authOptions.headers,
          });
          const res_data = await response.json();
          userAccessToken=res_data.access_token;
          userAccessTokenExpiry=Date.now()+res_data.expires_in *1000;
          console.log("user token updated..");
          console.log(userAccessToken);
          res.status(200).json({access_token: userAccessToken}); 
    
        }else{
          console.log("user saved token..",userAccessToken);
          return res.status(200).json({ access_token: userAccessToken });
        }
    
      } catch (err) {
        console.log(err);
        res.status(500).json({err})
      }
    
}


