chrome.app.runtime.onLaunched.addListener(function() {
    // Launch your app window with specified dimensions
    chrome.app.window.create('index.html', {
        'bounds': {
            'width': 1024,
            'height': 768
        }
    }, function(win) {
        // Handle window close event
        win.onClosed.addListener(function() {
            // Perform any necessary cleanup before the window closes
            console.log('Window closed. Performing cleanup...');
            // Add cleanup code here if needed
        });

        // Start the countdown for 1 minute (60,000 milliseconds)
        setTimeout(function() {
            // Close the window and exit the app after 1 minute
            console.log('Exiting app after 1 minute...');
            win.close(); // Close the window
            chrome.runtime.exit();  // Completely exit the app
        }, 60000); // 60,000 milliseconds = 1 minute
    });
});
