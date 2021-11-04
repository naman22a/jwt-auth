import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IToken from '../interfaces/IToken';

export default function isAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.header('auth-token');

	if (!token) return res.status(401).redirect('/login');

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET as string) as IToken;
		(req as any).user = verified.user;
		next();
	} catch (error) {
		res.status(400).send('Invalid Token');
	}
}