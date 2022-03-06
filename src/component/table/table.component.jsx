import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setFilterPage } from "../../redux/slices/filter/filter.slice";
import { Link } from "react-router-dom";
import RowPage from "../../pages/repo/row.component";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f2f2f8",
    color: theme.palette.common.gray,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F5F5F5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const repos = useSelector((state) => state.repo.repos);
  const { page } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(setFilterPage(page + 1));
  };

  if (!repos) return <div>Loading... .</div>;
  return (
    <TableContainer component={Paper}>
      <InfiniteScroll
        dataLength={repos?.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
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
