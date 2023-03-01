'use client'
import {Grid, useMediaQuery} from "@mui/material";
import React from "react";
import Trips from "@/components/Trips";
import {usePathname} from "next/navigation";

export default function GalleryLayout({children}: { children: React.ReactNode }) {
    const mobile = !useMediaQuery('(min-width:700px)')
    const currentPath = usePathname()

    if (currentPath?.match(/\/gallery\/[\w-]+\/[\w-]+/g)) {
        return (
            <>
                {children}
            </>
        )
    }else {
        return (
            <Grid container direction={mobile ? 'column' : 'row'}>
                <Grid item xs={2}>
                    <Trips/>
                </Grid>
                <Grid item
                      xs={10}>
                    {children}
                </Grid>
            </Grid>
        )
    }
}