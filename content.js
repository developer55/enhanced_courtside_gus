// Function to apply or remove styles dynamically
function toggleCSS() {
    let styleTag = document.getElementById("hide-scores-style");

    if (styleTag) {
        styleTag.remove();
        return false; // Styles are now disabled
    } else {
        styleTag = document.createElement("style");
        styleTag.id = "hide-scores-style";
        styleTag.textContent = `
            .game-summary__teams { filter: blur(8px); }
            .game-summary__team-name, .game-summary__team-score { opacity: 0.6 !important; }
            .score-breakdown { filter: blur(8px); }
            .score-breakdown .is-bold { font-weight: 400 !important; }
            .game-rail-card__team-name, .game-rail-card__team-score { font-weight: 400 !important; }
            .game-rail-card__team-score { filter: blur(8px); }
            .game-rail-card__team--loser .game-rail-card__team-name { color: hsla(0,0%,100%,1) !important; }
            .game-rail-card__team--winner:after { border: transparent !important; }
        `;
        document.head.appendChild(styleTag);
        return true; // Styles are now enabled
    }
}

// Ensure styles are active by default when the page loads
window.addEventListener("load", () => {
    let styleTag = document.createElement("style");
    styleTag.id = "hide-scores-style";
    styleTag.textContent = `
            .game-summary__teams { filter: blur(8px); }
            .game-summary__team-name, .game-summary__team-score { opacity: 0.6 !important; }
            .score-breakdown { filter: blur(8px); }
            .score-breakdown .is-bold { font-weight: 400 !important; }
            .game-rail-card__team-name, .game-rail-card__team-score { font-weight: 400 !important; }
            .game-rail-card__team-score { filter: blur(8px); }
            .game-rail-card__team--loser .game-rail-card__team-name { color: hsla(0,0%,100%,1) !important; }
            .game-rail-card__team--winner:after { border: transparent !important; }
    `;
    document.head.appendChild(styleTag);
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "applyStyles") {
        const stylesApplied = toggleCSS();
        sendResponse({ stylesApplied });
    } else if (request.action === "checkStyles") {
        const styleTag = document.getElementById("hide-scores-style");
        sendResponse({ stylesApplied: !!styleTag });
    }
    return true; // Ensures response is sent asynchronously
});
