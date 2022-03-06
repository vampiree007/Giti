import React from "react";
import { Skeleton } from "@mui/material";

const SkeletonComponent = () => {
  return (
    <div>
      <Skeleton animation="wave" height={20} style={{ marginBottom: 6, marginTop: 2 }} />
      <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 7 }} />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
    </div>
  );
}

export default SkeletonComponent;