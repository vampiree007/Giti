import { Container, Grid } from "@mui/material";
import React from "react";
import Header from "../component/header/header.component";
import Sidebar from "../component/sidebar/sidebar.component";

// WRAPPER COMPONENT TO DYNAMICALLY SET SIDEBAR AND HEADER
const ContainerComponent = ({ children, header, sidebar }) => {
  return (
    <div>
      {header && <Header />}
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={1}>
          {sidebar && (
            <Grid item xs={12} md={2} >
              <Sidebar />
            </Grid>
          )}
          <Grid item md={sidebar ? 10 : 12} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContainerComponent;
