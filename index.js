document.getElementById('sendButton').addEventListener('click', async () => {
    await handleSendMessage();
});

document.getElementById('userInput').addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        await handleSendMessage();
    }
});

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

async function handleSendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) return;

    addMessageToChat(userInput, 'user-message');
    document.getElementById('userInput').value = ''; // Clear the input box

    try {
        const response = await sendMessageToServer(userInput);
        addMessageToChat(response, 'bot-message');
    } catch (error) {
        console.error('Error sending message:', error);
        addMessageToChat('Error: Unable to get a response from the server.', 'bot-message');
    }
}

function addMessageToChat(message, className) {
    const chatBody = document.getElementById('chatBody');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom of the chat
}

async function sendMessageToServer(message) {
    try {
        const response = await fetch('http://localhost:5000/gemini/send-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ history: [], message: message })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in sendMessageToServer:', error);
        throw error;
    }
}
