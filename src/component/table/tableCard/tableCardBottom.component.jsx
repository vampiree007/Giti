import { Box, Card, Grid } from '@mui/material'
import React, { useCallback, useState } from 'react'
import ContributorChart from '../../charts/contributorChart.component'
import ChartComponent from '../../charts/totalChart.component'
import CustomSelect from '../../select/select.component'
import FilterListIcon from '@mui/icons-material/FilterList'

// CHART FILTER OPTIONS DEFINITION
const options = [
    { name: 'Commits', value: "c" },
    { name: 'Additions', value: "a" },
    { name: 'Deletions', value: "d" },
]

// TABLE ROW BOTTOM PART INCLUDES ACCORDIAN BOTTOM SECTION
const TableCardBottom = ({ repo }) => {
    const [selectValue, setSelectValue] = useState(options[0].value)

    // SET SELECTED FILTER OPTION TO STATE
    const handleChange = useCallback((value) => {
        setSelectValue(value)
    }, [])

    return (
        <div>
            <Grid sx={{ display: "flex", alignItems: 'center' }} justifyContent={{ xs: "center", md: "right" }} >
                <FilterListIcon sx={{marginRight: '20px'}} />
                <Box sx={{ width: "200px" }} >
                    <CustomSelect options={options} fn={handleChange} />
                </Box>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} mt={{ xs: 3 }}>
                    <Card sx={{ p: 2, boxShadow: "none" }}>
                        <ChartComponent repo={repo} />
                    </Card>
                </Grid>
                    <Grid item xs={12} md={6} mt={{ xs: 3 }} mb={{ xs: 5 }}>
                        <Card sx={{ p: 2, boxShadow: "none" }}>
                            <ContributorChart repo={repo} selectValue={selectValue} />
                        </Card>
                    </Grid>
            </Grid>
        </div>
    )
}

export default TableCardBottom;