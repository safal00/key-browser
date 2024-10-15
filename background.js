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

            // Log out the user or exit the app in kiosk mode
            chrome.runtime.exit();  // Completely exits the app
        }, 60000); // 60,000 milliseconds = 1 minute
    });
});
