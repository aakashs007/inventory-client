import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectAllProducts, selectCurrentOrder, selectCurrentOrderId, selectCurrentProduct } from "@/redux/selector/order";
import { Button, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "@/styles/editOrder.module.css";
import { DeleteOutline } from "@mui/icons-material";
import { ProductCreateBody } from "@/models/order";
import { addProduct, deleteOrderProduct, updateOrderProduct } from "@/redux/thunk/order";
import { useRouter } from "next/router";
import { selectUserId } from "@/redux/selector/user";
import { currentOrderBelongsToUser } from "@/helpers/helperMethods";

export default function AddEditProduct(props: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = useAppSelector(selectUserId());
  const currentOrder = useAppSelector(selectCurrentOrder());
  const currentProduct = useAppSelector(selectCurrentProduct());
  const currentOrderId = useAppSelector(selectCurrentOrderId());
  const allProducts = useAppSelector(selectAllProducts());
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [serialNumber, setSerialNumber] = useState<string>();
  const [modelNumber, setModelNumber] = useState<string>();
  const [quantity, setQuanity] = useState<number>();
  const [unit, setUnit] = useState<string>();
  const [orderId, setOrderId] = useState<string | undefined>();
  const [productOptions, setProductOptions] = useState([]);
  const [productId, setProductId] = useState<string>();
  const [supplier, setSupplier] = useState<string>();
  const [currentOrderProductId, setCurrentOrderProductId] = useState<string>();

  useEffect(() => {
    setProductOptions(allProducts.map((opt: any, index: number) => {
      return (
        <option key={index} value={opt.id}>{`#${opt.id} `}{opt.name}{` (in ${opt.unit})`}</option>
      )
    }))

    if(formType === "add" && allProducts.length) {
      setProductId(allProducts[0]?.id);
    }
  }, [allProducts]);

  useEffect(() => {
    if (currentProduct) {
      setFormType("edit");
      setSerialNumber(currentProduct?.serial_number);
      setModelNumber(currentProduct?.model_number);
      setQuanity(currentProduct?.quantity);
      setUnit(currentProduct?.unit);
      setOrderId(currentProduct?.order_id);
      setCurrentOrderProductId(currentProduct?.id);
      setProductId(currentProduct?.product?.id);
      setSupplier(currentProduct?.product?.supplier?.email);
    }
  }, [currentProduct]);

  function handleInputChange(event: any) {
    const id = event.target.id;
    const value = event.target.value;

    switch (id) {
      case "serialNumber":
        setSerialNumber(value);
        break;

      case "modelNumber":
        setModelNumber(value);
        break;

      case "quantity":
        setQuanity(value);
        break;

      case "unit":
        setUnit(value);
        break;

      case "productId":
        setProductId(value);
        break;
    }
  }

  function handleInputSelectChange(event: any) {
    const id = event.target.id;
    const value = event.value;

    switch (id) {
      case "productId":
        setProductId(value);
        break;
    }
  }

  function getLabel() {
    if(currentOrderProductId) {
      return `Product: #${currentOrderProductId}`;
    }

    return `Order: #${currentOrderId}`
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    const productData: ProductCreateBody = {};

    productData.order_id = currentOrderId;
    productData.serial_number = serialNumber;
    productData.model_number = modelNumber;
    productData.quantity = quantity;
    productData.unit = unit;
    productData.product_id = productId;

    if(formType === "add") {
      dispatch(addProduct(productData));
    } else if(currentOrderProductId) {
      dispatch(updateOrderProduct(currentOrderProductId, productData));
    }

    router.back();
  }

  function deleteProduct() {
    if(currentOrderProductId) dispatch(deleteOrderProduct(currentOrderProductId));    
    router.back();
  }

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Row className={styles.mtop}>
          <Col md={10} sm={11} xs={6}>
            <Chip label={getLabel()} variant="outlined" className={styles.mRight} size={"medium"} />
            {/* <Button className={styles.mRight} variant="outlined" startIcon={<EditOutlined />}>
              Edit
            </Button> */}
            {
              currentOrderProductId && currentOrderBelongsToUser(currentOrder, userId) && (
                <Button onClick={deleteProduct} color="error" variant="outlined" startIcon={<DeleteOutline />}>
                  Delete
                </Button>
              )
            }
          </Col>
          <Col md={2} sm={1} xs={6}>
            {
              formType === "edit" && currentOrderBelongsToUser(currentOrder, userId) && (currentOrder.order_status === "created") && (
                <Button variant="contained" color="secondary" type="submit">
                  Edit Product
                </Button>                
              )
            }
            {
              formType === "add" && (
                <Button variant="contained" color="secondary" type="submit">
                  Add Product
                </Button>
              )
            }
          </Col>
        </Row>

        {
          orderId && (
            <Row>
              <Col md={3}>
                <Form.Group controlId="orderId">
                  <Form.Label>
                    Order Id
                  </Form.Label>
                  <Form.Control
                    id={"orderId"}
                    value={orderId}
                    disabled={true}
                  />
                </Form.Group>
              </Col>

              {
                supplier && (
                  <Col md={3}>
                    <Form.Group controlId="supplier">
                      <Form.Label>
                        Supplier
                      </Form.Label>
                      <Form.Control
                        id={"supplier"}
                        value={supplier}
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                )
              }
            </Row>
          )
        }

        <Row className="mt-4">
          <Col md={3}>
            <Form.Group controlId="serialNumber">
              <Form.Label>
                Serial Number
              </Form.Label>
              <Form.Control
                id={"serialNumber"}
                value={serialNumber}
                onChange={handleInputChange}
              // disabled={!allowEdit}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="modelNumber">
              <Form.Label>
                Model Number
              </Form.Label>
              <Form.Control
                id={"modelNumber"}
                value={modelNumber}
                onChange={handleInputChange}
              // disabled={!allowEdit}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={3}>
            <Form.Group controlId="productId">
              <Form.Label>
                Product
              </Form.Label>
              <Form.Select
                id={"productId"}
                value={productId}
                onChange={handleInputChange}
              >
                {productOptions}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="quantity">
              <Form.Label>
                Quantity
              </Form.Label>
              <Form.Control
                type={"number"}
                id={"quantity"}
                value={quantity}
                onChange={handleInputChange}
              // disabled={!allowEdit}
              />
            </Form.Group>
          </Col>

          {/* <Col md={3}>
            <Form.Group controlId="unit">
              <Form.Label>
                Unit
              </Form.Label>
              <Form.Control
                type={"number"}
                id={"unit"}
                value={unit}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col> */}
        </Row>
      </Form>
    </>
  );
}