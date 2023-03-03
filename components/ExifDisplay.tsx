'use client'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Fade, List, ListItem, useMediaQuery } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
import IsoIcon from '@mui/icons-material/Iso';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ExifTags } from "ts-exif-parser";
import { location } from '@/types/types';

const addressLength = (location: location):number => {
    const length = (location?.placeName?? '').length + (location?.city?? '').length
    return length
}

export default function ExifDisplay({
    exif,
    location = undefined,
    type = 'phone'
}: { exif: ExifTags, location?: location, type?: 'phone' | 'camera' | 'film' }) {
    const date = new Date(exif.DateTimeOriginal! * 1000)
    // Old way of getting city name
    // const city = location?.vicinity?.split(', ').slice(-1)
    const city = location?.city
    const placeName = location?.placeName
    const mobile = !useMediaQuery('(min-width:700px)')
    const length = addressLength(location)

    switch (type) {
        case 'phone':
            return (
                <Fade in timeout={800} style={{
                    transitionDelay: '0.5s',
                }}>
                    <List dense sx={{
                        margin: `${mobile ? '0px 0px 0px 0px' : '15px 0px 0px 0px'}`,
                    }}>
                        { length > 0 &&
                        <ListItem>
                            <LocationOnIcon />
                            <span style={{ marginLeft: '16px', }}>
                                {mobile && addressLength(location) >= 24?
                                    <>
                                        <h4 style={{ margin: '0px', }}>{placeName}</h4>
                                        <h4 style={{ margin: '0px', }}>{city ? `${city}` : ''}</h4>
                                    </> :
                                    <h4 style={{ margin: '0px', }}>{placeName}{city ? ` , ${city}` : ''}</h4>
                                }
                            </span>
                        </ListItem>}
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
                                <p style={{ margin: '0px 0px 0px 16px', }}>1/{Number(exif.ExposureTime) >= 1 ? Number(exif.ExposureTime) : 1 / Number(exif.ExposureTime)}s</p>
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
                                <p style={{ margin: '0px 0px 0px 16px', }}>1/{Number(exif.ExposureTime) >= 1 ? Number(exif.ExposureTime) : 1 / Number(exif.ExposureTime)}s</p>
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
                                    <p style={{ margin: '0px' }}>Fujifilm GF670</p>
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
                                    <p style={{ margin: '0px' }}>Leica MP</p>
                                </span>
                            </ListItem>
                        </List>
                    </Fade>
                )
            }
    }
}