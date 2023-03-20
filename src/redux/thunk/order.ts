import { ApiEndpoints, Params } from "@/lib/apiEndpoints";
import { OrderCreateBody, ProductCreateBody } from "@/models/order";
import { redirect } from "next/navigation";
import { Dispatch } from "react"
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from ".."
import { updateSnackbar } from "../actions/app";
import { setAddProduct, setAllOrders, setAllProducts, setCurrentOrder, setCurrentOrderProducts, setCurrentStocks, setUpdateProduct, setWarehouses } from "../actions/order";
import { setUserInfo, setUserToken, userLoading } from "../actions/user";

export const getOrders = (params?: Params) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);

    dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.get("api/v1/order");

    if(response && response?.data.success) {
      // save success
      dispatch(setAllOrders(response?.data?.data))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch order!', open: true}))
      // save error
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const fetchOrderProducts = (params: Params = {}) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);

    dispatch(userLoading({ loading : true }));
    const { success, response } = await apiEndPoint.get("api/v1/order_product", params);

    if(response && response?.data.success) {
      dispatch(setCurrentOrderProducts(response?.data?.data))
    } else {
      dispatch(setCurrentOrderProducts([]))
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch order products!', open: true}))
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const fetchAllProducts = (params: Params = {}) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);

    dispatch(userLoading({ loading : true }));
    const { success, response } = await apiEndPoint.get("api/v1/product");

    if(response && response?.data.success) {
      dispatch(setAllProducts(response?.data?.data));
    } else {
      dispatch(setAllProducts([]))
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch products!', open: true}))
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const addProduct = (productCreateBody: ProductCreateBody = {}) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);

    dispatch(userLoading({ loading : true }));
    const { success, response } = await apiEndPoint.post("api/v1/order_product", productCreateBody);

    if(success && response?.data.success) {
      dispatch(setAddProduct(response?.data?.data));
      dispatch(updateSnackbar({ type: 'success', message: 'Product added successfully!', open: true}))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to add product!', open: true}))
    }
  
    dispatch(userLoading({ loading : false }));    
  }
}

export const updateOrderProduct = (productId: string, productCreateBody: ProductCreateBody = {}) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);

    dispatch(userLoading({ loading : true }));
    const { success, response } = await apiEndPoint.put(`api/v1/order_product/${productId}`, productCreateBody);

    if(success && response?.data.success) {
      dispatch(setUpdateProduct(response?.data?.data));
      dispatch(updateSnackbar({ type: 'success', message: 'Product updated successfully!', open: true}))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to update product!', open: true}))
    }
  
    dispatch(userLoading({ loading : false }));
  }
}

export const deleteOrderProduct = (productId: string) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);

    dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.delete(`api/v1/order_product/${productId}`);

    if(success && response?.data.success) {
      dispatch(updateSnackbar({ type: 'success', message: 'Product Deleted Successfully!', open: true}))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to delete product!', open: true}))
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const showOrder = (orderId: string) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);
    dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.get(`api/v1/order/${orderId}`);

    if(success && response?.data?.success) {
      dispatch(setCurrentOrder(response?.data?.data))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch order!', open: true}))
    }

    dispatch(userLoading({ loading : false }));    
  }
}

export const updateOrder = (orderId: string, orderCreateBody: OrderCreateBody) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);
    dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.put(`api/v1/order/${orderId}`, orderCreateBody);

    if(success && response?.data?.success) {
      dispatch(setCurrentOrder(response?.data?.data))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch order!', open: true}))
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const createOrder = (orderCreateBody: OrderCreateBody) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);
    dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.post(`api/v1/order`, orderCreateBody);

    if(success && response?.data?.success) {
      dispatch(setCurrentOrder(response?.data?.data))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch order!', open: true}))
    }

    dispatch(userLoading({ loading : false }));    
  }
}

export const deleteOrder = (orderId: string) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {}
}

export const fetchWarehouses = () => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);
    // dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.get(`api/v1/warehouse`);

    if(success && response?.data?.success) {
      dispatch(setWarehouses(response?.data?.data))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch order!', open: true}))
    }

    // dispatch(userLoading({ loading : false }));        
  }
}

export const fetchCurrentStocks = () => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);
    dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.get(`api/v1/stock`);

    if(success && response?.data?.success) {
      dispatch(setCurrentStocks(response?.data?.data))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch stocks!', open: true}))
    }
    
    dispatch(userLoading({ loading : false }));
  }
}