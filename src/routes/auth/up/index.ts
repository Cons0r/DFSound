import type { RequestHandler } from '@sveltejs/kit'
import * as bcrypt from 'bcrypt'
import * as cookie from 'cookie'

import { db } from '$lib/db'

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return {
      status: 400,
      body: {
        error: 'Something went horribly wrong.',
      },
    }
  }

  if (!username || !password) {
    return {
      status: 400,
      body: {
        error: 'Username and password is required.',
      },
    }
  }

  try {
    const user = await db.user.create({
      data: {
        username,
        passwordHash: await bcrypt.hash(password, 10),
      },
    })

    return {
      status: 200,
      body: { success: 'Success.' },
      headers: {
        'Set-Cookie': cookie.serialize(
          'session',
          user.userAuthToken,
          {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            // and serves to protect from CSRF
            // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',
            // only sent over HTTPS
            secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30,
          }
        ),
      }
    }
  } catch (error) {
    return {
      status: 400,
      body: {
        error: 'User already exists.',
      },
    }
  }
}
