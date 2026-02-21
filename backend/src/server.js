import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import productRouter from './routes/product.route.js';
import { sql } from './configs/sql.js';
import { aj } from './libs/arcjet.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(helmet()); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan('dev')); // log the HTTP requests
app.use(express.json());

async function initDB() {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

    console.log('Connected to the database');
  } catch (error) {
    console.log('error connecting to the database', error);
  }
}

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 }); // protect the request
    console.log('arcjet decision', decision);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: 'Too many requests' });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: 'Bot access denied' });
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.spoofed,
      )
    ) {
      return res.status(403).json({ message: 'Spoofed bot detected' });
    }
    next();
  } catch (error) {
    console.log('error arcjet', error);
    next(error);
  }
});

app.use('/api/products', productRouter);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
