import { Order } from "../actions/order";
import { initialState } from "../store/order";

export function orderReducer(state = initialState, action: any) {
  switch (action.type) {
    case Order.SET_ALL_ORDERS: {
      const payload = action.payload;
      return Object.assign({}, state, { list: [ ...payload ] });
    }

    case Order.CURRENT_SELECTED_ORDER: {
      const payload = action.payload;
      return Object.assign({}, state, { currentSelectedOrderId: payload });
    }

    case Order.CURRENT_ORDER_PRODUCTS: {
      const payload = action.payload;
      return Object.assign({}, state, { currentOrderProducts: payload });      
    }

    case Order.CURRENT_SELECTED_PRODUCT: {
      const payload = action.payload;
      return Object.assign({}, state, { currentSelectedProductId: payload });      
    }

    case Order.SET_ALL_PRODUCTS: {
      const payload = action.payload;
      return Object.assign({}, state, { allProducts: payload });      
    }

    case Order.ADD_PRODUCT: {
      const payload = action.payload;
      const newCurrentOrderProducts: any = state.currentOrderProducts;
      newCurrentOrderProducts.push(payload);
      return Object.assign({}, state, { currentOrderProducts: [...newCurrentOrderProducts] });      
    }

    case Order.UPDATE_PRODUCT: {
      const payload = action.payload;
      const currentOrderProducts:any = state.currentOrderProducts.map((product:any) => {
        if(product?.id !== payload?.id) {
          return product;
        }

        return payload;
      });
     
      return Object.assign({}, state, { currentOrderProducts });      
    }

    case Order.SET_CURRENT_ORDER: {
      const payload = action.payload;
      return Object.assign({}, state, { currentOrder: payload });      

    }
    
    case Order.CREATE_ORDER: {
      const newOrder: any = action.payload;
      const newOrderList: any = state.list;
      newOrderList.push(newOrder);

      return Object.assign({}, state, { list: newOrderList });      
    }

    case Order.SET_WAREHOUSE: {
      const payload = action.payload;      
      return Object.assign({}, state, { warehouses: payload });
    }

    case Order.SET_CURRENT_STOCKS: {
      const payload = action.payload;      
      return Object.assign({}, state, { stocks: payload });
    }

    case Order.SET_MY_WAREHOUSE: {
      const payload = action.payload;      
      return Object.assign({}, state, { myWarehouse: payload });
    }

    default:
      return state
  }  
}