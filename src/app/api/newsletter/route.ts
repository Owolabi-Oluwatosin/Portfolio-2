import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { shipNotesWelcomeHtml } from '@/lib/emails/ship-notes-welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

const audienceId = process.env.RESEND_AUDIENCE_ID
const apiKey = process.env.RESEND_API_KEY

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }
    
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    if (!audienceId) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    const { data, error } = await resend.contacts.get({
      email,
      audienceId,
    });
    //console.log("verify if email exist:", data)
    if (data?.email === email) {
      return NextResponse.json(
        { code: 'ALREADY_SUBSCRIBED', message: "You're already subscribed." },
        { status: 200 }
      )
    } else {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });

      if(res.ok && res.status === 201){
        await resend.emails.send({
          from: 'Daniel Owolabi <ship@updates.danielood.com>',
          to: email,
          subject: "You're on the list — Ship notes",
          html: shipNotesWelcomeHtml(),
        });

        return NextResponse.json({ message: 'Subscribed successfully.'})
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        return NextResponse.json(
          { error: body.message || 'Failed to subscribe. Please try again.' },
          { status: res.status }
        )
      }
    }
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
