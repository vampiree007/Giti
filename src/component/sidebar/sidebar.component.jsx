import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import CardContent from '@mui/material/CardContent';
import FilterSelect from '../select/select.component';
import FilterListIcon from '@mui/icons-material/FilterList';
import DatePicker from '../datePicker/datePicker.component';

const Sidebar = () => {
    return (
        <Grid container style={{position: 'relative', position: 'sticky', top: '20px'}}>
            <Card style={{ width: '100%', backgroundColor: '#fff' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center' }} color="text.secondary" gutterBottom>
                        <FilterListIcon /> &nbsp; FILTER
                    </Typography>
                    <Box sx={{marginTop: '20px'}}>
                        <FilterSelect />
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