import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  final_total: 0,
  original_total: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, current) {  //current contains the playload
      const { productId, final_price, original_price } = current.payload
      const existingItem = state.items.find(item => item.productId == productId);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({
          productId,
          final_price,
          original_price,
          qty: 1
        });
      }
      state.final_total += final_price;
      state.original_total += original_price;
      localStorage.setItem("cart" , JSON.stringify(state));
    },
    lsToCart(state) {
      const lsCart = JSON.parse(localStorage.getItem("cart"));
      if(lsCart){
        state.items = lsCart.items || [];
        state.final_total = lsCart.final_total || 0;
        state.original_total = lsCart.original_total || 0;
      }
    },
    qtyHandler(state, current) {
      const { productId,type, final_price, original_price } = current.payload
      const existingItem = state.items.find(item => item.productId == productId);
      if (existingItem) {
        if (type == "inc") {
          existingItem.qty += 1;
          state.final_total += final_price;
          state.original_total += original_price;
        } else if (type == "dec" && existingItem.qty > 1) {
          existingItem.qty -= 1;
          state.final_total -= final_price;
          state.original_total -= original_price;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state)); 
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem , lsToCart , qtyHandler } = cartSlice.actions

export default cartSlice.reducer