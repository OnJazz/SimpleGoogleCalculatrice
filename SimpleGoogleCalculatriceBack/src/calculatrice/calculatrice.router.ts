import express from 'express';

import { CalculController } from './calculatrice.controller';

export const router = express.Router();
export const controller = new CalculController();

// /calcul => POST
router.post('/', controller.calcul);
