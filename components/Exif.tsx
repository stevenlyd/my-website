import {getImageBuffer} from "@/components/myFunctions";
import {ExifParserFactory} from "ts-exif-parser";
import ExifDisplay from "@/components/ExifDisplay";

export default async function Exif ({url}:{url:string}) {
    const buffer = await getImageBuffer(url)
    const exif = ExifParserFactory.create(buffer).parse()
    console.log(exif)
    return (
        <ExifDisplay exif={exif?.tags!}/>
    )
}