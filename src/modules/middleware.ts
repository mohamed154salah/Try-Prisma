import { validationResult } from "express-validator";

export const handleInputError=(req:any, res:any,next:any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ "error": errors.array() });
        return;
    }
    next();

}
