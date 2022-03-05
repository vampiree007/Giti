import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#2A2A2A",
        position: 'relative !important'
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
}));

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

const Header = () => {
    const { header, logo } = useStyles();

    const displayDesktop = () => {
        return <Toolbar>{femmecubatorLogo}</Toolbar>;
    };

    const femmecubatorLogo = (
        <Container>

            <Link to="/">
                <Typography variant="h6" component="h1" className={logo}>
                    SBDIC GITI
                </Typography>
            </Link>

        </Container>
    );

    return (
        <header>
            <ThemeProvider theme={darkTheme}>
                <AppBar color="primary" className={header}>{displayDesktop()}</AppBar>
            </ThemeProvider>
        </header>
    );
};
export default Header;