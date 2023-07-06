import prisma from "../db"
export const createProduct = async (req: any, res: any, next: any) => {

  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: parseFloat(req.body.price),
        belongsToId: req.user.id,
      }


    });
    res.json({ data: product });
  } catch (error: any) {
    error.type = "input";
    next(error);
  }

}

export const getProduct = async (req: any, res: any, next: any) => {
  try {

    const product = await prisma.product.findFirst({
      where: { id: req.params.id, belongsToId: req.user.id },
    });
    console.log(product)
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}

export const updateProduct = async (req: any, res: any, next: any) => {

  try {
    console.log(req.params.id + "id")
    const product = await prisma.product.update({
      where: {
        id_belongsToId: {
          belongsToId: req.user.id,
          id: req.params.id
        }
      },
      data: {
        name: req.body.name,
        price: parseFloat(req.body.price),
      },
    });
    res.json({ "updated ": product });
  } catch (error: any) {
    error.type = "input";
    next(error);
  }
}

export const deleteProduct = async (req: any, res: any, next: any) => {

  try {
    await prisma.product.delete({
      where: {
        id_belongsToId: {
          belongsToId: req.user.id,
          id: req.params.id
        }
      },
    });
    res.json({ "deleted": "true" })

  } catch (error: any) {
    next(error);
  }
}

export const product = async (req: any, res: any, next:any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { Products: true },
    })

    res.json({ data: user?.Products });
  } catch (error:any) {
    next(error);
  }

}
