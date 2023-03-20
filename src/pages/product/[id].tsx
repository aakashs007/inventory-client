import { CustomAppBar } from "@/layout/appbarLayout";
import { useRouter } from "next/router";
import { Container } from "@mui/system";
import { Row } from "react-bootstrap";
import AddEditProduct from "@/components/products/addEditForm";
import ResponsiveDrawer from "@/layout/sidebarLayout";

export default function EditProduct(prop: any) {
  const router = useRouter()
  // const dispatch = useAppDispatch();
  const { id } = router.query; // product id

  return (
    <>
      <CustomAppBar drawerWidth={0} />
      <ResponsiveDrawer />
      <Container>
        <Row className="mt-4">
          <AddEditProduct />
        </Row>
      </Container>
    </>
  );
}