import AddEditProduct from "@/components/products/addEditForm";
import { CustomAppBar } from "@/layout/appbarLayout";
import { Container } from "@mui/system";
import { Col, Row } from "react-bootstrap";
import styles from "@/styles/editOrder.module.css";
import ResponsiveDrawer from "@/layout/sidebarLayout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCurrentStocks, fetchMyWarehouse } from "@/redux/thunk/order";
import { selectCurrentStocks, selectMyWarehouse } from "@/redux/selector/order";
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function AddProduct(prop: any) {
  const dispatch = useAppDispatch();
  const stocks = useAppSelector(selectCurrentStocks());
  const myWarehouse = useAppSelector(selectMyWarehouse());

  useEffect(() => {
    dispatch(fetchCurrentStocks());
    dispatch(fetchMyWarehouse());
  }, []);

  return (
    <>
      <CustomAppBar drawerWidth={0} />
      <ResponsiveDrawer />
      <Container>
        <Row className="mt-5 mb-4">
          <Col md={12}>
            <Typography variant="h5">{myWarehouse?.name}</Typography>
          </Col>
          <Col md={12}>
            <Typography>{myWarehouse?.address}{' '}{myWarehouse?.pincode}</Typography>
          </Col>
        </Row>
        <Divider style={{ border: "2px solid black" }}/>
        <Row className="mt-5">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>Product Name</b></TableCell>
                  <TableCell align="center"><b>Product Stock</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  stocks && stocks.map((stock: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell align="center">{stock?.product?.name}</TableCell>
                      <TableCell align="center">{stock?.quantity}{` ${stock?.product?.unit}`}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Row>
      </Container>
    </>
  );
}