const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Product } = require('../../models');
const { productUpload } = require('../../util');
const { unlink } = require('fs');

/*
Use cases:
  [x] view products
  [ ] view product rating
  [x] add product
  [x] edit product
  [x] delete product
  [ ] request resupply
*/

router
  .route('/')
  .get(async (req, res) => {
    const [products, underProducts] = await Promise.all([
      Product.findAll(),
      Product.findAndCountAll({
        where: {
          stock: {
            // less than (lt) 100
            [Op.lt]: 100,
          },
        },
      }),
    ]);
    const understocked = underProducts.count > 0;
    const underIdString = underProducts.rows
      .map((product) => product.id)
      .toString();
    return res.render('staff/product/table', {
      products,
      understocked,
      underIdString,
    });
  })
  .post(productUpload.single('image'), async (req, res) => {
    const { name, description, category, price } = req.body;
    let hasError = false;

    // check for missing attributes
    if (!name) {
      req.flash('error', 'Missing name!');
      hasError = true;
    } else {
      // verify that name is unique
      const possibleProductWithName = await Product.findOne({
        where: { name },
      });
      if (possibleProductWithName) {
        req.flash(
          'error',
          "Another product has this name. A product's name must be unique."
        );
        hasError = true;
      }
    }
    if (!description) {
      req.flash('error', 'Missing description!');
      hasError = true;
    }
    if (price <= 0) {
      req.flash('error', 'Price must be more than $0.00!');
      hasError = true;
    }

    // cancel if hasError
    if (hasError) {
      // remove image if exist
      if (req.file) {
        unlink(req.file.path, (err) => {
          console.log(err);
          if (err) throw err;
        });
      }
      return res.redirect('back');
    }

    // create product
    const imagePath = req.file.path.replace('v2/public', '');
    await Product.create({ name, description, category, price, imagePath });
    req.flash('success', 'Product added!');
    return res.redirect('back');
  });

router.route('/add').get(async (req, res) => {
  return res.render('staff/product/add');
});

router
  .route('/:id')
  .get(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    return res.render('staff/product/view', { product });
  })
  .put(productUpload.single('image'), async (req, res) => {
    const productId = req.params.id;
    const { name, description, category, price } = req.body;
    const possibleProductWithName = await Product.findOne({
      where: {
        name,
        id: {
          // not equal (ne) to productId
          [Op.ne]: productId,
        },
      },
    });

    // error handling
    let hasError = false;
    if (possibleProductWithName) {
      req.flash(
        'error',
        "Another product has this name. A product's name must be unique."
      );
      hasError = true;
    }
    if (price <= 0) {
      req.flash('error', 'Price must be more than $0.00!');
      hasError = true;
    }
    if (hasError) {
      return res.redirect('back');
    }

    // update product
    const imagePath =
      req.file == null ? null : req.file.path.replace('v2/public', '');
    const product = await Product.findByPk(productId);
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.imagePath = imagePath || product.imagePath;
    await product.save();
    req.flash('success', 'Successfully updated product!');
    return res.redirect('back');
  })
  .delete(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      req.flash('error', 'Product with id: ', productId, " doesn't exist.");
      return res.redirect('back');
    }

    unlink('v2/public' + product.imagePath, (err) => {
      console.log(err);
      if (err) throw err;
    });
    await product.destroy();
    req.flash('success', 'Product with id: ', productId, ' has been deleted.');
    return res.redirect('/staff/product/');
  });

router.route('/:id/edit').get(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByPk(productId);
  return res.render('staff/product/edit', { product });
});

module.exports = router;
