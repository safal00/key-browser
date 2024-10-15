// Listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("Kiosk Browser Extension installed. Starting timer for 60 seconds.");
    // Start the session timer for 60 seconds
    chrome.alarms.create("closeKiosk", { delayInSeconds: 60 });
});

// Function to exit the kiosk mode
function exitKioskMode() {
    console.log("Exiting kiosk mode.");
    chrome.browserPrivate.kiosk.exit(); // Exit the kiosk mode
}

// Listener for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "closeKiosk") {
        console.log("Alarm triggered. Exiting kiosk mode.");
        exitKioskMode();  // Call the exit function
    }
});
