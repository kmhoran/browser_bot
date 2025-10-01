
(function() {
    async function streamBotResponse(backendUrl, sessionId, query, uiAppendBot) {
        // Insert placeholder
        const botEl = uiAppendBot("");
        
        // Animate placeholder
        const animationFrames = ["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"];
        let animIndex = 0;
        let isStreaming = true;

        function animatePlaceholder() {
            if (!isStreaming) return;
            botEl.innerText = "Thinking " + animationFrames[animIndex % animationFrames.length];
            animIndex++;
            scrollToBottom();
            setTimeout(animatePlaceholder, 300);
        }
        animatePlaceholder();

        let fullText = "";
        try {
            const response = await fetch(`${backendUrl}/stream_response/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: sessionId, query })
            });
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullText += chunk;
            }
        } catch (err) {
            console.error("Error while streaming:", err);
            fullText = `⚠️ Error: ${err.message || "Failed to connect to bot."}`;
        }

        isStreaming = false;
        botEl.innerText = fullText.trim() || "[No response received]";
        scrollToBottom();
    }

    function scrollToBottom() {
        const chatHistory = document.getElementById(HtmlTemplate.ID_CHAT_HISTORY);
        if (!chatHistory) return;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    window.Messaging = {
        streamBotResponse
    };
})();
