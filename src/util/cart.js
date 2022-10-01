const { Cart, CartItem } = require('../models');

const getUserCartItemCount = async (userId) => {
  const [cart, _] = await Cart.findOrCreate({
    where: { UserId: userId },
    defaults: { UserId: userId },
  });
  const cartItemCount = await CartItem.count({ where: { CartId: cart.id } });
  return cartItemCount;
};

module.exports = { getUserCartItemCount };
