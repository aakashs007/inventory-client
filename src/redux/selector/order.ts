import { RootState } from ".."

export const selectAllOrders = () => {
  return (state: RootState) => state.order.list
}

export const selectCurrentOrder = () => {
  return (state: RootState) => state.order.currentOrder
  // return (state: RootState) => {
  //   return state.order.list.find((order: any) => (order?.id == state.order.currentSelectedOrderId))
  // }
}


export const selectCurrentOrderId = () => {
  return (state: RootState) =>  state.order.currentSelectedOrderId
}

export const selectCurrentOrderProducts = () => {
  return (state: RootState) => {
    return state.order.currentOrderProducts
  }
}

export const selectCurrentProduct = () => {
  return (state: RootState) => {
    return state.order.currentOrderProducts.find((product: any) => (product?.id == state.order.currentSelectedProductId))
  }
}

export const selectCurrentProducId = () => {
  return (state: RootState) => state.order.currentSelectedProductId
}

export const selectAllProducts = () => {
  return (state: RootState) => state.order.allProducts
}

export const selectAllWarehouses = () => {
  return (state: RootState) => state.order.warehouses
}

export const selectCurrentStocks = () => {
  return (state: RootState) => state.order.stocks
}

export const selectMyWarehouse = () => {
  return (state: RootState) => state.order.myWarehouse
}