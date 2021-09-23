import { NextFunction, Request, Response } from 'express';
import UserController from './UserController';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    SALT_ROUNDS,
    HEADER_TOKEN,
    TOKEN_EXP,
    TOKEN_SECRET,
} from '../consts/auth';
import { Users } from '../models/Users';

export default (() => {
    const hashPassword = (myPlaintextPassword: string) => {
        const saltRounds = SALT_ROUNDS;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        console.log({ hash });
        return hash;
    };

    const validatePassword = async (
        password: string,
        hashedPassword: string
    ) => {
        const match = await bcrypt.compare(password, hashedPassword);
        console.log({ password, hashedPassword, match });
        return match;
    };

    const createNewToken = (payload: any) => {
        console.log({ TOKEN_SECRET });
        const token = jwt.sign(payload, TOKEN_SECRET, {
            expiresIn: TOKEN_EXP,
        });
        console.log({ token });
        return token;
    };

    const readToken = async (token: string) => {
        const decoded = await jwt.verify(token, TOKEN_SECRET);
        console.log({ decoded });
        return decoded;
    };

    return {
        signin: async (req: Request, res: Response) => {
            // get data
            const { email, password } = req.body;
            // validate data

            // call database
            const user = await UserController.findUser(email);

            // handle invalid user
            if (!user) {
                return res.status(404).send({
                    auth: false,
                    message: "Email doesn't exists",
                });
            }

            // handle valid user
            console.log({ user });
            const validPassword = await validatePassword(
                password,
                user.password
            );
            if (!validPassword) {
                return res.status(403).send({
                    auth: false,
                    message: 'Invalid credentials',
                });
            }

            const token = createNewToken({ id: user._id });

            // return token and response
            res.header(HEADER_TOKEN, token).status(200).json({
                auth: true,
                token,
            });
        },
        withToken: async (req: Request, res: Response, next: NextFunction) => {
            const token = req.header(HEADER_TOKEN);
            if (!token) {
                return res.status(401).json({
                    auth: false,
                    message: 'No token provided',
                });
            }

            try {
                readToken(token);
                next();
            } catch (error: any) {
                res.status(401).send({ message: error.message });
            }
        },
        signup: async (req: Request, res: Response) => {
            const { username, email, password } = req.body;

            //  validate data

            // call database
            const userByEmail = await UserController.findUser(email);

            // handle email in use
            if (userByEmail) {
                return res.status(404).send({
                    auth: false,
                    message: 'Email already in use',
                });
            }

            // create a new user and save into database
            const user = new Users({
                username,
                email,
                password,
            });

            user.password = hashPassword(password);

            console.log({ user });

            try {
                await user.save();
                const token = createNewToken({ id: user._id });

                res.header('auth-token', token).json({
                    message: 'User Saved',
                    token,
                });
            } catch (error: any) {
                res.status(401).send({ message: error.message });
            }
        },
    };
})();
