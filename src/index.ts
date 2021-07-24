import { app } from './app';
import dbConnect from './database';

dbConnect();

app.start();
