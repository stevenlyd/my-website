export const getImageBuffer = async (url: string) => {
    const response = await fetch(url, {method: 'get', cache:'force-cache'})
    const blob = await response.blob()
    const arrayBuffer = await blob.slice(0, 65536).arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return buffer
}