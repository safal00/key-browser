// Listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("Kiosk Browser Extension installed. Starting timer for 20 seconds.");
    // Start the session timer for 20 seconds
    chrome.alarms.create("closeKiosk", { delayInSeconds: 20 });
});

// Listener for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "closeKiosk") {
        console.log("Alarm triggered. Closing all tabs.");
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                console.log(`Closing tab: ${tab.url}`);
                chrome.tabs.remove(tab.id);  // Close each tab
            });
        });
    }
});

// Optional: Add a listener for messages (like login)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "login") {
        console.log("Login action received. Starting session.");
        chrome.tabs.create({ url: 'app.html' });
    }
});
