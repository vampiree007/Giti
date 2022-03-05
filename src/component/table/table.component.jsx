import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterPage } from '../../redux/slices/filter/filter.slice';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f2f2f8',
        color: theme.palette.common.gray,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#F5F5F5',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export default function CustomizedTables() {
    const repos = useSelector(state => state.repo.repos);
    const { page } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const fetchData = () => {
        dispatch(setFilterPage(page + 1))
    }

    if(!repos) return <div>Loading... .</div>
    return (
        <TableContainer component={Paper}>
            <InfiniteScroll
                dataLength={repos?.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No.</StyledTableCell>
                            <StyledTableCell>Repo Name</StyledTableCell>
                            <StyledTableCell align="left">Repo Description</StyledTableCell>
                            <StyledTableCell align="left">Stars</StyledTableCell>
                            <StyledTableCell align="left">Issues</StyledTableCell>
                            <StyledTableCell align="left">Username</StyledTableCell>
                            <StyledTableCell align="left">Avatar</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repos?.map((row, i) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell scope="row">
                                    {i + 1 + '.'}
                                </StyledTableCell>
                                <StyledTableCell component="th" align="left" sx={{cursor: 'pointer', textTransform: 'capitalize', fontWeight: '400', color: 'teal'}}>
                                    <Link to={`/repo/${row.name}`}>{row.name}</Link>
                                </StyledTableCell>
                                <StyledTableCell align="left" sx={{fontSize: '11px', color: 'gray'}}>{row.description || '----'}</StyledTableCell>
                                <StyledTableCell align="left" sx={{fontWeight: '500', color: 'gray'}}>{row.stargazers_count}</StyledTableCell>
                                <StyledTableCell align="left" sx={{fontWeight: '500', color: 'indianred'}}>{row.open_issues_count}</StyledTableCell>
                                <StyledTableCell align="left" sx={{textTransform: 'capitalize'}}>{row.owner.login}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <Avatar alt={'avatar'} src={row.owner?.avatar_url} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </InfiniteScroll>
        </TableContainer>
    );
}
