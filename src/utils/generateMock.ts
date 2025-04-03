import { IReqCreateProduct } from '../types/request/IReqCreateProduct';
import { db } from '../db/database';
import { Category } from '../entities/Category';
import { faker } from '@faker-js/faker/locale/id_ID';
import { Product } from '../entities/Product';
import { generateSlug } from './generate-slug';
export async function generateMockProducts() {
  const categoryList = await getListAllCategories();

  const products = Array.from({ length: 100 }, () => {
    const randomCategoryId =
      categoryList[Math.floor(Math.random() * categoryList.length)];

    return {
      name: faker.commerce.productName(),
      category_id: randomCategoryId,
      image_url: getRandomImage(),
      description: faker.lorem.paragraph(20),
      price: getRandomPrice(),
    };
  });

  await db.insert(Product).values(
    products.map((product) => ({
      categoryId: product.category_id,
      slug: generateSlug(product.name),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image_url,
    })),
  );
}
async function getListAllCategories(): Promise<string[]> {
  const categoryList = await db.select({ id: Category.id }).from(Category);
  return categoryList.map((item) => item.id);
}

function getRandomImage() {
  const list = [
    'https://maxdjzqweveqptppmydq.supabase.co/storage/v1/object/public/kodekata-staging/DEVELOPMENT/POST/1743374254508_blob',
    'https://maxdjzqweveqptppmydq.supabase.co/storage/v1/object/public/kodekata-staging/DEVELOPMENT/POST/1743168246468_blob',
    'https://maxdjzqweveqptppmydq.supabase.co/storage/v1/object/public/kodekata-staging/DEVELOPMENT/POST/1743351438747_blob',
    'https://maxdjzqweveqptppmydq.supabase.co/storage/v1/object/public/kodekata-staging/STAGING/POST/1743264808523_blob',
    'https://maxdjzqweveqptppmydq.supabase.co/storage/v1/object/public/kodekata-staging/STAGING/POST/1743264728630_blob',
    'https://maxdjzqweveqptppmydq.supabase.co/storage/v1/object/public/kodekata-staging/STAGING/POST/1743252179017_blob',
  ];

  return list[Math.floor(Math.random() * list.length)];
}

function getRandomPrice() {
  const list = [10000, 20000, 30000, 40000, 50000, 60000, 70000];

  return list[Math.floor(Math.random() * list.length)];
}
