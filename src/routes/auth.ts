import { Router } from "express";
import { postRegister, postLogin } from "../controllers/auth";
import { body } from 'express-validator'

const router = Router();

router.post('/register',

	body('name').isLength({ min: 6 }).withMessage('name should be 6 characters long'),
	body('email').isEmail().withMessage('Please enter a valid email'),
	body('password').isLength({ min: 6 }).withMessage('password should be 6 characters long'),

	postRegister
);

router.post('/login',

	body('email').isEmail().withMessage('Please enter a valid email'),
	body('password').isLength({ min: 6 }).withMessage('password should be 6 characters long'),

	postLogin
);

export default router;