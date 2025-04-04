import { CartRepository } from '../repositories/cart.repository';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../utils/error';
import { ProductRepository } from '../repositories/product.repository';
import { db } from '../db/database';
import { Cart } from '../entities/Cart';
import { eq } from 'drizzle-orm';

export class ChartController {
  async removeItem(req: Request, res: Response, next: NextFunction) {
    const { cartId } = req.params;
    try {
      const cart = await CartRepository.findOne(cartId);
      if (!cart) {
        throw new NotFoundError('cart not found');
      }
      await db.delete(Cart).where(eq(Cart.id, cartId));
      res.success('oke');
    } catch (err) {
      next(err);
    }
  }
  async addToChart(req: Request, res: Response, next: NextFunction) {
    const { id, qty } = req.body;
    const product = await ProductRepository.findProductById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    try {
      const cart = await CartRepository.findChart(req.user.id, id);
      if (!cart) {
        await db.insert(Cart).values({
          productId: product.id,
          qty: qty,
          accountId: req.user.id,
          createdBy: req.user.id,
        });
      } else {
        await db
          .update(Cart)
          .set({
            qty: Number(cart.qty) + qty,
            updatedDate: new Date(),
            updatedBy: req.user.id,
          })
          .where(eq(Cart.id, cart.id));
      }
      res.success(id);
    } catch (e) {
      next(e);
    }
  }
}
