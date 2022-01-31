import express from 'express';
import { getCurrentPrice, getAveragePrice } from '../controller/ethGas.controller.js';

const gasRoutes = express.Router();

gasRoutes.route('/gas')
  .get(getCurrentPrice)


gasRoutes.route('/average')
  .get(getAveragePrice)
  

export default gasRoutes;