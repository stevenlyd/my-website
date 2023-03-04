import { Box, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import React from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import Link from "next/link";
import { usePathname } from "next/navigation";
import useScrollPosition from "@/hooks/useScrollPosition";

interface NavbarProps {
    toggleColorMode: () => void,
    themeMode: 'light' | 'dark',
}

export default function Navbar(navbarProps: NavbarProps) {
    const mobile = !useMediaQuery('(min-width:700px)')
    const scrollPos = useScrollPosition()
    const toggleColorMode = navbarProps.toggleColorMode
    const themeMode = navbarProps.themeMode
    const currentPath = usePathname()

    return (
        <Toolbar
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'space-between',
                position: 'fixed',
                height: `${scrollPos >= (mobile ? 90.52 : 60) ? (mobile ? '50px' : '70px') : (mobile ? '70px' : '120px')}`,
                transition: 'height 0.5s ease-in-out, opacity 0.5s linear, box-shadow 0.5s linear, background-color 0.25s linear',
                boxShadow: `${scrollPos >= 120 ? 'rgb(0 0 0 / 15%) 0px 10px 6px' : 'none'}`,
                backgroundColor: 'background.paper',
                opacity: `${scrollPos >= 120 ? '0.88' : '1'}`,
                width: '100%',
                top: '0px',
                left: '0px',
                zIndex: '1400',
            }}
            style={{
                padding: `${mobile ? '0px 25px 0px 25px' : '25px 75px 25px 75px'}`,
            }}
        >
            <Link href='/' color='inherit' style={{
                textDecoration: 'none',
                color: 'inherit',
                paddingRight: '2vw',
                // maxHeight: '100%',
            }}>
                <h2>
                    Steven Liu
                </h2>
            </Link>
            <Box>
                <Link href='/gallery'
                    style={{
                        textDecoration: `${currentPath !== '/about' && currentPath !== '/' ? 'underline' : 'none'}`,
                        textUnderlineOffset: '8px',
                        color: 'inherit',
                        paddingRight: '2vw'
                    }}>
                    Gallery
                </Link>
                <Link href='/about' style={{
                    textDecoration: `${currentPath === '/about' ? 'underline' : 'none'}`,
                    textUnderlineOffset: '8px',
                    color: 'inherit',
                    paddingRight: '2vw'
                }}>
                    About
                </Link>
                <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                    {themeMode === 'dark' ? <LightModeIcon /> : <BedtimeIcon />}
                </IconButton>
            </Box>
        </Toolbar>
    )
}