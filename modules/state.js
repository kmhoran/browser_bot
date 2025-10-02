(function() {

    const UI_POSTURE = "UI_POSTURE";
    const uiPostureDefault = {
        collapsed: true,
        sendPageContext: false,
        pageContextFormat: PageContext.TEXT_FORMAT
    }

    function getUIPosture() {
        return JSON.parse(GM_getValue(UI_POSTURE, JSON.stringify(uiPostureDefault)))
    }
    function setUIPosture(update) {
        const currentPosture = getUIPosture();
        const mergedState = { ...update, ...currentPosture};
        GM_setValue(UI_POSTURE, JSON.stringify(mergedState))
    }

    window.AppState = {
        getUIPosture,
        setUIPosture
    };
})();