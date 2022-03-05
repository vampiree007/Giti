import { Container, Grid } from '@mui/material';
import React from 'react'
import Header from '../component/header/header.component'
import Sidebar from '../component/sidebar/sidebar.component';

const ContainerComponent = ({ children, header, sidebar }) => {
    return (
        <div>
            {header && <Header />}
            <Container style={{marginTop: '20px'}} disableGutters>
                <Grid container spacing={1}>
                    {
                        sidebar && <Grid item xs={2}><Sidebar /> </Grid>
                    }
                    <Grid item xs={sidebar ? 10 : 12}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ContainerComponent;