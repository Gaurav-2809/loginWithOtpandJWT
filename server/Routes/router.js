import express from 'express'
import {userRegister, userOtpSend, userOtpVerify} from '../controllers/user-controller.js'

const router=express.Router();

router.post('/register', userRegister);
router.post('/otpsend', userOtpSend);
router.post('/otpverify', userOtpVerify);

export default router;