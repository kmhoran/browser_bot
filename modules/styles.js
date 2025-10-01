(function() {
    const styleText = `
    #${HtmlTemplate.ID_CHAT_SIDEBAR} {
      position: fixed;
      top: 0;
      right: 0;
      width: 360px;
      height: 100vh;
      background: rgba(0, 10, 20, 0.85);
      backdrop-filter: blur(12px);
      border-left: 2px solid #00ffff;
      border-right: 1px solid #004d4d;
      box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.3), 0 0 20px #0ff;
      font-family: 'Share Tech Mono', monospace;
      display: none;
      flex-direction: column;
      z-index: 9999;
    }
    `;

    window.Styles = {
        getStyle: () => styleText
    };
})();
