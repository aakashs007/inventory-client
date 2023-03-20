import { CustomAppBar } from "@/layout/appbarLayout";
import ResponsiveDrawer from "@/layout/sidebarLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentOrder, selectCurrentOrderProducts } from "@/redux/selector/order";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import styles from "@/styles/editOrder.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { Button, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import { Options, orderPaymentModeOptions, orderStatusOptions, orderTransferTypeOptions, OrderTypeOptions } from "@/models/order";
import { fetchOrderProducts, showOrder } from "@/redux/thunk/order";
import ProductTable from "@/components/products/table";
import AddEditOrder from "@/components/order/addEditForm";

export default function EditOrder(prop: any) {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { id } = router.query; // order id
  const orderProducts = useAppSelector(selectCurrentOrderProducts());

  useEffect(() => {
    if (id) {
      typeof id === 'string' && dispatch(showOrder(id));
      dispatch(fetchOrderProducts({ order_id: id }));
    }
  }, [id]);

  return (
    <>
      <CustomAppBar drawerWidth={0} />
      <ResponsiveDrawer />
      <Container>
        <AddEditOrder />

        <Row>
          <Col md={12}>
            <ProductTable products={orderProducts} />
          </Col>
        </Row>
      </Container>
    </>
  );
}