import ytdl from 'youtube-dl-exec'

export async function GET({ params: { id } }: { params: { id: string } }) {
    const output = await ytdl(`https://youtu.be/${id}`, {
        dumpJson: true,
        noWarnings: true,
        callHome: false,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        format: "bestaudio"
    })

    return {
        body: (await fetch(output.url)).body
    }
}