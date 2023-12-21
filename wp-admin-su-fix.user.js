// ==UserScript==
// @name         WP-Admin SU Fix
// @namespace    wp-admin-su-fix
// @namespace    http://wordpress.com/
// @version      0.2
// @description  Redirect to the WordPress admin panel link after SSO login
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
                GM_setValue('postSSORedirect', targetUrl);
                console.log('Tampermonkey Storage - Saved Redirect URL:', GM_getValue('postSSORedirect'));
                window.location.href = targetUrl;
            });
        });
    }

function handleAdditionalLinks() {
    var additionalLinks = document.querySelectorAll('a[href*="/post/"], a[href*="/page/"]');
    console.log('Found ' + additionalLinks.length + ' additional links.');

    additionalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetUrl = "https://wordpress.com" + this.getAttribute('href');
            console.log('Additional link clicked. Target URL:', targetUrl);
            GM_setValue('postSSORedirect', targetUrl);
            console.log('Tampermonkey Storage - Saved Redirect URL:', GM_getValue('postSSORedirect'));
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
                GM_setValue('postSSORedirect', null);
                window.location.href = postSSORedirect;
            }
        } else {
            handleAdminLinks();
            handleAdditionalLinks();
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                        handleAdminLinks();
                        handleAdditionalLinks();
                    }
                });
            });

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
