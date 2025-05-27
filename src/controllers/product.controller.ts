import { and, count, desc, eq, like, ne, not } from 'drizzle-orm';
import { sql } from 'drizzle-orm/sql/sql';
import { NextFunction, Request, Response } from 'express';
import { db } from '../db/database';
import { Category } from '../entities/Category';
import { Product } from '../entities/Product';
import { IReqCreateCategory } from '../types/request/IReqCreateCategory';
import { IReqCreateProduct } from '../types/request/IReqCreateProduct';
import { IResListCategory } from '../types/response/IResListCategory';
import { BadRequestError, NotFoundError } from '../utils/error';
import { generateSlug } from '../utils/generate-slug';
import { ProductRepository } from '../repositories/product.repository';

export class ProductController {
  static async archiveProduct(req: Request, res: Response, next: NextFunction) {
    const id = String(req.params.id);
    const findProduct = await ProductRepository.findProductByIdNotFilter(id);
    if (!findProduct) {
      throw new NotFoundError('Product not found');
    }
    await db
      .update(Product)
      .set({
        active: !findProduct.active,
      })
      .where(eq(Product.id, id));
    try {
      res.success(id);
    } catch (e) {
      next(e);
    }
  }
  static async listProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        page = '0',
        size = '10',
        name = '',
        category_id = '',
      } = req.query;

      const offset = Number(page) * Number(size);
      const limit = Number(size);

      const conditions = [];
      if (name) {
        conditions.push(like(Product.name, `%${name}%`));
      }
      if (category_id)
        conditions.push(eq(Product.categoryId, String(category_id)));

      const totalData = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(Product)
        .where(and(...conditions, eq(Product.active, true)))
        .then((res) => res[0]?.count ?? 0);

      const products = await db
        .select({
          id: Product.id,
          name: Product.name,
          slug: Product.slug,
          description: Product.description,
          image: Product.image,
          price: Product.price,
          category_id: Category.id,
          category_name: Category.name,
          category_slug: Category.slug,
          created_date: Product.createdDate,
        })
        .from(Product)
        .leftJoin(Category, eq(Product.categoryId, Category.id))
        .where(and(...conditions, eq(Product.active, true)))
        .orderBy(desc(Product.createdDate))
        .limit(limit)
        .offset(offset);

      res.paginated(products, {
        total_data: totalData,
        page_count: Math.ceil(totalData / limit),
        size: limit,
        page: Number(page),
      });
    } catch (error) {
      next(error);
    }
  }
  static async AdminListProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {
        page = '0',
        size = '10',
        name = '',
        category_id = '',
      } = req.query;

      const offset = Number(page) * Number(size);
      const limit = Number(size);

      const conditions = [];
      if (name) conditions.push(like(Product.name, `%${name}%`));
      if (category_id)
        conditions.push(eq(Product.categoryId, String(category_id)));

      const totalData = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(Product)
        .where(and(...conditions))
        .then((res) => res[0]?.count ?? 0);

      const products = await db
        .select({
          id: Product.id,
          name: Product.name,
          slug: Product.slug,
          description: Product.description,
          image: Product.image,
          price: Product.price,
          category_id: Category.id,
          category_name: Category.name,
          category_slug: Category.slug,
          created_date: Product.createdDate,
          active: Product.active,
        })
        .from(Product)
        .leftJoin(Category, eq(Product.categoryId, Category.id))
        .where(and(...conditions))
        .orderBy(desc(Product.createdDate))
        .limit(limit)
        .offset(offset);

      res.paginated(products, {
        total_data: totalData,
        page_count: Math.ceil(totalData / limit),
        size: limit,
        page: Number(page),
      });
    } catch (error) {
      next(error);
    }
  }
  static async adminDetailProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const findProduct = await db
      .select({
        id: Product.id,
        slug: Product.slug,
        description: Product.description,
        name: Product.name,
        price: Product.price,
        image: Product.image,
        category_slug: Category.slug,
        category_id: Category.id,
        created_date: Product.createdDate,
        category_name: Category.name,
        active: Product.active,
      })
      .from(Product)
      .innerJoin(Category, eq(Product.categoryId, Category.id))
      .where(eq(Product.id, req.params.id));
    const product = findProduct[0];
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    try {
      res.data(product);
    } catch (e) {
      next(e);
    }
  }
  static async detailProduct(req: Request, res: Response, next: NextFunction) {
    const findProduct = await db
      .select({
        id: Product.id,
        slug: Product.slug,
        description: Product.description,
        name: Product.name,
        price: Product.price,
        image: Product.image,
        category_slug: Category.slug,
        category_id: Category.id,
        created_date: Product.createdDate,
        category_name: Category.name,
        active: Product.active,
      })
      .from(Product)
      .innerJoin(Category, eq(Product.categoryId, Category.id))
      .where(and(eq(Product.active, true), eq(Product.id, req.params.id)));
    const product = findProduct[0];
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    try {
      res.data(product);
    } catch (e) {
      next(e);
    }
  }
  static async editProduct(req: Request, res: Response, next: NextFunction) {
    const body = req.body as IReqCreateProduct;
    const slug = generateSlug(body.name);
    const id = String(req.params.id);

    try {
      const findProduct = await ProductRepository.findProductById(id);
      if (!findProduct) {
        throw new NotFoundError('Product not found');
      }

      const findSlug = await db
        .select({ count: count() })
        .from(Product)
        .where(and(eq(Product.slug, slug), not(eq(Product.id, id))));

      const doesExist = findSlug[0]?.count > 0;
      if (doesExist) {
        throw new BadRequestError('Product with this name already exists');
      }

      const findCategory = await db
        .select()
        .from(Category)
        .where(eq(Category.id, body.category_id));

      const category = findCategory[0];
      if (!category) {
        throw new BadRequestError('Category not found');
      }

      await db
        .update(Product)
        .set({
          categoryId: category.id,
          slug: slug,
          name: body.name,
          description: body.description,
          price: body.price,
          image: body.image_url,
        })
        .where(eq(Product.id, id));

      res.success('Product successfully updated');
    } catch (err) {
      next(err);
    }
  }
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

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const productsUsingCategory = await db
        .select({ count: count() })
        .from(Product)
        .where(eq(Product.categoryId, id));

      if (productsUsingCategory[0].count > 0) {
        throw new BadRequestError(
          'Kategory tidak bisa dihapus karena berelasi dengan product',
        );
      }

      await db.delete(Category).where(eq(Category.id, id));

      res.success('Category deleted successfully');
    } catch (error) {
      next(error);
    }
  }
  static async editCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body as { id: string; name: string };
      const slug = generateSlug(name);

      const existingCategory = await db
        .select()
        .from(Category)
        .where(eq(Category.id, id));

      if (existingCategory.length === 0) {
        throw new BadRequestError('Category not found');
      }

      const checkSlug = await db
        .select({ count: count() })
        .from(Category)
        .where(and(eq(Category.slug, slug), ne(Category.id, id)));

      if (checkSlug[0].count > 0) {
        throw new BadRequestError('Category with this name already exists');
      }

      await db
        .update(Category)
        .set({
          name,
          slug,
          updatedDate: new Date(),
          updatedBy: req.user.id,
        })
        .where(eq(Category.id, id));

      res.success('Category updated successfully');
    } catch (e) {
      next(e);
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
