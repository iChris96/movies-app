import { Request, Response } from 'express';
import UserController from './UserController';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../consts/auth';

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
            const validPassword = validatePassword(password, user.password);
            if (!validPassword) {
                return res.status(403).send({
                    auth: false,
                    message: 'Invalid credentials',
                });
            }

            const token = 'hklmno';

            // return token and response
            res.header('auth-token', token).status(200).json({
                auth: true,
                token,
            });
        },
    };
})();
