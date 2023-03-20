import AddEditProduct from "@/components/products/addEditForm";
import { CustomAppBar } from "@/layout/appbarLayout";
import { Container } from "@mui/system";
import { Col, Row } from "react-bootstrap";
import styles from "@/styles/editOrder.module.css";
import ResponsiveDrawer from "@/layout/sidebarLayout";

export default function AddProduct(prop: any) {
  return (
    <>
      <CustomAppBar drawerWidth={0} />
      <ResponsiveDrawer />
      <Container>
        <Row>
          <Col>
            <AddEditProduct />          
          </Col>
        </Row>
      </Container>
    </>
  );
}