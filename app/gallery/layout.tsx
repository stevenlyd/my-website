import React from "react";
import GalleryNavbar from "@/components/GalleryNavbar";

export default function GalleryLayout({children}: { children: React.ReactNode }) {
    return (
        <GalleryNavbar>
            {children}
        </GalleryNavbar>
    )
}