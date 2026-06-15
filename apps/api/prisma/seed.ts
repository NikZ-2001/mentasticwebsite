import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Categories
  const tops = await prisma.category.upsert({
    where: { slug: 'tops' },
    update: {},
    create: {
      name: 'Tops',
      slug: 'tops',
      description: 'T-shirts, shirts and more',
    },
  });

  const bottoms = await prisma.category.upsert({
    where: { slug: 'bottoms' },
    update: {},
    create: {
      name: 'Bottoms',
      slug: 'bottoms',
      description: 'Pants, joggers and chinos',
    },
  });

  const oversized = await prisma.category.upsert({
    where: { slug: 'oversized' },
    update: {},
    create: {
      name: 'Oversized',
      slug: 'oversized',
      description: 'Relaxed fit oversized styles',
    },
  });

  console.log('Categories created');

  // Products
  await prisma.product.upsert({
    where: { slug: 'classic-black-oversized-tee' },
    update: {},
    create: {
      name: 'Classic Black Oversized Tee',
      slug: 'classic-black-oversized-tee',
      description: 'A premium oversized tee crafted from 100% cotton.',
      categoryId: oversized.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
            isPrimary: true,
            order: 0,
          },
        ],
      },
      variants: {
        create: [
          { sku: 'BLK-OVR-S', size: 'S', price: 699, mrp: 999, stock: 10 },
          { sku: 'BLK-OVR-M', size: 'M', price: 699, mrp: 999, stock: 15 },
          { sku: 'BLK-OVR-L', size: 'L', price: 699, mrp: 999, stock: 12 },
          { sku: 'BLK-OVR-XL', size: 'XL', price: 699, mrp: 999, stock: 8 },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: 'white-linen-shirt' },
    update: {},
    create: {
      name: 'White Linen Shirt',
      slug: 'white-linen-shirt',
      description: 'Premium linen shirt for everyday wear.',
      categoryId: tops.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600',
            isPrimary: true,
            order: 0,
          },
        ],
      },
      variants: {
        create: [
          { sku: 'WHT-LIN-S', size: 'S', price: 1199, mrp: 1199, stock: 8 },
          { sku: 'WHT-LIN-M', size: 'M', price: 1199, mrp: 1199, stock: 10 },
          { sku: 'WHT-LIN-L', size: 'L', price: 1199, mrp: 1199, stock: 6 },
          { sku: 'WHT-LIN-XL', size: 'XL', price: 1199, mrp: 1199, stock: 4 },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: 'cargo-olive-pants' },
    update: {},
    create: {
      name: 'Cargo Olive Pants',
      slug: 'cargo-olive-pants',
      description: 'Relaxed fit cargo pants in olive green.',
      categoryId: bottoms.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
            isPrimary: true,
            order: 0,
          },
        ],
      },
      variants: {
        create: [
          { sku: 'OLV-CGO-S', size: 'S', price: 1499, mrp: 1999, stock: 5 },
          { sku: 'OLV-CGO-M', size: 'M', price: 1499, mrp: 1999, stock: 8 },
          { sku: 'OLV-CGO-L', size: 'L', price: 1499, mrp: 1999, stock: 7 },
          { sku: 'OLV-CGO-XL', size: 'XL', price: 1499, mrp: 1999, stock: 3 },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: 'striped-polo-tee' },
    update: {},
    create: {
      name: 'Striped Polo Tee',
      slug: 'striped-polo-tee',
      description: 'Classic striped polo tee for a smart casual look.',
      categoryId: tops.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
            isPrimary: true,
            order: 0,
          },
        ],
      },
      variants: {
        create: [
          { sku: 'STR-POL-S', size: 'S', price: 799, mrp: 799, stock: 12 },
          { sku: 'STR-POL-M', size: 'M', price: 799, mrp: 799, stock: 15 },
          { sku: 'STR-POL-L', size: 'L', price: 799, mrp: 799, stock: 10 },
          { sku: 'STR-POL-XL', size: 'XL', price: 799, mrp: 799, stock: 6 },
        ],
      },
    },
  });

  console.log('Products created');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });