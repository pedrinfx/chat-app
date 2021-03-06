import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import ms from 'ms';

import { rateLimit } from 'express-rate-limit';

import Auth from '@routers/Auth/Auth';
import Message from '@routers/Message/Message';
import Profile from '@routers/Profile/Profile';
import Users from '@routers/Users/Users';
import Chat from '@routers/Chat/Chat';

import { ensureAuthenticated } from '@middlewares/Socket/ensureAuthenticated';

const app = express();
app.use(express.json());
app.use(cors());
app.use(
    rateLimit({
        windowMs: ms('15m'),
        max: 100,
    })
);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// Socket middleware
io.use(ensureAuthenticated);

// Routers
app.use('/auth', Auth);
app.use('/message', Message);
app.use('/profile', Profile);
app.use('/users', Users);
app.use('/chat', Chat);

export { server, io };
