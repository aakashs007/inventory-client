import { CustomAppBar } from "@/layout/appbarLayout";
import AddEditOrder from "@/components/order/addEditForm";
import { Container } from "@mui/system";
import ResponsiveDrawer from "@/layout/sidebarLayout";

export default function NewOrder(prop: any) {
  return(
    <>
      <CustomAppBar />
      <ResponsiveDrawer />
      <Container>
        <AddEditOrder />
      </Container>
    </>
  );
}