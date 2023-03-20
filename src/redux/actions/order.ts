export enum Order {
  SET_ALL_ORDERS = "order/SET_ALL_ORDERS",
  CURRENT_SELECTED_ORDER = "order/CURRENT_SELECTED_ORDER",
  CURRENT_SELECTED_PRODUCT = "order/CURRENT_SELECTED_PRODUCT",
  CURRENT_ORDER_PRODUCTS = "order/CURRENT_ORDER_PRODUCTS",
  SET_ALL_PRODUCTS = "order/SET_ALL_PRODUCTS",
  ADD_PRODUCT = "order/ADD_PRODUCT",
  UPDATE_PRODUCT = "order/UPDATE_PRODUCT",
  SET_CURRENT_ORDER = "order/SET_CURRENT_ORDER",
  CREATE_ORDER = "order/CREATE_ORDER",
  SET_WAREHOUSE = "order/SET_WAREHOUSE",
  SET_CURRENT_STOCKS = "order/SET_CURRENT_STOCKS"
}

export const setAllOrders = (payload: string) => {
  return { type: Order.SET_ALL_ORDERS, payload };
}

export const setCurrentSelectedOrderId = (payload: string) => {
  return { type: Order.CURRENT_SELECTED_ORDER, payload };
}

export const setCurrentOrderProducts = (payload: any) => {
  return { type: Order.CURRENT_ORDER_PRODUCTS, payload };
}

export const setCurrentSelectedProduct = (payload: string) => {
  return { type: Order.CURRENT_SELECTED_PRODUCT, payload }
}

export const setAllProducts = (payload: any) => {
  return { type: Order.SET_ALL_PRODUCTS, payload }
}

export const setAddProduct = (payload: any) => {
  return { type: Order.ADD_PRODUCT, payload }
}

export const setUpdateProduct = (payload: any) => {
  return { type: Order.UPDATE_PRODUCT, payload }
}

export const setCurrentOrder = (payload: any) => {
  return { type: Order.SET_CURRENT_ORDER, payload }
}

export const setCreateOrderr = (payload: any) => {
  return { type: Order.CREATE_ORDER, payload }
}

export const setWarehouses = (payload: any) => {
  return { type: Order.SET_WAREHOUSE, payload };
}

export const setCurrentStocks = (payload: any) => {
  return { type: Order.SET_CURRENT_STOCKS, payload };
}