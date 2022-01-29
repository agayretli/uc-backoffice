import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { ConnectOptions } from 'mongoose';

import db from './src/models';

dotenv.config();
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
// Handle GET requests to /api route
app.get('/api', (req: any, res: { json: (arg0: { message: string }) => void }) => {
    res.json({ message: 'Hello from server!' });
});
// All other GET requests not handled before will return our React app
app.get('*', (req: any, res: { sendFile: (arg0: any) => void }) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
db.mongoose.connect(
    database as string,
    {
        // `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions
);
db.initial();
