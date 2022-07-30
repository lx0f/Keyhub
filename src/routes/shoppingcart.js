const express = require("express")
const ShoppingCart = express.Router()
const { Cart }  = require("../models/cart")
const {CartItem} = require("../models/cart")
const Product = require("../models/product")
const User = require("../models/User")
const { CustomerVoucher } = require("../models/CustomerVoucher");
const { VoucherItem } = require("../models/CustomerVoucher");
const Voucher = require("../models/Voucher");


// GET Cart
ShoppingCart.get('/', async (req, res) => {
    try {
        if (req.user) {
          const cart = await Cart.findOne({
            where: { UserId: req.user.id },
            include: "cartProducts"
          })
          if (!cart) {
            res.render('./customers/page-shopping-cart')
          }
          const totalPrice = cart.cartProducts.length > 0 ? cart.cartProducts.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
          res.render('./customers/page-shopping-cart', { cart: cart.toJSON(), totalPrice })
        } else {
          req.flash('error', 'please login as customer first')
          return res.redirect('/login')
        }
      } catch (e) {
        console.log(e)
      }
});

ShoppingCart.post('/postcart', async (req, res) =>{
    try {
        // check product has inventory
        const addProduct = await Product.findByPk(req.body.productId)
        if (addProduct.stock === 0) {
          req.flash('error', `ProductId:${req.body.productId} is out of stock!`)
          return res.redirect('/')
        }
        // find cart or create
        let cart = {}
        if (req.user) {
          const [userCart] = await Cart.findOrCreate({
            where: {
              UserId: req.user.id || 0
            }
          })
          cart = userCart
        } else {
          const [userCart] = await Cart.findOrCreate({
            where: {
              id: req.session.cartId || 0
            },
            defaults: {
              UserId: 0
            }
          })
          cart = userCart
        }
        // find items in the cart or not
        const [product, created] = await CartItem.findOrCreate({
          where: {
            CartId: cart.id,
            ProductId: req.body.productId,
          },
          defaults: {
            quantity: 1
          }
        })
        if (!created) {
          // check product quantity+1 > inventory or not
          if (product.quantity + 1 > addProduct.stock) {
            req.flash('error', `ProductId:${req.body.productId} stock left with${addProduct.stock}!`)
            // return res.redirect('back')
          }
          product.quantity += 1
        }
        await product.save()

        // save cartId in session
        req.session.cartId = cart.id
        return res.redirect('/cart')
      } catch (e) {
        console.log(e)
      }
});

// Add Cart Item
ShoppingCart.post('/:productId/add', async (req,res) =>{
    try {
        // find cart
        const product = await CartItem.findByPk(req.params.productId)
        // find product inventory
        const addProduct = await Product.findByPk(product.ProductId)
        // check product quantity+1 > inventory or not
        if (product.quantity + 1 > addProduct.stock) {
          req.flash('error', `ProductId:${product.ProductId} stocks left with ${addProduct.stock}`)
          // return res.redirect('back')
        }
        await product.update({
          quantity: product.quantity + 1
        })
        return res.status(200).redirect('back')
      } catch (e) {
        console.log(e)
      }
});
// ShoppingCart.post('/:voucherId/add', async (req, res) => { 

// })
// subCartItem
ShoppingCart.post('/:productId/sub', async (req,res) =>{
  try {
    // find cart
    const product = await CartItem.findByPk(req.params.productId)
    await product.update({
      quantity: product.quantity - 1 ? product.quantity - 1 : 1
    })
    return res.status(200).redirect('back')
  } catch (e) {
    console.log(e)
  }
});


// Delete Cart Item
ShoppingCart.get('/:productId', async (req,res) =>{
    try {
        // find cart
        const product = await CartItem.findByPk(req.params.productId)
        await product.destroy()
        req.flash("success", "Successuflly deleted");
        return res.redirect('/cart')
      } catch (e) {
        console.log(e)
        // return next(e)
      }
})

module.exports = ShoppingCart
