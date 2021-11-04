import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User";

export const postRegister = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	// validation
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	try {

		// check if user already exists in database
		const user = await User.findOne({ email });
		if (user) return res.json({ errors: [{ msg: 'User with same email already exists' }] });

		// hashing the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// saving the user in database
		const newUser = new User({ name, email, password: hashedPassword });
		const savedUser = await newUser.save();

		// jwt token
		const payload = {
			user: {
				id: savedUser._id
			}
		}

		const authToken = jwt.sign(payload, process.env.JWT_SECRET!);

		res.send({ authToken });

	} catch (error) {
		res.status(500).send('Internal Server Error');
		console.error(error);
	}
}

export const postLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// validation
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	try {

		// checking if email exists in the database
		const user = await User.findOne({ email });
		if (!user) return res.status(500).send('Invalid credentials');

		// checking if password is correct
		if (!(await bcrypt.compare(password , user.password))) {
			return res.status(500).send(`Invalid credentials ${password}`);
		}

		// Create and asign a token
		const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
		res.header('auth-token', authToken).json({ authToken });

	} catch (error) {
		res.status(500).send('Internal Server Error');
		console.error(error);
	}
}