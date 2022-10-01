const multer = require('multer');

const productStorage = multer.diskStorage({
  // when changing, update the replace function at /staff/product.js
  destination: './public/img/product/',
  filename: (req, file, cb) => {
    cb(null, 'product-' + Date.now() + '-' + file.originalname);
  },
});
const productUpload = multer({ storage: productStorage });

module.exports = { productUpload };
