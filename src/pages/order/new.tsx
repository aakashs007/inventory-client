import { CustomAppBar } from "@/layout/appbarLayout";
import { useState } from "react";
import AddEditOrder from "@/components/order/addEditForm";
import { Container } from "@mui/system";
import ResponsiveDrawer from "@/layout/sidebarLayout";

const orderTypes = ["Purchase", "Stock Transfer"];

export default function NewOrder(prop: any) {
  const [ORDER_TYPE, setOrderType] = useState("Purchase");
  const [SUPPLIER, setSupplier] = useState();
  const [ISSUED_TO_WAREHOUSE, setIssuedWarehouse] = useState();

  const orderOptions = () => {
    return orderTypes.map((opt, index) => (
      <option key={index} value={opt}>{opt}</option>
    ));
  }

  const supplierList = () => {
    const suppliers = [{},{id: 1, name: "Jetha"}, {id: 2, name: "Gujju"}];

    return suppliers.map((supplier, index) => (
      <option key={index} value={supplier.id}>{supplier.name}</option>
    ));
  }

  const warehouseList = () => {
    const warehouses = [{}, {id: 1, name: "Warehouse 1"}, {id: 2, name: "Warehouse 2"}];

    return warehouses.map((warehouse, index) => (
      <option key={index} value={warehouse.id}>{warehouse.name}</option>
    ));    
  }

  const handleOrderType = (event: any) => {
    setOrderType(event.target.value)
  }

  const handleSupplier = (event: any) => {
    setSupplier(event.value);
  }

  const handleIssuedWarehouse = (event:any) => {
    setIssuedWarehouse(event.value);
  }

  return(
    <>
      <CustomAppBar />
      <ResponsiveDrawer />
      <Container>
        <AddEditOrder />
      </Container>

      {/* <div className={styles.padTop}>
        <Form>
          <Form.Group controlId="orderOptions">
            <Form.Label>Order Type</Form.Label>
            <Form.Select aria-label="Order types" value={ORDER_TYPE} onChange={handleOrderType}>
              {orderOptions()}
            </Form.Select>
          </Form.Group>

          {
            ORDER_TYPE === "Purchase" && 
            <>
              <Form.Group controlId="sentFromSupplier" className="pt-5">
                <Form.Label>Supplier Name</Form.Label>
                <Form.Select aria-label="Order types" value={SUPPLIER} onChange={handleSupplier}>
                  {supplierList()}
                </Form.Select>
              </Form.Group>                
            </>
          }

          {
            ORDER_TYPE === "Stock Transfer" &&
            <>
              <Form.Group controlId="issuedToWarehouse" className="pt-5">
                <Form.Label>Issued to warehouse</Form.Label>
                <Form.Select aria-label="Issued to warehouse" value={ISSUED_TO_WAREHOUSE} onChange={handleIssuedWarehouse}>
                  {warehouseList()}
                </Form.Select>
              </Form.Group>                 
            </>
          }

          <Button className="mt-5">
            Create Order
          </Button>
        </Form>
      </div> */}
    </>
  );
}