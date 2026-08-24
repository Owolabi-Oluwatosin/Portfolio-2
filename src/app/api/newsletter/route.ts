import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY
const resend = new Resend(apiKey);

export async function POST(req: Request) {




  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }
    // const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }
    // const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, unsubscribed: false }),
    // })
    const res = await resend.contacts.create({
      email: `${email}`,
      unsubscribed: false,
    });

    console.log("res from resend:", res)

    // if (!res.ok) {
    //   const body = await res.json().catch(() => ({}))
    //   return NextResponse.json(
    //     { error: body.message || 'Failed to subscribe. Please try again.' },
    //     { status: res.status }
    //   )
    // }

    return NextResponse.json({ message: 'Subscribed successfully.'})
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
