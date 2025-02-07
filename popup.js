document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("toggleStyles");
    button.textContent = "Desactivar"; // Assume styles are enabled on load

    // Toggle button action
    button.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "applyStyles" }, (response) => {
                    button.textContent = response && response.stylesApplied ? "Desactivar" : "Activar";
                });
            }
        });
    });
});
