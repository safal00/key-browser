// Listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("Kiosk Browser Extension installed. Starting timer for 1 minute.");
    // Start the session timer for 1 minute (60 seconds)
    chrome.alarms.create("closeKiosk", { delayInSeconds: 60 });
});

// Function to exit the kiosk mode
function exitKioskMode() {
    chrome.windows.getAll({ populate: true }, function (windows) {
        windows.forEach(window => {
            window.tabs.forEach(tab => {
                // Replace 'YOUR_APP_URL' with the actual URL of your app
                if (tab.url.includes('YOUR_APP_URL')) {
                    console.log(`Exiting kiosk mode for: ${tab.url}`);
                    chrome.tabs.update(tab.id, { url: 'chrome://quit' });
                }
            });
        });
    });
}

// Listener for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "closeKiosk") {
        console.log("Alarm triggered. Closing kiosk app.");
        exitKioskMode();  // Call the exit function
    }
});

// Optional: Add a listener for messages (like login)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "login") {
        console.log("Login action received. Starting session.");
        chrome.tabs.create({ url: 'app.html' });
    }
});
