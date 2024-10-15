// Run this when the app is installed or started
chrome.runtime.onInstalled.addListener(() => {
  setAppTimer();
});

chrome.runtime.onStartup.addListener(() => {
  setAppTimer();
});

// Set an alarm to trigger after 10 seconds (0.1667 minutes)
function setAppTimer() {
  chrome.alarms.create('appCloseAlarm', {delayInMinutes: 0.5});  // Set the alarm for 10 seconds (0.1667 minutes)
}

// Listen for the alarm trigger to close the kiosk app
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'appCloseAlarm') {
    closeApp();  // Call the function to close the app
  }
});

// Function to close the kiosk app by closing all tabs
function closeApp() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.remove(tab.id);  // Close each tab (shuts down the kiosk app)
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "login") {
    chrome.storage.local.set({sessionActive: true}, () => {
      chrome.tabs.create({url: 'app.html'});  // Open the kiosk app with browser options
    });
  }
});
