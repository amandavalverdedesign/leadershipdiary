import { Resend } from 'resend';

// Initialize the free Resend client using a secure environment variable
// Make sure you add RESEND_API_KEY to your Vercel project Environment Variables!
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { code } = request.body;

        if (!code) {
            return response.status(400).json({ error: 'Verification code is required' });
        }

        // Send the code to your AT&T SMS gateway
        const data = await resend.emails.send({
            from: 'verification@yourdomain.com', // Ensure this matches your verified sender domain in Resend
            to: '4153417416@txt.att.net',        // Your AT&T Gateway
            subject: 'Leadership Diary Security Code',
            text: `Your Leadership Diary security verification code is: ${code}`,
        });

        return response.status(200).json({ success: true, messageId: data.id });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
