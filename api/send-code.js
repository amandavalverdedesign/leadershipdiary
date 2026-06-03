import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
    // These headers allow your GitHub site to talk to your Vercel backend
    response.setHeader('Access-Control-Allow-Origin', '*'); 
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') return response.status(200).end();

    if (request.method !== 'POST') return response.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { code } = request.body;
        // Use the email address you registered with Resend here for testing!
        await resend.emails.send({
            from: 'onboarding@resend.dev', 
            to: 'amandavalverde@cca.edu', 
            subject: 'Leadership Diary Security Code',
            text: `Your Leadership Diary security verification code is: ${code}`,
        });

        return response.status(200).json({ success: true });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
