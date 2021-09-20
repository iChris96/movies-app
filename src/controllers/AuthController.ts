import { Request, Response } from 'express';
import UserController from './UserController';

export default (() => {
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
            const validPassword = password === user.password;
            if (!validPassword) {
                return res.status(403).send({
                    auth: false,
                    message: 'Invalid credentials',
                });
            }

            // create token
            const token = 'hklmno';

            // return token and response
            res.header('auth-token', token).status(200).json({
                auth: true,
                token,
            });
        },
    };
})();
