import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectAllWarehouses, selectCurrentOrder } from "@/redux/selector/order";
import { EditOutlined } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "@/styles/editOrder.module.css";
import { Options, OrderCreateBody, orderPaymentModeOptions, orderStatusOptions, orderTransferTypeOptions, OrderTypeOptions } from "@/models/order";
import { selectUserId, selectUserList } from "@/redux/selector/user";
import { createOrder, updateOrder } from "@/redux/thunk/order";
import { useRouter } from "next/router";
import { currentOrderBelongsToUser, parseDate } from "@/helpers/helperMethods";

export default function AddEditOrder(props: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentOrder: any = useAppSelector(selectCurrentOrder());
  const [allowEdit, setAllowEdit] = useState<boolean>(true);
  const [orderId, setOrderId] = useState<string>();
  const [stockInOut, setStockInOut] = useState<string>();
  const [orderType, setOrderType] = useState<string>();
  const [orderStatus, setOrderStatus] = useState<string>();
  const [paymentMode, setPaymentMode] = useState<string>();
  const [sentFromUser, setSentFromUser] = useState<string>();
  const [sentToUser, setSentToUser] = useState<string>();
  const [issuedFromWarehouse, setIssuedFromWarehouse] = useState<string>();
  const [issuedToWarehouse, setIssuedToWarehouse] = useState<string>();
  const [issuedForClientName, setIssuedForClientName] = useState<string>();
  const [issuedForClientAddr, setIssuedForClientAddr] = useState<string>();
  const [issuedForClientPincode, setIssuedForClientPincode] = useState<string>();
  const [serviceReportNumber, setServiceReportNumber] = useState<string>();
  const [delieveryChallanNumber, setDelieveryChallanNumber] = useState<string>();
  const [createdAt, setCreatedAt] = useState<string>();
  const [sentAt, setSentAt] = useState<string>();
  const [recievedAt, setRecievedAt] = useState<string>();
  const [formType, setFormType] = useState<"add" | "edit">("add");

  const usersList = useAppSelector(selectUserList());
  const warehousesList = useAppSelector(selectAllWarehouses());
  const userId = useAppSelector(selectUserId());

  useEffect(() => {
    if (currentOrder) {
      setFormType("edit");
      setOrderId(currentOrder?.id);
      setStockInOut(currentOrder?.transfer_type);
      setOrderType(currentOrder?.order_type);
      setOrderStatus(currentOrder?.status);
      setPaymentMode(currentOrder?.payment_mode);
      setSentFromUser(currentOrder?.sent_from_user?.id ?? "");
      setIssuedFromWarehouse(currentOrder?.sent_from_user?.warehouse?.id ?? "");
      setSentToUser(currentOrder?.sent_to_user?.id ?? "");
      setIssuedToWarehouse(currentOrder?.issued_to_warehouse?.id ?? "");
      setIssuedForClientName(currentOrder?.issued_for_client_name);
      setIssuedForClientAddr(currentOrder?.issued_for_client_address);
      setIssuedForClientPincode(currentOrder?.issued_for_client_pincode);
      setServiceReportNumber(currentOrder?.service_report_number);
      setDelieveryChallanNumber(currentOrder?.delievery_challan_number);
      setCreatedAt(parseDate(currentOrder?.created_at));
      setSentAt(parseDate(currentOrder?.sent_at));
      setRecievedAt(parseDate(currentOrder?.recieved_at));

      if(!currentOrderBelongsToUser(currentOrder, userId)) {
        setAllowEdit(false)
      }
    } else {
      setStockInOut(orderTransferTypeOptions[0].value);
      setOrderType(OrderTypeOptions[0].value);
      setPaymentMode(orderPaymentModeOptions[0].value);
    }
  }, [currentOrder]);

  function getSentFromAndToUser(sentFromTo: any): string {
    if (!sentFromTo) return "";

    return `${sentFromTo?.email}(${sentFromTo?.user_type})`
  }

  function getOptions(options: Array<Options>) {
    return options.map((opt, index) => (
      <option key={index} value={opt.value}>{opt.label}</option>
    ));
  }

  function handleInputChange(event: any) {
    const id = event.target.id;
    const value = event.target.value;

    switch (id) {
      case "sentFromUser":
        setSentFromUser(value);
        break;

      case "sentToUser":
        setSentToUser(value);
        break;

      case "issuedFromWarehouse":
        setIssuedFromWarehouse(value);
        break;

      case "issuedToWarehouse":
        setIssuedToWarehouse(value);
        break;

      case "issuedForClientName":
        setIssuedForClientName(value);
        break;

      case "issuedForClientAddr":
        setIssuedForClientAddr(value);
        break;

      case "issuedForClientPincode":
        setIssuedForClientPincode(value);
        break;

      case "serviceReportNumber":
        setServiceReportNumber(value);
        break;

      case "delieveryChallanNumber":
        setDelieveryChallanNumber(value);
        break;

      case "createdAt":
        setCreatedAt(parseDate(value));
        break;

      case "sentAt":
        setSentAt(parseDate(value));
        break;

      case "recievedAt":
        setRecievedAt(parseDate(value));
        break;

      case "orderStatus":
        setOrderStatus(value);
        break;

      case "stockInOut":
        setStockInOut(value);
        break;

      case "orderType":
        setOrderType(value);
        break;

      case "paymentMode":
        setPaymentMode(value);
        break;
    }
  }

  // function handleInputSelectChange(event: any) {
  //   const id = event.target.id;
  //   const value = event.value;

  //   switch (id) {
  //     case "orderStatus":
  //       setOrderStatus(value);
  //       break;

  //     case "stockInOut":
  //       setStockInOut(value);
  //       break;

  //     case "orderType":
  //       setOrderType(value);
  //       break;

  //     case "paymentMode":
  //       setOrderType(value);
  //       break;
  //   }
  // }

  function changeAllowEdit(e: any) {
    setAllowEdit(!allowEdit);
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    const orderData: OrderCreateBody = {
      order_type: orderType,
      transfer_type: stockInOut,
      payment_mode: paymentMode,
      sent_from_user_id: sentFromUser,
      sent_to_user_id: sentToUser,
      issued_to_warehouse_id: issuedToWarehouse,
      issued_for_client_name: issuedForClientName,
      issued_for_client_address: issuedForClientAddr,
      issued_for_client_pincode: issuedForClientPincode,
      service_report_number: serviceReportNumber,
      delievery_challan_number: delieveryChallanNumber
    };

    console.log(orderData)
    if (formType === "add") {
      dispatch(createOrder(orderData));
      router.back();
    } else {
      orderData.status = orderStatus;
      dispatch(updateOrder(currentOrder?.id ,orderData));
    }
  }

  function getLabel() {
    if(orderId) {
      return `Order: #${orderId}`;
    }

    return `New Order`;
  }

  return (
    <>
      <Form className={'mt-5'} onSubmit={handleFormSubmit}>
        <Row>
          <Col md={11} sm={11} xs={8}>
            <Chip label={getLabel()} variant="outlined" className={styles.mRight} size={"medium"} />
            {/* <Button variant="outlined" startIcon={<EditOutlined />} onClick={changeAllowEdit}>
              Edit
            </Button> */}
          </Col>
          <Col md={1} sm={1} xs={4}>
            {
              allowEdit && (
                <Button variant="contained" color="success" type="submit">
                  { formType === "add" ? 'Create' : 'Update'}
                </Button>
              )
            }
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={2}>
            <Form.Group controlId="orderType">
              <Form.Label>
                Type
              </Form.Label>
              <Form.Select
                id={"orderType"}
                value={orderType}
                onChange={handleInputChange}
                disabled={!allowEdit}
              >
                {getOptions(OrderTypeOptions)}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="orderStockInOut">
              <Form.Label>
                Stock In/Out
              </Form.Label>
              <Form.Select
                id={"stockInOut"}
                value={stockInOut}
                onChange={handleInputChange}
                disabled={!allowEdit}
              >
                {getOptions(orderTransferTypeOptions)}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="orderStatus">
              <Form.Label>
                Order Status
              </Form.Label>
              <Form.Select 
                onChange={handleInputChange} 
                disabled={!allowEdit || formType === "add"} 
                value={orderStatus}
              >
                {getOptions(orderStatusOptions)}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="paymentMode">
              <Form.Label>
                Payment Mode
              </Form.Label>
              <Form.Select onChange={handleInputChange} disabled={!allowEdit} value={paymentMode}>
                {getOptions(orderPaymentModeOptions)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-5">
          {            
            <Col md={3}>
              <Form.Group controlId="sentFromUser">
                <Form.Label>
                  Sent From User(role)
                </Form.Label>
                {/* <Form.Control
                  id={"sentFromUser"}
                  value={sentFromUser}
                  onChange={handleInputChange}
                  disabled={true}
                /> */}
                <Form.Select id={"sentFromUser"} onChange={handleInputChange} disabled={!allowEdit} value={sentFromUser}>
                  <option key={0} value={''}></option>
                  {
                    usersList.map((user: any, index: number) => (
                      <option key={index+1} value={user?.id}>{`${user?.email} (${user?.user_type})`}</option>
                    ))
                  }
                </Form.Select>
              </Form.Group>
            </Col>
          }

          <Col md={3}>
            <Form.Group controlId="issuedFromWarehouse">
              <Form.Label>
                Issued From Warehouse
              </Form.Label>
              {/* <Form.Control
                id={"issuedFromWarehouse"}
                value={issuedFromWarehouse}
                onChange={handleInputChange}
                disabled={!allowEdit}
              /> */}
              <Form.Select id={"issuedFromWarehouse"} onChange={handleInputChange} disabled={!allowEdit} value={issuedFromWarehouse}>
                <option key={0} value={''}></option>
                {
                  warehousesList.map((warehouse: any, index: number) => (
                    <option key={index+1} value={warehouse?.id}>{warehouse?.name}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4}>
            <Form.Group controlId="sentToUser">
              <Form.Label>
                Sent To User(role)
              </Form.Label>
              {/* <Form.Control
                id={"sentToUser"}
                value={sentToUser}
                onChange={handleInputChange}
                disabled={!allowEdit}
              /> */}
              <Form.Select id={"sentToUser"} onChange={handleInputChange} disabled={!allowEdit} value={sentToUser}>
                <option key={0} value={''}></option>
                {
                  usersList.map((user: any, index: number) => (
                    <option key={index+1} value={user?.id}>{`${user?.email} (${user?.user_type})`}</option>
                  ))
                }
              </Form.Select>              
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="issuedToWarehouse">
              <Form.Label>
                Issued To Warehouse
              </Form.Label>
              {/* <Form.Control
                id={"issuedToWarehouse"}
                value={issuedToWarehouse}
                onChange={handleInputChange}
                disabled={!allowEdit}
              /> */}
              <Form.Select id={"issuedToWarehouse"} onChange={handleInputChange} disabled={!allowEdit} value={issuedToWarehouse}>
                <option key={0} value={''}></option>
                {
                  warehousesList.map((warehouse: any, index: number) => (
                    <option key={index+1} value={warehouse?.id}>{warehouse?.name}</option>
                  ))
                }
              </Form.Select>              
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={3}>
            <Form.Group controlId="issuedForClientName">
              <Form.Label>
                Issued For Client Name
              </Form.Label>
              <Form.Control
                id={"issuedForClientName"}
                value={issuedForClientName}
                onChange={handleInputChange}
                disabled={!allowEdit}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="issuedForClientAddress">
              <Form.Label>
                Issued For Client Address
              </Form.Label>
              <Form.Control
                id={"issuedForClientAddr"}
                value={issuedForClientAddr}
                onChange={handleInputChange}
                disabled={!allowEdit}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="issuedForClientPincode">
              <Form.Label>
                Issued For Client Pincode
              </Form.Label>
              <Form.Control
                id={"issuedForClientPincode"}
                value={issuedForClientPincode}
                onChange={handleInputChange}
                disabled={!allowEdit}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={3}>
            <Form.Group controlId="serviceReportNumber">
              <Form.Label>
                Service Report Number
              </Form.Label>
              <Form.Control
                id={"serviceReportNumber"}
                value={serviceReportNumber}
                onChange={handleInputChange}
                disabled={!allowEdit}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="delieveryChallanNumber">
              <Form.Label>
                Delievery Challan Number
              </Form.Label>
              <Form.Control
                id={"delieveryChallanNumber"}
                value={delieveryChallanNumber}
                onChange={handleInputChange}
                disabled={!allowEdit}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-5 mb-5">
          <Col md={3}>
            <Form.Group controlId="createdAt">
              <Form.Label>
                Order Created At
              </Form.Label>
              <Form.Control
                id={"createdAt"}
                value={createdAt}
                onChange={handleInputChange}
                disabled={true}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="sentAt">
              <Form.Label>
                Order Sent At
              </Form.Label>
              <Form.Control
                id={"sentAt"}
                value={sentAt}
                onChange={handleInputChange}
                disabled={true}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="recievedAt">
              <Form.Label>
                Order Recieved At
              </Form.Label>
              <Form.Control
                id={"recievedAt"}
                value={recievedAt}
                onChange={handleInputChange}
                disabled={true}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

    </>
  );
}