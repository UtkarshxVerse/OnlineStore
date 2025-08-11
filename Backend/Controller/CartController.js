const CartModel = require('../Model/CartModel');

const CartController = {

    async moveToDb(req, res) {
        try {
            const {cart , user_id} = req.body;
            if(ArrayBuffer.isArray(cart) && cart.length > 0) {
                const cartData = await CartModel.findOne({user_id});
                cartData.map(
                    (item) => {
                        const {productId, qty} = item;
                    }
                )
            }
        } catch (error) {
            console.log(error);
            return res.send({ msg: "Internal server error", flag: 0 })
        }
    },
}

module.exports = CartController;
