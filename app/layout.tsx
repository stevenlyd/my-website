'use client'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {CssBaseline, Paper, useMediaQuery} from "@mui/material";
import React from "react";
import Navbar from "@/components/Navbar";
import {DEFAULT_TRANSITION} from "@/public/variables";

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

export default function RootLayout({children,}: { children: React.ReactNode }) {
    const mobile = !useMediaQuery('(min-width:700px)')
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () => createTheme({
            palette: {
                mode,
                ...(mode === 'light'
                    ? {
                        // palette values for light mode
                        primary: {
                            main: '#373737',
                        },
                    }
                    : {
                        // palette values for dark mode
                        primary: {
                            main: '#373737',
                        },
                        background: {
                            paper: '#1a1a1a',
                            default: '#1a1a1a',
                        },
                    }),
            },
        }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <html lang="en">
                {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
                <head/>
                <body style={{
                    overflowY: 'scroll',
                }}>
                <Paper
                    square={true}
                    elevation={0}
                    sx={{
                        boxSizing: 'border-box',
                        display: `${mobile ? 'flex' : 'block'}`,
                        flexDirection: `${mobile ? 'column' : 'row'}`,
                        transition: DEFAULT_TRANSITION,
                        height: 'auto',
                        width: 'auto',
                        minHeight: '100vh',
                        maxWidth: '100vw',
                        maxHeight: '100%',
                        padding: `${mobile ? '70px 25px 25px 25px' : '180px 75px 75px 75px'}`,
                    }}>
                    <Navbar toggleColorMode={colorMode.toggleColorMode} themeMode={theme.palette.mode}/>
                    {children}
                </Paper>
                </body>
                </html>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
