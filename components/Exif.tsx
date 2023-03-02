import { getImageBuffer } from "@/components/myFunctions";
import { ExifParserFactory } from "ts-exif-parser";
import ExifDisplay from "@/components/ExifDisplay";

const fetchPlaceID = (coordinates: string) => fetch(process.env.GOOGLE_API! + '/geocode/json?' + new URLSearchParams({
    latlng: coordinates,
    location_type: 'ROOFTOP',
    result_type: 'establishment|tourist_attraction',
    key: process.env.GOOGLE_API_KEY!,
}),
    {
        method: 'get',
        cache: 'force-cache',
    }).then((res) => res.json())

const fetchPlaceDetail = (placeID: string) => fetch(process.env.GOOGLE_API! + '/place/details/json?' + new URLSearchParams({
    place_id: placeID,
    result_type: 'tourist_attraction|establishment',
    fields: 'vicinity,name',
    key: process.env.GOOGLE_API_KEY!,
}), {
    method: 'get',
}).then((res) => res.json())

export default async function Exif({ url }: { url: string }): Promise<JSX.Element> {
    const buffer = await getImageBuffer(url)
    const exif = ExifParserFactory.create(buffer).parse()
    const exifTags = exif?.tags!
    let placeDetailRes = undefined

    if (exifTags?.GPSLatitude) {
        const coordinates = `${exifTags.GPSLatitude}, ${exifTags.GPSLongitude}`
        const placeIDRes = await fetchPlaceID(coordinates)
        const placeID = placeIDRes?.results[0]?.place_id
        placeDetailRes = await fetchPlaceDetail(placeID)
    }

    if (exifTags?.LensMake) {
        if (exifTags.LensMake === 'Apple') {
            return (
                <ExifDisplay exif={exifTags} type='phone' location={placeDetailRes?.result!} />
            )
        } else {
            return (
                <ExifDisplay exif={exifTags} type='camera' location={placeDetailRes?.result!} />
            )
        }
    } else {
        return (
            <ExifDisplay exif={exifTags} type='film' />
        )
    }
}