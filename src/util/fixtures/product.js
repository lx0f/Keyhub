const { Product } = require('../../models');
const products = [
  {
    name: 'keyboard1',
    description: 'Keyboard description',
    category: 'prebuilt',
    price: 20,
    stock: 40,
    imagePath: '/img/product/keyboard1.jpg',
  },
  {
    name: 'keyboard2',
    description: 'Keyboard description',
    category: 'prebuilt',
    price: 20,
    stock: 40,
    imagePath: '/img/product/keyboard2.jpg',
  },
  {
    name: 'keyboard3',
    description: 'Keyboard description',
    category: 'prebuilt',
    price: 20,
    stock: 40,
    imagePath: '/img/product/keyboard3.jpg',
  },
  {
    name: 'keyboard4',
    description: 'Keyboard description',
    category: 'prebuilt',
    price: 20,
    stock: 40,
    imagePath: '/img/product/keyboard4.jpg',
  },
  {
    name: 'keyboard5',
    description: 'Keyboard description',
    category: 'prebuilt',
    price: 20,
    stock: 40,
    imagePath: '/img/product/keyboard5.jpg',
  },
  {
    name: 'switch1',
    description: 'Switch description',
    category: 'switch',
    price: 20,
    stock: 40,
    imagePath: '/img/product/switch1.jpg',
  },
  {
    name: 'switch2',
    description: 'Switch description',
    category: 'switch',
    price: 20,
    stock: 40,
    imagePath: '/img/product/switch2.jpg',
  },
  {
    name: 'switch3',
    description: 'Switch description',
    category: 'switch',
    price: 20,
    stock: 40,
    imagePath: '/img/product/switch3.jpg',
  },
  {
    name: 'switch4',
    description: 'Switch description',
    category: 'switch',
    price: 20,
    stock: 40,
    imagePath: '/img/product/switch4.jpg',
  },
  {
    name: 'custom1',
    description: 'Custom keyboard description',
    category: 'custom',
    price: 20,
    stock: 40,
    imagePath: '/img/product/custom1.jpg',
  },
];

const initTestProducts = async () => {
  products.forEach(async (product) => {
    const [newProduct, created] = await Product.findOrCreate({
      where: { name: product.name },
      defaults: { ...product },
    });
  });
};

module.exports = { initTestProducts, products };
