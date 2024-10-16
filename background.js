let logoutTimer;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
          chrome.tabs.update(tab.id, {url: 'logout.html'});
        });
      });
    }, 60000); // 1 minute
    console.log("Timer started");
  }
});
