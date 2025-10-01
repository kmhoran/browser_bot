(function() {
    const TEXT = "text";
    const HTML = "html";

    function getPageContextFormat() {
        // The select might not exist yet, so fallback
        const sel = document.getElementById(HtmlTemplate.ID_CONTEXT_SELECT);
        return sel?.value || TEXT;
    }

    function getPageContext() {
        const bodyClone = document.body.cloneNode(true);
        [
            `#${HtmlTemplate.ID_CHAT_SIDEBAR}`,
            `#${HtmlTemplate.ID_CHAT_OPEN_ICON}`]
        .forEach(sel => {
            const el = bodyClone.querySelector(sel);
            if (el) el.remove();
        });

        bodyClone.querySelectorAll('script, style, noscript').forEach(el => el.remove());

        const format = getPageContextFormat();
        if (format === HTML) {
            return bodyClone.innerHTML.slice(0, 10000);
        } else {
            return (bodyClone.innerText || '')
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 5000);
        }
    }

    window.PageContext = {
        TEXT_FORMAT: TEXT,
        HTML_FORMAT: HTML,
        getPageContextFormat,
        getPageContext
    };
})();
