document.getElementById('send-button').addEventListener('click', async () => {
    const userMessage = document.getElementById('user-message').value;
    if (!userMessage) return;

    // Display user message
    const chatBox = document.getElementById('chat-box');
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'message user-message';
    userMessageElement.innerText = userMessage;
    chatBox.appendChild(userMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    document.getElementById('user-message').value = '';

    // Send message to the server
    try {
        const response = await fetch('http://localhost:5000/gemini/send-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ history: [], message: userMessage }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        // Display bot message
        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'message bot-message';
        botMessageElement.innerText = responseData;
        chatBox.appendChild(botMessageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
    }
});
