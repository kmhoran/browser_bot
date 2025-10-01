(function () {
    let backendUrl = '';
    let userId = '';
    const PROFILE_SLUG = "CHEF_SIMPLE_COMMAND";
    
    const HOTKEY = { ctrlKey: true, key: "\\" };

    let sessionId = null;

    async function init(backendUrlInput, userIdInput) {
        backendUrl = backendUrlInput;
        userId = userIdInput;
        UI.initializeSidebar(
            HtmlTemplate.html,
            Styles.getStyle(),
            {
                onCollapse: handleCollapse,
                onOpen: handleOpen,
                onSend: handleSend,
                onToggleContext: handleToggleContext,
                onHotkey: handleHotkey,
                onInit: async () => {
                    sessionId = await Session.startSession(backendUrl, PROFILE_SLUG, userId);
                }
            }
        );
    }

    function handleCollapse() {
        document.getElementById(HtmlTemplate.ID_CHAT_SIDEBAR).style.display = 'none';
        document.getElementById(HtmlTemplate.ID_CHAT_OPEN_ICON).style.display = 'block';
    }

    function handleOpen() {
        document.getElementById(HtmlTemplate.ID_CHAT_SIDEBAR).style.display = 'flex';
        document.getElementById(HtmlTemplate.ID_CHAT_OPEN_ICON).style.display = 'none';
    }

    async function handleSend() {
        const inputEl = document.getElementById(HtmlTemplate.ID_CHAT_INPUT);
        let query = inputEl.value.trim();
        if (!query) return;

        UI.appendUserMessage(query);
        inputEl.value = '';

        const includeContext = document.getElementById(HtmlTemplate.ID_TOGGLE_CONTEXT).checked;
        if (includeContext) {
            const fmt = PageContext.getPageContextFormat();
            const desc = fmt === PageContext.TEXT_FORMAT ? "Page content as text" : "Page content as html";
            query = `${query} :: ${desc}: ${PageContext.getPageContext()}`;
        }

        await Messaging.streamBotResponse(backendUrl, sessionId, query, UI.appendBotMessage);
    }

    function handleToggleContext(e) {
        const wrapper = document.querySelector('.context-format-wrapper');
        wrapper.classList.toggle('hidden', !e.target.checked);
    }

    function handleHotkey(e) {
        if (e.ctrlKey && e.key === HOTKEY.key) {
            e.preventDefault();
            const sidebar = document.getElementById(HtmlTemplate.ID_CHAT_SIDEBAR);
            const icon = document.getElementById(HtmlTemplate.ID_CHAT_OPEN_ICON);
            const isVisible = sidebar.style.display === 'flex';
            sidebar.style.display = isVisible ? 'none' : 'flex';
            icon.style.display = isVisible ? 'block' : 'none';
        }
    }

    window.Core = {
        init,
        backendUrl,
        userId
    };
})();
