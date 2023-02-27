'use client'
import {useTheme} from "@mui/material";

export default function Head() {
    const theme = useTheme()
  return (
    <>
      <title>Steven Liu</title>
        <meta name='theme-color' content={`${theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFF'}`}/>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Steven's Website" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
