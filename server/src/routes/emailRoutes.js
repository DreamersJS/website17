import express from 'express';
import { sendConfirmationEmailController, sendMsgController, checkDomainMxRecords, confirmEmail, isConfirmed } from '../controllers/emailController.js';

const router = express.Router();

router.use(express.json());

router.post('/checkDomain', checkDomainMxRecords)
router.post('/sendConfirmationEmail', sendConfirmationEmailController);
router.get('/confirmEmail', confirmEmail);
router.get('/isConfirmed', isConfirmed);
router.post('/sendMsg', sendMsgController);

export default router;