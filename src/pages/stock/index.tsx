import AddEditProduct from "@/components/products/addEditForm";
import { CustomAppBar } from "@/layout/appbarLayout";
import { Container } from "@mui/system";
import { Col, Row } from "react-bootstrap";
import styles from "@/styles/editOrder.module.css";
import ResponsiveDrawer from "@/layout/sidebarLayout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCurrentStocks } from "@/redux/thunk/order";
import { selectCurrentStocks } from "@/redux/selector/order";

export default function AddProduct(prop: any) {
  const dispatch = useAppDispatch();
  const stocks = useAppSelector(selectCurrentStocks());

  useEffect(() => {
    dispatch(fetchCurrentStocks());
  }, []);

  return (
    <>
      <CustomAppBar drawerWidth={0} />
      <ResponsiveDrawer />
      <Container>
        <Row>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}