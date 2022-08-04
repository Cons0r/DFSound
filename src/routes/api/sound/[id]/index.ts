import { db } from "$lib/db";

export async function GET({ params: { id } }) {
    const sound = await db.sound.findUnique({
        where: {
            id
        },
        select: {
            audiourl: true
        }
    })
    if(!sound) return { status: 400 }
    return {
        body: (await fetch(sound?.audiourl)).body
    }
}