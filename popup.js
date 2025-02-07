document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("toggleStyles");

    // Check stored state
    chrome.storage.local.get("hideScores", (data) => {
        button.textContent = data.hideScores ? "Desactivar" : "Activar";
    });

    // Toggle button action
    button.addEventListener("click", () => {
        chrome.storage.local.get("hideScores", (data) => {
            const newState = !data.hideScores;
            chrome.storage.local.set({ hideScores: newState });

            // Update button text
            button.textContent = newState ? "Desactivar" : "Activar";

            // Notify content script to apply changes
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: toggleStyles,
                    args: [newState]
                });
            });
        });
    });
});

// Function injected into the webpage
function toggleStyles(enable) {
    if (enable) {
        document.body.classList.add("hide-scores");
    } else {
        document.body.classList.remove("hide-scores");
    }
}
