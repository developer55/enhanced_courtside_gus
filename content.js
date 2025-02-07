// Function to apply or remove styles dynamically
function toggleCSS(enable) {
    let styleTag = document.getElementById("hide-scores-style");

    if (enable) {
        if (!styleTag) {
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
        }
    } else {
        if (styleTag) {
            styleTag.remove();
        }
    }
}

// Apply styles on page load
chrome.storage.local.get("hideScores", (data) => {
    toggleCSS(data.hideScores);
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "applyStyles") {
        toggleCSS(request.hide);
    }
});
