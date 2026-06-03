import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
    // CORS headers allow your GitHub site to talk to Vercel
    response.setHeader('Access-Control-Allow-Origin', '*'); 
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') return response.status(200).end();

    try {
        const { code } = request.body;
        
        // This format captures Resend's internal, silent errors
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', 
            to: 'amandavalverde@cca.edu', // Must be your exact verified Resend email
            subject: 'Leadership Diary Security Code',
            text: `Your Leadership Diary security verification code is: ${code}`,
        });

        // If Resend blocked it, FORCE Vercel to show the error
        if (error) {
            return response.status(400).json({ error: error.message });
        }

        return response.status(200).json({ success: true, data });
    } catch (err) {
        return response.status(500).json({ error: err.message });
    }
}
