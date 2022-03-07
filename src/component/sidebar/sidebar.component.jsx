import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import CardContent from '@mui/material/CardContent';
import FilterSelect from '../select/select.component';
import FilterListIcon from '@mui/icons-material/FilterList';
import DatePicker from '../datePicker/datePicker.component';
import { useDispatch } from 'react-redux';
import { setActiveFilterDate } from '../../redux/slices/filter/filter.slice';

// HOMEPAGE SIDEBAR CONTAINS FILTER OPTIONS
const Sidebar = () => {
    const dispatch = useDispatch();

    // FILTER OPTIONS FOR DAYS SELECTION
    const options = [
        {name: 'Last 7 Days', value: 604800000},
        {name: 'Last 14 Days', value: 604800000 * 2},
        {name: 'Last 28 Days', value: 604800000 * 4},
        {name: 'Custom Date', value: 'custom'},
    ]
    
    const handleChange = useCallback((value) => {
        // 1: RETURN IF VALUE IS CUSTOM
        if(value === 'custom') return
        // 2: HANDLE VALUE
        const ms = Date.now() - value;
        dispatch(setActiveFilterDate(ms));
    }, [dispatch])

    return (
        <Grid container style={{position: 'sticky', top: '20px'}}>
            <Card style={{ width: '100%', backgroundColor: '#fff' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center' }} color="text.secondary" gutterBottom>
                        <FilterListIcon /> &nbsp; FILTER
                    </Typography>
                    <Box sx={{marginTop: '20px'}}>
                        <FilterSelect options={options} fn={handleChange} />
                    </Box>
                    <Box sx={{marginTop: '20px'}}>
                        <DatePicker />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Sidebar