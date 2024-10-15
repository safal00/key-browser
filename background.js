chrome.app.runtime.onLaunched.addListener(function() {
    // Launch your app window
    chrome.app.window.create('index.html', {
        'bounds': {
            'width': 1024,
            'height': 768
        }
    }, function(win) {
        // Start the countdown for 1 minute (60,000 milliseconds)
        setTimeout(function() {
            // Close the window after 1 minute
            win.close();

            // Optionally, log out the user if applicable (in kiosk mode)
            // chrome.runtime.reload() or chrome.runtime.exit() can be used depending on the setup
            chrome.runtime.reload();  // Restarts the app, essentially logging out
        }, 60000); // 60,000 milliseconds = 1 minute
    });
});
