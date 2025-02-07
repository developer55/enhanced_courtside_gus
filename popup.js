document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("toggleStyles");

    // Get stored state
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

            // Send message to content script to update styles
            chrome.runtime.sendMessage({ action: "toggleStyles", hide: newState });
        });
    });
});
