import ytdl from 'ytdl-core'

function urlFromID(id: string) {
    return `https://youtu.be/${id}`
}

async function getVideoUrl(id: string) {
    const info = await ytdl.getInfo(urlFromID(id))
    const data = ytdl.chooseFormat(info.formats, { quality: "highestaudio" })
    return data.url
}

export async function GET({ params: { id } }: { params: { id: string } }) {
    return {
        body: (await fetch(await getVideoUrl(id))).body
    }
}