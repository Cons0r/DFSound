import type { GetSession, Handle } from '@sveltejs/kit'
import * as cookie from 'cookie'

import { db } from '$lib/db'

export const handle: Handle = async ({
  event,
  resolve,
}) => {
  const cookieHeader = event.request.headers.get('cookie')
  const cookies = cookie.parse(cookieHeader ?? '')

  if (!cookies.session) {
    return await resolve(event)
  }

  const session = await db.user.findUnique({
    where: { userAuthToken: cookies.session },
    select: {
        id: true,
        passwordHash: false,
        userAuthToken: true,
        plots: true,
        username: true
    }
  })

  if (session) {
    event.locals.user = session
  }

  return await resolve(event)
}

export const getSession: GetSession = ({ locals }) => {
    if (!locals.user) return {}
    const session = locals.user;
    delete session.userAuthToken
    return {
      user: session,
    }
  }