chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started');
});

chrome.alarms.create('checkSession', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkSession') {
    chrome.storage.local.get(['sessionStart'], function(result) {
      if (result.sessionStart) {
        const currentTime = Date.now();
        const sessionDuration = currentTime - result.sessionStart;
        console.log('Session duration:', sessionDuration / 1000, 'seconds');

        if (sessionDuration >= 60000) {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
              chrome.tabs.update(tabs[0].id, {url: 'logout.html'});
            }
          });
        }
      }
    });
  }
});
