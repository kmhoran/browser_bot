# BrowserBot

BrowserBot is a collapsible, retro-styled chat UI injected via Tampermonkey. It connects to a backend API and can include current page content as context.

## Features

- Toggleable sidebar chatbot
- Hotkey activation (`Ctrl + \`)
- Streamed responses from a backend
- Optional inclusion of page text or HTML
- Modular script structure

## Usage

- Press `Ctrl + \` to toggle the sidebar
- Type your query and press Enter or click Send
- Use the switch to include page content
    - Select text or HTML format as needed

## Installation

### 1. Install Tampermonkey

Install Tampermonkey for your browser:

- [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

### 2. Create a New Script

1. Open Tampermonkey Dashboard
2. Click "Create a new script"
4. Include required modules via `@require`:

```js
// ==UserScript==
// @name         BrowserBot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Implementation of browser_bot (https://github.com/kmhoran/browser_bot/tree/main)
// @author       kmhoran
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-end

// @require      https://raw.githubusercontent.com/kmhoran/browser_bot/refs/heads/main/modules/core.js
// @require      https://raw.githubusercontent.com/kmhoran/browser_bot/refs/heads/main/modules/html.js
// @require      https://raw.githubusercontent.com/kmhoran/browser_bot/refs/heads/main/modules/messaging.js
// @require      https://raw.githubusercontent.com/kmhoran/browser_bot/refs/heads/main/modules/pageContext.js
// @require      https://raw.githubusercontent.com/kmhoran/browser_bot/refs/heads/main/modules/session.js
// @require      https://raw.githubusercontent.com/kmhoran/browser_bot/refs/heads/main/modules/styles.js
// @require      https://raw.githubusercontent.com/kmhoran/browser_bot/refs/heads/main/modules/ui.js
// @require      https://raw.githubusercontent.com/kmhoran/browser_bot/refs/heads/main/modules/state.js
// ==/UserScript==

(function () {
    'use strict';
    const BACKEND_URL = "<your url>";
    const USER_ID = "<user id>";
    Core.init(BACKEND_URL, USER_ID);
})();

```


## Backend API

This browser tool relies on a backend api to handle queries to and responses from the LLM API.

The API should respect the following API contracts:

### POST `/start_session/`

**Request**
``` json
{
  "agent_profile": string,
  "user_id": string
}
```

**Response**
``` json
{
  "session_id": string
}
```

### POST `/stream_response/`

**Request**
``` json
{
  "session_id": string,
  "query": string
}
```

**Response**
Text streamed via HTTP chunked encoding.
