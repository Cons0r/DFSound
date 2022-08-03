import ytdl from 'youtube-dl-exec'
const output = await ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
    dumpJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    format: "bestaudio"
})
console.log(output.url)