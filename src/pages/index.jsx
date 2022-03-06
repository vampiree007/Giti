import ContainerComponent from "../container/container.component";
import StickyHeadTable from "../component/table/table.component";
import { Grid } from "@mui/material";
import Sidebar from "../component/sidebar/sidebar.component";

const HomePage = () => {
  return (
    <div>
      <ContainerComponent header={true} sidebar={true}>
        <Grid item xs={12} md={4} display={{ xs: "block", md: "none" }} mb={2}>
          <Sidebar />
        </Grid>
        <StickyHeadTable />
      </ContainerComponent>
    </div>
  );
};

export default HomePage;
