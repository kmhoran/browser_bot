(function() {
    const styleText = `
        #chat-sidebar {
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

        .chat-header {
            background: linear-gradient(90deg, #000000, #001c1c);
            padding: 12px;
            color: #00ffff;
            font-size: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #00ffff;
        }

        #chat-history {
            flex: 1;
            padding: 12px;
            overflow-y: auto;
            color: #0ff;
            font-size: 14px;
        }

        .chat-message {
            margin-bottom: 12px;
        }

        .user-message {
            text-align: right;
            color: #00ff66;
        }

        .bot-message {
            text-align: left;
            color: #00ffff;
        }

        .bot-message.assistant {
            background: rgba(0, 255, 255, 0.05);
            border-left: 3px solid #0ff;
            padding: 8px 12px;
            margin-bottom: 10px;
            font-style: normal;
        }

        .bot-message.tool {
            background: rgba(0, 255, 255, 0.03);
            border-left: 3px solid #004d4d;
            padding: 9px 12px;
            margin-bottom: 8px;
            font-size: 12px;
            color: #66ffff;
            position: relative;
            font-family: 'Share Tech Mono', monospace;
        }

        .tool-toggle {
            position: absolute;
            top: 0px;
            right: 10px;
            cursor: pointer;
            color: #0ff;
            font-weight: bold;
            font-size: 12px;
            opacity: 0.6;
            transition: opacity 0.3s;
        }

        .tool-toggle:hover {
            opacity: 1;
        }

        @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
            90% { opacity: 0.6; }
        }

        .tool-content {
            max-height: 300px;
            overflow: auto;
            transition: max-height 0.3s ease;
            animation: flicker 1.5s infinite;
        }

        .tool-collapsed .tool-content {
            max-height: 0;
            overflow: hidden;
        }

        .chat-input-wrapper {
            display: flex;
            border-top: 2px solid #00ffff;
            background: rgba(0, 10, 20, 0.6);
            padding: 8px;
        }

        #chat-input {
            flex: 1;
            padding: 10px;
            background: #000;
            border: none;
            color: #0ff;
            font-size: 14px;
        }

        #chat-send {
            background: #00ffff;
            color: #000;
            border: none;
            padding: 8px 14px;
            cursor: pointer;
            font-weight: bold;
        }

        #chat-open-icon {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #00ffff;
            color: #000;
            padding: 12px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 9998;
            display: block;
            font-size: 20px;
            box-shadow: 0 0 10px #0ff;
        }

        .toggle-wrapper {
            display: flex;
            align-items: center;
            padding: 10px;
            background: #001818;
            border-bottom: 1px solid #0ff;
            color: #0ff;
            font-size: 12px;
        }

        .toggle-label {
            margin-left: 10px;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0;
            right: 0; bottom: 0;
            background-color: #333;
            border: 1px solid #0ff;
            transition: .4s;
            box-shadow: 0 0 5px #0ff;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: #0ff;
            transition: .4s;
        }

        input:checked + .slider {
            background-color: #0ff;
            box-shadow: 0 0 10px #0ff;
        }

        input:checked + .slider:before {
            transform: translateX(20px);
        }

        .context-format-wrapper {
            display: flex;
            align-items: center;
            padding: 8px 10px;
            background: #001818;
            border-bottom: 1px solid #0ff;
            font-size: 12px;
            color: #0ff;
            opacity: 1;
            max-height: 30px;
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .context-format-wrapper.hidden {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
            padding: 0;
            border: none;
        }

        .format-label {
            margin-right: 10px;
        }

        #context-format-select {
            background: #000;
            color: #0ff;
            border: 1px solid #0ff;
            padding: 2px 6px;
        }
    `;

    window.Styles = {
        getStyle: () => styleText
    };
})();
