import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';

dotenv.config(); // configure env file upfront

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the request body

app.use('/api/products', productRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});
