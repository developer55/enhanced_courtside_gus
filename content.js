// Function to create or retrieve the style tag
function getStyleTag() {
    let styleTag = document.getElementById("hide-scores-style");

    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "hide-scores-style";
        styleTag.textContent = getStyles();
        document.head.appendChild(styleTag);
    }

    return styleTag;
}

// Function to define the styles (maintain in one place) - GUS
function getStyles() {
    return `
        .game-summary__teams { filter: blur(8px); }
        .game-summary__team-name, .game-summary__team-score { opacity: 0.6 !important; }
        .score-breakdown { filter: blur(8px); }
        .score-breakdown .is-bold { font-weight: 400 !important; }
        .game-card-v2__team-name, .game-card-v2__team-score { font-weight: 400 !important; }
        .game-card-v2__team-score { filter: blur(8px); }
        .game-card-v2__team--loser .game-card-v2__team-name { color: hsla(0,0%,100%,1) !important; }
        .game-card-v2__team--winner:after { border: transparent !important; }
    `;
}

// Function to toggle styles dynamically
function toggleCSS() {
    let styleTag = document.getElementById("hide-scores-style");

    if (styleTag) {
        styleTag.remove();
        return false; // Styles are now disabled
    } else {
        getStyleTag();
        return true; // Styles are now enabled
    }
}

// Ensure styles are active by default when the page loads
window.addEventListener("load", () => {
    getStyleTag();
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "applyStyles") {
        const stylesApplied = toggleCSS();
        sendResponse({ stylesApplied });
    }
    return true; // Ensures response is sent asynchronously
});
