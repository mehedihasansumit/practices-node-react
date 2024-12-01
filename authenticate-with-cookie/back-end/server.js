import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import config from './config.js';
import { authenticate } from './middleware.js';

const app = express()

const corsOptions = {
    origin: true, // Change to your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/auth/login', (req, res) => {
    console.log('Cookies: ', req.cookies.access_token)


    const { username, password } = req.body;
    console.log(username, password)
    if (!username || !password) return res.status(404).json({ error: `required username/password` });

    // generate jwt token
    const generateToken = jwt.sign({ username }, config.jwtSecret);

    // // set cookie to response header
    // const token = `Bearer ${generateToken}`
    // console.log({ generateToken, token })

    // res.cookie('access_token_', token, { secure: false, httpOnly: false, sameSite: "lax", maxAge: 360000 });

    // console.log({res})
    console.log({ generateToken })
    res.json({
        success: true,
        cookie: generateToken
    });
})

app.get('/auth/user', authenticate, (req, res) => {
    const { username } = req.access_token_info || {};
    res.json({ success: true, username, isAuthenticateUser: true })
})

app.get('/', authenticate, (req, res) => {
    res.json({ success: true, data: 'Hello World!' })
});

app.get('/dummy', authenticate, (req, res) => {
    const datas = [
        { id: 1, name: "mehedi" },
        { id: 2, name: "Hasan" },
        { id: 3, name: "Sumit" },
        { id: 4, name: "Dev" },
    ]
    res.json({ success: true, data: datas })
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
