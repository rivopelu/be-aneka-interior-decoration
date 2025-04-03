import { NextFunction, Request, Response } from 'express';
import { IReqCreateCategory } from '../types/request/IReqCreateCategory';
import { db } from '../db/database';
import { Category } from '../entities/Category';
import { generateSlug } from '../utils/generate-slug';
import { count, desc, eq } from 'drizzle-orm';
import { BadRequestError } from '../utils/error';
import { IResListCategory } from '../types/response/IResListCategory';
import { IReqCreateProduct } from '../types/request/IReqCreateProduct';
import { Product } from '../entities/Product';

export class ProductController {
  static async createNewProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const body = req.body as IReqCreateProduct;
    const slug = generateSlug(body.name);
    try {
      const findSlug = await db
        .select({ count: count() })
        .from(Product)
        .where(eq(Product.slug, slug));
      const doesExist = findSlug[0]?.count > 0;
      if (doesExist) {
        throw new BadRequestError('Product Already Exists');
      }
      const findCategory = await db
        .select()
        .from(Category)
        .where(eq(Category.id, body.category_id));
      const category = findCategory[0];
      if (!category) {
        throw new BadRequestError('category not found');
      }
      await db.insert(Product).values({
        categoryId: category.id,
        slug: slug,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image_url,
      });

      res.success('product successfully created');
    } catch (err) {
      next(err);
    }
  }
  static async createNewCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const body = req.body as IReqCreateCategory;
      const slug = generateSlug(body.name);
      const findCategory = await db
        .select({ count: count() })
        .from(Category)
        .where(eq(Category.slug, slug));
      const doesExist = findCategory[0]?.count > 0;
      if (doesExist) {
        throw new BadRequestError('Category already exists');
      }
      await db.insert(Category).values({
        name: req.body.name,
        slug: slug,
        createdBy: req.user.id,
      });

      res.success('category created successfully');
    } catch (error) {
      next(error);
    }
  }
  static async listCategory(_req: Request, res: Response, next: NextFunction) {
    try {
      const findCategory = await db
        .select()
        .from(Category)
        .where(eq(Category.active, true))
        .orderBy(desc(Category.createdDate));

      const responseData: IResListCategory[] = findCategory.map((item) => {
        return {
          name: item.name,
          slug: item.slug,
          id: item.id,
        };
      });
      res.data(responseData);
    } catch (error) {
      next(error);
    }
  }
}
