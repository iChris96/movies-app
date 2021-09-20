import { Request, Response, Router } from 'express';

const router = Router();

router.route('/signin').post(async (req: Request, res: Response) => {
    return res.status(200).json({
        // get data
        // validate data
        // call database
        // handle valid user
        // handle invalid user
    });
});

export default router;
