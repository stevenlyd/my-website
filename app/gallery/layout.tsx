'use client'
import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import Trips from "@/components/Trips";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    const mobile = !useMediaQuery('(min-width:700px)')
    const currentPath = usePathname()

    if (currentPath?.match(/\/gallery\/[\w-]+\/[\w-]+/g)) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return (
            <Grid container direction={mobile ? 'column' : 'row'}>
                <Grid item xs={2}>
                    <div style={{
                        position: 'sticky',
                        top: '120px',
                        left: '0px',
                        display: 'flex',
                        flexDirection: `${mobile ? 'row' : 'column'}`,
                        justifyContent: `${mobile ? 'space-around' : 'start'}`,
                        margin: `${mobile ? '0px 0px 25px 0px' : '0px 25px 0px 0px'}`,
                    }}>
                        <Trips />
                        <Link href='/gallery/iphone' style={{
                            textDecoration: `${currentPath?.includes('iphone') ? 'underline' : 'none'}`,
                            textUnderlineOffset: '8px',
                            color: 'inherit',
                        }}>
                            <h3 style={{
                                zIndex: '1300',
                            }}>
                                iPhone
                            </h3>
                        </Link>
                    </div>
                </Grid>
                <Grid item
                    xs={10}>
                    {children}
                </Grid>
            </Grid>
        )
    }
}