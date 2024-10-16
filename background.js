console.log('Background script loaded');

let logoutTimer;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  if (message.action === "startTimer") {
    console.log('Starting timer');
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      console.log('Timer expired, redirecting to logout page');
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
          chrome.tabs.update(tab.id, {url: 'logout.html'});
        });
      });
    }, 60000); // 1 minute
    sendResponse({status: "Timer started"});
  }
  return true; // Keeps the message channel open for asynchronous response
});
