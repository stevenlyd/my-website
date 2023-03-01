'use client'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {Fade, List, ListItem} from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
import IsoIcon from '@mui/icons-material/Iso';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {ExifTags} from "ts-exif-parser";

export default function ExifDisplay({exif, type = 'phone'}: { exif: ExifTags, type?: 'phone' | 'camera' | 'film' }) {
    const date = new Date(exif.DateTimeOriginal! * 1000)
    return (
        <Fade in timeout={800}>
            <List>
                <ListItem>
                    <CameraAltIcon style={{marginRight: '5px'}}/>
                    <p>{exif.LensModel}</p>
                </ListItem>
                <ListItem>
                    <IsoIcon style={{marginRight: '5px'}}/>
                    <p>ISO{exif.ISO}</p>
                </ListItem>
                <ListItem>
                    <CameraIcon style={{marginRight: '5px'}}/>
                    <p>f/{Number(exif.FNumber).toFixed(1)}</p>
                    <p></p>
                </ListItem>
                <ListItem>
                    <ShutterSpeedIcon style={{marginRight: '5px'}}/>
                    <p>1/{1 / Number(exif.ExposureTime)}</p>
                </ListItem>
                <ListItem>
                    <ScheduleIcon style={{marginRight: '5px'}}/>
                    <p>{date.toDateString()}</p>
                </ListItem>
            </List>
        </Fade>
    )
}