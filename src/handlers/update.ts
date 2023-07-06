import prisma from "../db"
import { product } from "./product";

export const createUpdate = async (req: any, res: any,next:any) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.body.productId },
    })
    if (!product) {
      res.json({ "error": "product not found" }).status(404);
      return;
    }
    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        product: { connect: { id: product.id } },
      }
    });
    res.json({ data: update });
  } catch (error: any) {
  error.type = "input";
next(error)  }

}

export const getUpdate = async (req: any, res: any,next:any) => {
  try {
    const update = await prisma.update.findUnique({
      where: { id: req.params.id },
    });
    res.json({ data: update });
  } catch (error: any) {
    error.type = "input";
    next(error)
}
}

export const updateUpdate = async (req: any, res: any,next:any) => {

  try {
    const update = await prisma.update.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version,
        productId: req.body.productId,
      }

    });
    res.json({ data: update });
  } catch (error:any) {
    error.type = "input";
    next(error)
  }

}

export const deleteUpdate = async (req: any, res: any,next:any) => {
  try {
    const update = await prisma.update.delete({
      where: { id: req.params.id },
    });
    res.json({ "deleted": "true" });
  } catch (error) {
next(error)  }

}

export const update = async (req: any, res: any,next:any) => {
  try {
    const products = await prisma.product.findMany({
      where: { belongsToId: req.user.id },
      include: { Update: true }
    }
    );
    const updates = products.reduce((allUpdates: any, product) => {
      return [...allUpdates, ...product.Update]
    }, []);
    res.json({ data: updates });
  } catch (error) {
next(error)  }
}
