export async function sendChatToGemini(messages) {
    try {
        const lastMessage = messages[messages.length - 1]?.content || '';
        console.log('DEBUG: Sending to backend:', { message: lastMessage });
        const res = await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: lastMessage }),
        });
        console.log("RES", res);

        if (!res.ok) {
            const error = await res.json();
            console.error('DEBUG: Backend error response:', error);
            throw new Error(error.message || 'Failed to get response from Gemini');
        }

        const data = await res.json();
        return data.reply;
    } catch (error) {
        console.error('[GeminiChatAPI] Error:', error);
        throw error;
    }
}
