'use client'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Fade, List, ListItem } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
import IsoIcon from '@mui/icons-material/Iso';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ExifTags } from "ts-exif-parser";


export default function ExifDisplay({
    exif,
    location=undefined,
    type = 'phone'
}: { exif: ExifTags, location?: any, type?: 'phone' | 'camera' | 'film' }) {
    const date = new Date(exif.DateTimeOriginal! * 1000)
    const city = location?.vicinity?.split(', ').slice(-1)
    switch (type) {
        case 'phone':
            return (
                <Fade in timeout={800} style={{
                    transitionDelay: '0.5s',
                }}>
                    <List dense sx={{
                        margin: '15px 0px 0px 0px'
                    }}>
                        <ListItem>
                            <LocationOnIcon />
                            <span style={{ marginLeft: '16px', }}>
                                <h4 style={{ margin: '0px', }}>{location?.name}{city ? ` , ${city[0]}` : ''}</h4>
                            </span>
                        </ListItem>
                        <ListItem>
                            <CameraAltIcon />
                            <span style={{ marginLeft: '16px', }}>
                                <p style={{ margin: '0px' }}>{exif.LensModel?.split('back')[0]}</p>
                            </span>
                        </ListItem>
                        <ListItem sx={{
                            display: 'inline-flex',
                        }}>
                            <CameraIcon />
                            <span>
                                <p style={{ margin: '0px 0px 0px 16px', }}>{exif.FocalLengthIn35mmFormat}mm</p>
                            </span>
                            <span>
                                <p style={{ margin: '0px 0px 0px 16px', }}>ISO{exif.ISO}</p>
                            </span>
                            <span>
                                <p style={{ margin: '0px 0px 0px 16px', }}>f/{Number(exif.FNumber).toFixed(1)}</p>
                            </span>
                            <span>
                                <p style={{ margin: '0px 0px 0px 16px', }}>1/{Number(exif.ExposureTime) >= 1 ? Number(exif.ExposureTime) : 1 / Number(exif.ExposureTime)}</p>
                            </span>
                        </ListItem>
                    </List>
                </Fade>
            )
        case 'camera':
            return (
                <Fade in timeout={800} style={{
                    transitionDelay: '0.5s',
                }}>
                    <List dense sx={{
                        margin: '15px 0px 0px 0px'
                    }}>
                        <ListItem>
                            <CameraAltIcon />
                            <span style={{ marginLeft: '16px', }}>
                                <p style={{ margin: '0px' }}>{exif.LensModel}</p>
                            </span>
                        </ListItem>
                        <ListItem sx={{
                            display: 'inline-flex',
                        }}>
                            <CameraIcon />
                            <span>
                                <p style={{ margin: '0px 0px 0px 16px', }}>{exif.FocalLengthIn35mmFormat}mm</p>
                            </span>
                            <span>
                                <p style={{ margin: '0px 0px 0px 16px', }}>ISO{exif.ISO}</p>
                            </span>
                            <span>
                                <p style={{ margin: '0px 0px 0px 16px', }}>f/{Number(exif.FNumber).toFixed(1)}</p>
                            </span>
                            <span>
                                <p style={{ margin: '0px 0px 0px 16px', }}>1/{1 / Number(exif.ExposureTime)}</p>
                            </span>
                        </ListItem>
                    </List>
                </Fade>
            )
        case 'film':
            const make = exif?.Model

            if (make !== 'LS5000 Filmstrip') { //Medium Format
                return (
                    <Fade in timeout={800} style={{
                        transitionDelay: '0.5s',
                    }}>
                        <List dense sx={{
                            margin: '15px 0px 0px 0px'
                        }}>
                            <ListItem>
                                <CameraAltIcon />
                                <span style={{ marginLeft: '16px', }}>
                                    <p style={{ margin: '0px' }}>Medium-format Film Camera</p>
                                </span>
                            </ListItem>
                        </List>
                    </Fade>
                )
            } else { //135mm
                return (
                    <Fade in timeout={800} style={{
                        transitionDelay: '0.5s',
                    }}>
                        <List dense sx={{
                            margin: '15px 0px 0px 0px'
                        }}>
                            <ListItem>
                                <CameraAltIcon />
                                <span style={{ marginLeft: '16px', }}>
                                    <p style={{ margin: '0px' }}>135mm Film Camera</p>
                                </span>
                            </ListItem>
                        </List>
                    </Fade>
                )
            }
    }
}