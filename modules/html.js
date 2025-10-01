(function () {
    const ID_CHAT_SIDEBAR = 'chat-sidebar';
    const ID_CHAT_OPEN_ICON = 'chat-open-icon';
    const ID_CHAT_COLLAPSE = 'chat-collapse';
    const ID_CHAT_INPUT = 'chat-input';
    const ID_CHAT_SEND = 'chat-send';
    const ID_CHAT_HISTORY = 'chat-history';
    const ID_TOGGLE_CONTEXT = 'toggle-page-context';
    const ID_CONTEXT_SELECT = 'context-format-select';

    const botIcon = "🤖";
    const title = "Browser Bot"

    const html = `
        <div id="${ID_CHAT_SIDEBAR}">
            <div class="chat-header">
                <span>${botIcon} ${title}</span>
                <button id="${ID_CHAT_COLLAPSE}">x</button>
            </div>
            <div class="toggle-wrapper">
                <label class="switch">
                    <input type="checkbox" id="${ID_TOGGLE_CONTEXT}">
                    <span class="slider"></span>
                </label>
                <span class="toggle-label">Include Page Context</span>
            </div>
            <div class="context-format-wrapper hidden">
                <label class="format-label">Format:</label>
                <select id="${ID_CONTEXT_SELECT}">
                    <option value="text">Plain Text</option>
                    <option value="html">Raw HTML</option>
                </select>
            </div>
            <div id="${ID_CHAT_HISTORY}"></div>
            <div class="chat-input-wrapper">
                <input type="text" id="${ID_CHAT_INPUT}" placeholder="Type your command..." autofocus />
                <button id="${ID_CHAT_SEND}">Send</button>
            </div>
        </div>
        <div id="${ID_CHAT_OPEN_ICON}">${botIcon}</div>
    `;

    window.HtmlTemplate = {
        html,
        ID_CHAT_SIDEBAR,
        ID_CHAT_OPEN_ICON,
        ID_CHAT_COLLAPSE,
        ID_CHAT_INPUT,
        ID_CHAT_SEND,
        ID_CHAT_HISTORY,
        ID_TOGGLE_CONTEXT,
        ID_CONTEXT_SELECT,
    };
})();
