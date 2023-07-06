//auth methods
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { env } from 'process';



export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}
export const createJWT = (user: { id: String; email: String; }): String => {
  console.log(" "+user.id+" "+user.email+" "+process.env.JWT_SECRET);
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "hello guys",
  );
  return token;
};


export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }



  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({
      message: "not valid token"
    });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "hello guys",);
    req.user = user;
    next();
  }
  catch (err) {
    console.log(err);
    res.status(401);
    res.json({ message: "not valid token" });

  }
}

export const comparePasswords = (password: any,hash: any)=>{

  return bcrypt.compare(password,hash)
}

export const hashPassword = (password: any)=>{
  return bcrypt.hash(password,10)
}
