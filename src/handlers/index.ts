import { Request, Response } from 'express';

// curryng pattern
export default (resource: string) => (services: any) => ({
    get: async (req: Request, res: Response) => {
        const data: any = [];
        res.send(data);
    },
    post: async (req: Request, res: Response) => {},
    put: async (req: Request, res: Response) => {},
    delete: async (req: Request, res: Response) => {},
});
