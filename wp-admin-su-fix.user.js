// ==UserScript==
// @name         WP-Admin SU Fix
// @namespace    wp-admin-su-fix
// @namespace    http://wordpress.com/
// @version      0.1
// @description  Redirect to the WordPress admin page after SSO login based on clicked link
// @updateURL	 https://github.com/druesome/andrew-scripts/raw/main/wp-admin-su-fix.user.js
// @downloadURL	 https://github.com/druesome/andrew-scripts/raw/main/wp-admin-su-fix.user.js
// @author       druesome
// @match        https://wordpress.com/*
// @match        https://*/wp-admin/
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// ==/UserScript==

(function() {
    console.log('Script started.');

    function isAdminPage() {
        return document.body.classList.contains('wp-admin');
    }

    function handleAdminLinks() {
        var adminLinks = document.querySelectorAll('a[href*="/wp-admin/"]');
        console.log('Found ' + adminLinks.length + ' admin links.');

        adminLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var targetUrl = this.getAttribute('href');
                console.log('Admin link clicked. Target URL:', targetUrl);
                // Set the URL in Tampermonkey's storage
                GM_setValue('postSSORedirect', targetUrl);
                // Log the value to confirm it's been set
                console.log('Tampermonkey Storage - Saved Redirect URL:', GM_getValue('postSSORedirect'));

                // Redirect to the clicked URL
                window.location.href = targetUrl;
            });
        });
    }

    function onDomContentLoaded() {
        console.log('DOM fully loaded.');

        if (isAdminPage()) {
            console.log('We are on an admin page.');
            const postSSORedirect = GM_getValue('postSSORedirect');
            console.log('Saved Redirect URL:', postSSORedirect);
            if (postSSORedirect) {
                console.log('Redirecting to saved URL.');
                GM_setValue('postSSORedirect', null); // Clear the stored URL
                window.location.href = postSSORedirect;
            }
        } else {
            handleAdminLinks();
            // Set up a MutationObserver to watch for changes in the DOM
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                        // Re-run the handleAdminLinks function to catch any new admin links
                        handleAdminLinks();
                    }
                });
            });

            // Start observing the body for added nodes
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDomContentLoaded);
    } else {
        onDomContentLoaded();
    }
})();
