import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  //  If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body; 
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if(!valid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const jwtKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, jwtKey, { expiresIn: '1h' });
  return res.json({ token });

};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
