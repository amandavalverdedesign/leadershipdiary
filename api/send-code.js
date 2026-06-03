import { Resend } from 'resend';

// This pulls the key you just added to Vercel automatically
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { code } = request.body;
        
        // IMPORTANT: Use the verified email address you used to sign up for Resend
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', 
            to: '4153417416@txt.att.net',
            subject: 'Leadership Diary Security Code',
            text: `Your Leadership Diary security verification code is: ${code}`,
        });

        return response.status(200).json({ success: true, messageId: data.id });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
