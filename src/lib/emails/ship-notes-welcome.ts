// lib/emails/ship-notes-welcome.ts
import { SITE } from "@/lib/seo";

export function shipNotesWelcomeHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>Ship notes — subscription confirmed</title>
<style>
  /* Progressive enhancement — ignored by strict clients, honored by the rest */
  body { margin: 0; padding: 0; width: 100% !important; }
  a { text-decoration: none; }
  .link:hover { color: #E9B949 !important; }
  .cta:hover { border-color: #E9B949 !important; color: #E9B949 !important; }
  @media (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .h1 { font-size: 28px !important; line-height: 34px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#09090B;">

  <!-- Preheader: shows in the inbox preview, hidden in the body -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#09090B; font-size:1px; line-height:1px;">
    You're subscribed to Ship notes — the occasional dispatch from the codebase.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#09090B;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#0F0F12; border:1px solid #242428; border-radius:14px; overflow:hidden;">

          <!-- Top bar -->
          <tr>
            <td class="px" style="padding:22px 40px; border-bottom:1px solid #1D1D21;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:10px;">
                          <img src="${SITE.url}/icon.png" width="28" height="28" alt="Daniel Owolabi" style="display:block; width:28px; height:28px; border-radius:50%; border:1px solid #242428;">
                        </td>
                        <td style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:14px; color:#ECECEC; letter-spacing:0.2px;">
                          Daniel&nbsp;Owolabi<span style="color:#E9B949;">.</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:12px; color:#6C6C74;">
                    // ship&nbsp;notes
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="px" style="padding:44px 40px 8px 40px;">
              <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:12px; color:#E9B949; letter-spacing:1px; text-transform:uppercase; margin-bottom:18px;">
                // subscription confirmed
              </div>
              <h1 class="h1" style="margin:0 0 18px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:34px; line-height:40px; font-weight:700; color:#F5F5F5; letter-spacing:-0.5px;">
                You're on the list.
              </h1>
              <p style="margin:0 0 18px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:16px; line-height:26px; color:#B4B4BC;">
                Thanks for subscribing to <strong style="color:#ECECEC; font-weight:600;">Ship notes</strong>. It's where I write up what I'm actually building — the bugs that reached production, the architecture calls, and the lessons that come out of shipping real systems.
              </p>
              <p style="margin:0 0 8px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:16px; line-height:26px; color:#B4B4BC;">
                No fixed cadence, no filler. It goes out when there's something worth sending.
              </p>
            </td>
          </tr>

          <!-- What to expect -->
          <tr>
            <td class="px" style="padding:20px 40px 8px 40px;">
              <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:12px; color:#6C6C74; letter-spacing:1px; text-transform:uppercase; margin-bottom:16px;">
                // what lands in your inbox
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="24" valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:24px; color:#E9B949;">✦</td>
                  <td valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:24px; color:#B4B4BC; padding-bottom:14px;">
                    <strong style="color:#ECECEC; font-weight:600;">Postmortems</strong> from real systems — like the Prisma Decimal NaN bug that reached production.
                  </td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:24px; color:#E9B949;">✦</td>
                  <td valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:24px; color:#B4B4BC; padding-bottom:14px;">
                    <strong style="color:#ECECEC; font-weight:600;">Architecture notes</strong> — what a real-time betting backend actually needs, and why.
                  </td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:24px; color:#E9B949;">✦</td>
                  <td valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:24px; color:#B4B4BC;">
                    <strong style="color:#ECECEC; font-weight:600;">Ship notes</strong> — what's in progress, and what just went live.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td class="px" style="padding:28px 40px;">
              <div style="height:1px; background-color:#1D1D21; line-height:1px; font-size:1px;">&nbsp;</div>
            </td>
          </tr>

          <!-- Secondary actions -->
          <tr>
            <td class="px" style="padding:0 40px 8px 40px;">
              <p style="margin:0 0 16px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:24px; color:#87878F;">
                While you're here —
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a class="cta" href="https://www.danielood.com/blog" style="display:inline-block; font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:13px; color:#ECECEC; border:1px solid #33333A; border-radius:8px; padding:11px 18px;">
                      Read the latest posts&nbsp;→
                    </a>
                  </td>
                  <td>
                    <a class="cta" href="https://cal.com/danielcoding/15min" style="display:inline-block; font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:13px; color:#ECECEC; border:1px solid #33333A; border-radius:8px; padding:11px 18px;">
                      Book a 15-min call&nbsp;→
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td class="px" style="padding:32px 40px 40px 40px;">
              <p style="margin:0 0 4px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:16px; line-height:24px; color:#ECECEC;">
                — Daniel Owolabi
              </p>
              <p style="margin:0; font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:12px; line-height:18px; color:#6C6C74;">
                Senior Full-Stack Engineer · Real-time · Fintech · AI
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="px" style="padding:24px 40px; background-color:#0B0B0D; border-top:1px solid #1D1D21;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                <tr>
                  <td style="padding-right:18px;"><a class="link" href="https://www.linkedin.com/in/owolabi-oluwatosin/" style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:12px; color:#87878F;">LinkedIn</a></td>
                  <td style="padding-right:18px;"><a class="link" href="https://x.com/oluwatosiny2k" style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:12px; color:#87878F;">X</a></td>
                  <td style="padding-right:18px;"><a class="link" href="https://github.com/Owolabi-Oluwatosin" style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:12px; color:#87878F;">GitHub</a></td>
                  <td><a class="link" href="https://www.upwork.com/freelancers/~017f49e3fd7ac7a273" style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace; font-size:12px; color:#87878F;">Upwork</a></td>
                </tr>
              </table>
              <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:12px; line-height:19px; color:#5A5A62;">
                You're receiving this because you subscribed at
                <a class="link" href="https://www.danielood.com" style="color:#87878F;">danielood.com</a>.
                <br>
                <a class="link" href="{{unsubscribe}}" style="color:#5A5A62; text-decoration:underline;">Unsubscribe</a> anytime — no hard feelings.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`; // the full HTML here
}