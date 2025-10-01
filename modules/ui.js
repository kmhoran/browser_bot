(function() {
    function initializeSidebar(htmlString, styleString, handlers) {
        const container = document.createElement('div');
        container.innerHTML = htmlString;
        document.body.appendChild(container);

        // Apply styles
        if (typeof GM_addStyle === 'function') {
            GM_addStyle(styleString);
        } else {
            // fallback: inject <style>
            const styleEl = document.createElement('style');
            styleEl.textContent = styleString;
            document.head.appendChild(styleEl);
        }

        // Wire UI handlers (passed in)
        document.getElementById(HtmlTemplate.ID_CHAT_COLLAPSE)
            .addEventListener('click', handlers.onCollapse);
        document.getElementById(HtmlTemplate.ID_CHAT_OPEN_ICON)
            .addEventListener('click', handlers.onOpen);
        document.getElementById(HtmlTemplate.ID_CHAT_SEND)
            .addEventListener('click', handlers.onSend);
        document.getElementById(HtmlTemplate.ID_CHAT_INPUT)
            .addEventListener('keypress', e => {
                if (e.key === 'Enter') handlers.onSend();
            });
        document.getElementById(HtmlTemplate.ID_TOGGLE_CONTEXT)
            .addEventListener('change', handlers.onToggleContext);
        document.addEventListener('keydown', handlers.onHotkey);

        // Start session after UI is ready
        handlers.onInit();
    }

    function appendUserMessage(message) {
        const div = document.createElement('div');
        div.className = `chat-message user-message`;
        div.innerText = message;
        document.getElementById(HtmlTemplate.ID_CHAT_HISTORY).appendChild(div);
        scrollToBottom();
    }

    function appendBotMessage(messageText) {
        const div = document.createElement('div');
        div.className = `chat-message bot-message`;
        div.innerText = messageText;
        document.getElementById(HtmlTemplate.ID_CHAT_HISTORY).appendChild(div);
        scrollToBottom();
        return div;
    }

    function appendToolMessage(content) {
        const message = document.createElement('div');
        message.className = "chat-message bot-message tool tool-collapsed";

        const toggle = document.createElement("div");
        toggle.className = "tool-toggle";
        toggle.innerText = "[+]";

        toggle.onclick = () => {
            message.classList.toggle("tool-collapsed");
            toggle.innerText = message.classList.contains("tool-collapsed") ? "[+]" : "[-]";
        };

        const toolContent = document.createElement("div");
        toolContent.className = "tool-content";
        toolContent.innerText = content;

        message.appendChild(toggle);
        message.appendChild(toolContent);

        document.querySelector(`#${HtmlTemplate.ID_CHAT_HISTORY}`).appendChild(message);
        scrollToBottom();
    }

    function scrollToBottom() {
        const chatHistory = document.getElementById(HtmlTemplate.ID_CHAT_HISTORY);
        if (!chatHistory) return;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    window.UI = {
        initializeSidebar,
        appendUserMessage,
        appendBotMessage,
        appendToolMessage
    };
})();
