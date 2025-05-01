"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = getTags;
exports.addTag = addTag;
exports.getToken = getToken;
exports.spotifyLogin = spotifyLogin;
exports.spotifyAuth = spotifyAuth;
exports.returnToken = returnToken;
const models_1 = __importDefault(require("./models"));
const url_1 = require("url");
var userAccessToken = null;
var userRefreshToken = null;
var userAccessTokenExpiry = null;
var appAccessToken = null;
var appRefreshToken = null;
var appAccessTokenExpiry = null;
function getTags(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tags = yield models_1.default.find();
            res.status(200).json(tags);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
}
function addTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTag = yield models_1.default.create(req.body);
            res.status(201).json(newTag);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
}
//creating new token everytime getToken called search function
function getToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { CLIENT_ID, CLIENT_SECRET } = process.env;
            if (Date.now() > appAccessTokenExpiry) {
                const response = yield fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
                });
                const tokenObject = yield response.json();
                appAccessToken = tokenObject.access_token;
                appAccessTokenExpiry = Date.now() + tokenObject.expires_in * 1000;
                console.log("new app token: ", appAccessToken);
                res.status(200).json({ access_token: appAccessToken });
            }
            else {
                console.log("saved app token: ", appAccessToken);
                res.status(200).json({ access_token: appAccessToken });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
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
const generateRandomString = function (length) {
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
function spotifyLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const scope = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify";
        const state = generateRandomString(16);
        const { CLIENT_ID } = process.env;
        console.log("client id : ", CLIENT_ID);
        const auth_query_parameters = new url_1.URLSearchParams({
            response_type: "code",
            client_id: `${CLIENT_ID}`,
            scope: scope,
            redirect_uri: "http://127.0.0.1:3000/auth/callback",
            state: state
        });
        res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
    });
}
//request an access token of  user
function spotifyAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        const { CLIENT_ID, CLIENT_SECRET } = process.env;
        const tokenResponse = yield fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new url_1.URLSearchParams({
                code: `${code}`,
                redirect_uri: "http://127.0.0.1:3000/auth/callback",
                grant_type: 'authorization_code'
            })
        });
        if (!tokenResponse.ok) {
            const errorText = yield tokenResponse.text();
            console.error("Spotify API Error:", errorText);
            res.status(400).json({ error: "Failed to get token", details: errorText });
            return;
        }
        const tokenData = yield tokenResponse.json();
        userAccessToken = tokenData.access_token;
        userRefreshToken = tokenData.refresh_token;
        console.log("user refresh tokens: ", userRefreshToken);
        console.log("user expires in: ", tokenData.expires_in);
        userAccessTokenExpiry = Date.now() + tokenData.expires_in * 1000;
        res.redirect('https://localhost:5173');
    });
}
function returnToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            if (!userAccessToken || Date.now() > userAccessTokenExpiry) {
                const authOptions = {
                    url: "https://accounts.spotify.com/api/token",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        Authorization: "Basic " +
                            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
                    },
                    form: {
                        grant_type: "refresh_token",
                        refresh_token: userRefreshToken,
                    },
                    json: true,
                };
                const response = yield fetch(authOptions.url, {
                    method: "post",
                    body: new url_1.URLSearchParams(authOptions.form),
                    headers: authOptions.headers,
                });
                const res_data = yield response.json();
                userAccessToken = res_data.access_token;
                userAccessTokenExpiry = Date.now() + res_data.expires_in * 1000;
                console.log("user token updated..");
                console.log(userAccessToken);
                res.status(200).json({ access_token: userAccessToken });
            }
            else {
                console.log("user saved token..", userAccessToken);
                return res.status(200).json({ access_token: userAccessToken });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err });
        }
    });
}
