// Listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("Kiosk Browser Extension installed. Starting timer for 60 seconds.");
    // Start the session timer for 60 seconds
    chrome.alarms.create("closeKiosk", { delayInSeconds: 60 });
});

// Function to exit the kiosk mode
function exitKioskMode() {
    chrome.windows.getAll({ populate: true }, function(windows) {
        windows.forEach(window => {
            window.tabs.forEach(tab => {
                // Close each tab opened in the kiosk mode
                console.log(`Closing tab: ${tab.url}`);
                chrome.tabs.remove(tab.id);
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
