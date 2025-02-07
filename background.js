chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleStyles") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "applyStyles" });
            }
        });
    }
});
