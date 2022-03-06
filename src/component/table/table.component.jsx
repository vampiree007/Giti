import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setFilterPage } from "../../redux/slices/filter/filter.slice";
import RowPage from "./row.component";
import SkeletonComponent from "../skeleton/skeleton.component";


export default function CustomizedTables() {
  const repos = useSelector((state) => state.repo.repos);
  const { page } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(setFilterPage(page + 1));
  };

  if (!repos) return <SkeletonComponent />;
  return (
    <TableContainer component={Paper}>
      <InfiniteScroll
        dataLength={repos?.length}
        next={fetchData}
        hasMore={true}
        loader={<SkeletonComponent />}
      >
        <Grid>
          {repos?.map((row, i) => (
            <RowPage repo={row} key={row.name} />
          ))}
        </Grid>
      </InfiniteScroll>
    </TableContainer>
  );
}
