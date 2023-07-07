import { comparePasswords } from './../modules/auth';
import {createJWT,hashPassword} from "../modules/auth"
import prisma from "../db"

export const createUser = async (req: any, res: any,next:any) => {
  try {
    console.log(req.body.email + " " + req.body.name + " " + req.body.password)
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: await hashPassword(req.body.password),
      }
    })

    const token = createJWT({ id: user.id, email: user.email || " " });
    res.json({ token });
  } catch (error:any) {
      error.type = "input";
      next(error);
  }
}

export const loginUser = async (req: any, res: any,next:any) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: req.body.email } })
    const comparePasswordsResult = await comparePasswords(req.body.password, user?.password || "");
    if (comparePasswordsResult) {
      const token = createJWT({ id: user?.id || "", email: user?.email || "" });
      res.status(200).json({ token });
      return;
    } else {
      res.status(401);
      res.json({ message: "unauthorized user" });
      return;
    }
  } catch (error:any) {
    error.type = "input";
    next(error);
  }
}
