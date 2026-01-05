import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Lazy initialize Resend client
let resendClient: Resend | null = null;
function getResend(): Resend {
    if (!resendClient) {
        resendClient = new Resend(process.env.RESEND_API_KEY);
    }
    return resendClient;
}

export async function POST(request: NextRequest) {
    try {
        const { email, studioName, userName } = await request.json();

        if (!email || !studioName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await getResend().emails.send({
            from: 'Dal AI <hello@dalaiweb.com>',
            to: email,
            subject: `🎉 Welcome to Dal AI, ${studioName}!`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <tr>
            <td align="center" style="padding-bottom: 32px;">
                <img src="https://dalaiweb.vercel.app/logo.png" alt="Dal AI" width="48" height="48" style="border-radius: 12px;">
            </td>
        </tr>
        <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%); border-radius: 24px; padding: 40px; border: 1px solid #2a2a3e;">
                <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 16px; text-align: center;">
                    Welcome to Dal AI! 🎉
                </h1>
                <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; margin: 0 0 24px; text-align: center;">
                    Your studio <strong style="color: #ffffff;">${studioName}</strong> is now live and ready for bookings.
                </p>
                
                <div style="background: #1a1a2e; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">Next Steps:</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 8px 0; color: #a0a0a0; font-size: 14px;">
                                <span style="color: #4A9FD4; font-weight: bold;">1.</span> Go to your dashboard to manage your studio
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #a0a0a0; font-size: 14px;">
                                <span style="color: #4A9FD4; font-weight: bold;">2.</span> Add your class schedule and pricing
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #a0a0a0; font-size: 14px;">
                                <span style="color: #4A9FD4; font-weight: bold;">3.</span> Share your studio link with clients
                            </td>
                        </tr>
                    </table>
                </div>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center">
                            <a href="https://dalaiweb.vercel.app/dashboard" style="display: inline-block; background: linear-gradient(135deg, #4A9FD4 0%, #63B3E4 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                                Go to Dashboard →
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding-top: 32px; text-align: center;">
                <p style="color: #666666; font-size: 12px; margin: 0;">
                    Questions? Reply to this email or visit <a href="https://dalaiweb.vercel.app" style="color: #4A9FD4;">dalaiweb.vercel.app</a>
                </p>
                <p style="color: #444444; font-size: 11px; margin: 16px 0 0;">
                    © 2026 Dal AI. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, messageId: data?.id });
    } catch (error: any) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send email' },
            { status: 500 }
        );
    }
}
