// router file for the application
import { Router } from 'express';
import { handleInputError } from './modules/middleware';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getProduct, product, updateProduct, } from './handlers/product';
import { createUpdate, deleteUpdate, getUpdate, update, updateUpdate } from './handlers/update';

const router = Router();

//product routes
router.get('/product', product);
router.get('/product/:id', getProduct);
router.put('/product/:id', [body('name').exists().isString(), body('price').isString()], handleInputError, updateProduct);
router.delete('/product/:id', deleteProduct);
router.post('/product', [body('name').isString(), body('price').isString()], handleInputError, createProduct);

// update routes
router.get('/update', update);
router.get('/update/:id',getUpdate);
router.put('/update/:id',updateUpdate);
router.delete('/update/:id', deleteUpdate);
router.post('/update', [body('title').isString(),
body('body').isString(),
body('productId').isString()], handleInputError, createUpdate);

// updatePoint routes
router.get('/updatePoint', (req, res) => { });
router.get('/updatePoint:id', (req, res) => { });
router.put('/updatePoint:id', (req, res) => { });
router.delete('/updatePoint:id', (req, res) => { });
router.post('/updatePoint', (req, res) => { });
router.use((err: any, req: any, res: any, next: any) => {
  if (err.type === "auth") {
    return res.status(401).json({ message: "unauthorized" })
  } else if (err.type === "input") {
    return res.status(400).json({ message: `invalid input ${err.message}` })
  } else {
    return res.status(500).json({ message: "something went wrong" })
  }
});
export default router;
