// Function to apply or remove styles
function applyStyles(hide) {
    if (hide) {
        document.body.classList.add("hide-scores");
    } else {
        document.body.classList.remove("hide-scores");
    }
}

// Run when the page loads
chrome.storage.local.get("hideScores", (data) => {
    applyStyles(data.hideScores);
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "toggleStyles") {
        applyStyles(request.hide);
    }
});
