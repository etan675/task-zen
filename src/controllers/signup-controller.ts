import { Request, Response } from "express"

const signupController = (req: Request, res: Response ) => {
    //TODO: implement
    console.log('hello');
    res.json({ msg: 'hello' });
}

export default signupController;