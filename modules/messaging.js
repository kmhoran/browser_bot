(function() {
    const ASSISTANT_ROLE = "ASSISTANT"
    const TOOL_ROLE = "TOOL";

    async function streamBotResponse(backendUrl, sessionId, query) {
        // Insert placeholder
        const tempLoadingMsgElem = UI.getNewLoadingMessage();
        
        // Animate placeholder
        const animationFrames = ["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"];
        let animIndex = 0;
        let isStreaming = true;

        function animatePlaceholder() {
            if (!isStreaming) return;
            tempLoadingMsgElem.innerText = "Thinking " + animationFrames[animIndex % animationFrames.length];
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
                handleBotMessage(chunk, tempLoadingMsgElem);
            }
        } catch (err) {
            console.error("Error while streaming:", err);
            handleBotMessage({
                    role: ASSISTANT_ROLE,
                    message: `⚠️ Error: ${err.message || "Failed to connect to bot."}`}
                ,tempLoadingMsgElem);
        }

        isStreaming = false;
        tempLoadingMsgElem.remove();
        scrollToBottom();
    }

    function handleBotMessage(data, tempLoadingMsgElem) {
        if (typeof data === "string") {
            data = JSON.parse(data)
        }

        if (data.role === ASSISTANT_ROLE) {
            const assistantMsg = UI.getNewBotMessage(data.message.trim());
            tempLoadingMsgElem.parentNode.insertBefore(assistantMsg, tempLoadingMsgElem);
        }
        if (data.role === TOOL_ROLE) {
            const toolMsg = UI.getNewToolMessage(data.message.trim())
            tempLoadingMsgElem.parentNode.insertBefore(toolMsg, tempLoadingMsgElem);
        }
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
