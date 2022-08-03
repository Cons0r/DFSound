import ytdl from 'ytdl-core'

const info = await ytdl.getInfo("https://youtu.be/dQw4w9WgXcQ")
console.log(ytdl.chooseFormat(info.formats, { quality: "highestaudio" }).url)