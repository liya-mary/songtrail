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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var access_token = null;
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
function getToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { CLIENT_ID, CLIENT_SECRET } = process.env;
            const response = yield fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
            });
            const tokenObject = yield response.json();
            res.status(200).json(tokenObject);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
}
const generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
function spotifyLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const scope = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
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
        access_token = tokenData.access_token;
        res.redirect('https://localhost:5173');
    });
}
function returnToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!access_token) {
            res.status(401).json({ error: "No token available" });
            return;
        }
        res.json({ access_token: access_token });
    });
}
