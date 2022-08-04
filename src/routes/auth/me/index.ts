export async function GET({ locals }) {
    return {
        body: locals.user
    }
}