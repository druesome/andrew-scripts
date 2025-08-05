// ==UserScript==
// @name         Site Profiles Network Admin and JPDB Links
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds Network Admin and JPDB links to the Site Profiles MC Tool.
// @author       Fusion
// @match        https://mc.a8c.com/site-profiles/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function processActionableItems() {
        const actionableItems = document.querySelectorAll('.actionable-items');

        actionableItems.forEach(item => {
            const rcLink = item.querySelector('a[href*="https://mc.a8c.com/tools/reportcard/blog/?blog_id="]');
            if (rcLink && !item.querySelector('a[href*="site-info.php?id="]')) { // Check if the links already exist
                const urlParams = new URLSearchParams(new URL(rcLink.href).search);
                const blogId = urlParams.get('blog_id');

                const siteInfoLink = document.createElement('a');
                siteInfoLink.href = `https://wordpress.com/wp-admin/network/site-info.php?id=${blogId}`;
                siteInfoLink.target = '_blank';
                siteInfoLink.textContent = ' NA'; // Set anchor text to "NA"

                // Add a separator before the new link
                const siteInfoSeparator = document.createElement('span');
                siteInfoSeparator.className = 'separator';
                siteInfoSeparator.textContent = '|';
                rcLink.parentNode.insertBefore(siteInfoSeparator, rcLink.nextSibling);

                // Insert the site info link after the RC link
                rcLink.parentNode.insertBefore(siteInfoLink, siteInfoSeparator.nextSibling);

                // Create the new link for JPDB
                const jpdbLink = document.createElement('a');
                jpdbLink.href = `https://jptools.wordpress.com/debug/?url=${blogId}`;
                jpdbLink.target = '_blank';
                jpdbLink.textContent = ' JPDB'; // Set anchor text to "JPDB"

                // Add a separator before JPDB link
                const jpdbSeparator = document.createElement('span');
                jpdbSeparator.className = 'separator';
                jpdbSeparator.textContent = '|';

                // Insert the JPDB link after the NA link
                rcLink.parentNode.insertBefore(jpdbSeparator, siteInfoLink.nextSibling);
                rcLink.parentNode.insertBefore(jpdbLink, jpdbSeparator.nextSibling);
            }
        });
    }

    // Initial processing of actionable-items
    processActionableItems();

    // Create a MutationObserver to watch for changes
    const observer = new MutationObserver(() => {
        processActionableItems(); // Reapply modifications when changes are detected
    });

    // Start observing the document body for child node changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();