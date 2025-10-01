(function() {
    async function startSession(backendUrl, profileSlug, userId) {
        const res = await fetch(`${backendUrl}/start_session/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                agent_profile: profileSlug,
                user_id: userId
            })
        });
        const raw = await res.text();
        let data;
        try {
            data = JSON.parse(raw);
            if (typeof data === "string") data = JSON.parse(data);
        } catch (e) {
            console.error("Failed to parse JSON in startSession:", e);
            throw e;
        }
        return data.session_id;
    }

    window.Session = {
        startSession
    };
})();
