import SImage from "@/components/SImage";
import {API} from "@/public/variables";


export default function Gallery() {
    return (
        <SImage
            src={`${API}/files/tgyzgtr4jl9bqdf/yg8a7yjfx8ztont/crater_edge_2kkwcCRfem.jpg`}
            alt='gallery'
            transition={{
                transitionDuration: 800,
            }}
            style={{
                height: 'auto',
                width: 'auto',
                maxWidth: '100%',
                maxHeight: '75vh',
                margin: 'auto',
                justifySelf: 'center',
                boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
            }}
        />
    )
}