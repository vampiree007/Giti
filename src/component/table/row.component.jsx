import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import React from "react";
import CardTopComponent from "./tableCard/tableCardTop.component";
import TableCardBottom from "./tableCard/tableCardBottom.component";

const RowPage = ({ repo }) => {

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<ExpandMoreOutlined />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <CardTopComponent repo={repo} />
      </AccordionSummary>

      <AccordionDetails>
        <TableCardBottom repo={repo} />
      </AccordionDetails>
    </Accordion>
  );
};
export default RowPage;
