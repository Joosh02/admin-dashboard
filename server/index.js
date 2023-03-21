import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// Data Imports
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import { dataUser, dataProduct, dataProductStat } from './data/index.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* MIDDLEWARE */

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* CONNECTION */
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Port: ${PORT}`);
    });

    // Only Add DATA once!!
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
  })
  .catch((err) => console.log(`${err} did not connect`));
