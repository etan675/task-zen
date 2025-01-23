import { Request, Response } from "express"
import { createUserService } from "../init-services";

const userService = createUserService();

const signupController = async (req: Request, res: Response ) => {
    const { email, password } = req.body;

    try {
        await userService.createUser(email, password);

        res.json({ message: 'Sign up successful' });

    } catch (err) {
        if (err.message === 'User already exists') {
            res.status(400).json({ message: `A user with email: ${email} already exists` });
            return;
        }

        res.status(500).json({ message: err.message });
    }
}

export default signupController;