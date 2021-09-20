import { Request, Response, Router } from 'express';
import { Users } from '../models/Users';

const router = Router();

router.route('/signin').post(async (req: Request, res: Response) => {
    // get data
    const { email, password } = req.body;
    // validate data
    // call database
    const user = await Users.findOne({ email: email }); // find user by email

    // handle invalid user
    if (!user) {
        return res.status(404).send({
            auth: false,
            message: "Email doesn't exists",
        });
    }

    // handle valid user

    console.log({ user });

    if (password !== user.password) {
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
});

export default router;
