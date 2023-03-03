import { getImageBuffer } from "@/components/myFunctions";
import { ExifParserFactory } from "ts-exif-parser";
import ExifDisplay from "@/components/ExifDisplay";
import { location } from "@/types/types"

const fetchPlaceID = (coordinates: string) => fetch(process.env.GOOGLE_API! + '/geocode/json?' + new URLSearchParams({
    latlng: coordinates,
    result_type: 'tourist_attraction',
    key: process.env.GOOGLE_API_KEY!,
}),
    {
        method: 'get',
        cache: 'force-cache',
    }).then((res) => res.json())

const fetchPlaceDetail = (placeID: string) => fetch(process.env.GOOGLE_API! + '/place/details/json?' + new URLSearchParams({
    place_id: placeID,
    // result_type: 'tourist_attraction',
    fields: 'vicinity,name',
    key: process.env.GOOGLE_API_KEY!,
}), {
    method: 'get',
    cache: 'force-cache',
}).then((res) => res.json())

export default async function Exif({ url }: { url: string }): Promise<JSX.Element> {
    const buffer = await getImageBuffer(url)
    const exif = ExifParserFactory.create(buffer).parse()
    const exifTags = exif?.tags!
    let placeDetailRes = undefined
    let location: location

    if (exifTags?.GPSLatitude) {
        const coordinates = `${exifTags.GPSLatitude}, ${exifTags.GPSLongitude}`
        const placeIDRes = await fetchPlaceID(coordinates)
        if (placeIDRes.status === 'OK') {
            const placeID = placeIDRes?.results[0]?.place_id
            placeDetailRes = await fetchPlaceDetail(placeID)
            const city = placeDetailRes.result.vicinity.split(', ')[1]
            location = {
                placeName: placeDetailRes?.result?.name,
                city
            }
        } else {
            const address = placeIDRes?.plus_code?.compound_code
            const city = address.substring(8)
            location = {
                placeName: undefined,
                city
            }
        }
    }

    if (exifTags?.LensMake) {
        if (exifTags.LensMake === 'Apple') {
            return (
                <ExifDisplay exif={exifTags} type='phone' location={location} />
            )
        } else {
            return (
                <ExifDisplay exif={exifTags} type='camera' location={location} />
            )
        }
    } else {
        return (
            <ExifDisplay exif={exifTags} type='film' />
        )
    }
}