// ==UserScript==
// @name         Copy File URLs in File Tools
// @namespace    copy-urls-file-tools
// @version      1.2
// @description  Copies all file URLs in File Tools
// @updateURL	 https://github.com/druesome/andrew-scripts/raw/main/copy-urls-file-tools.user.js
// @downloadURL	 https://github.com/druesome/andrew-scripts/raw/main/copy-urls-file-tools.user.js
// @author       druesome
// @match        https://mc.a8c.com/file-tools/?fileaction=bloglist&blog=*&perpage=100
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    // Function to show a temporary notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#007bff'; // Bootstrap primary color
        notification.style.color = '#fff';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.transition = 'opacity 0.5s';
        notification.style.opacity = '1';

        document.body.appendChild(notification);

        // Fade out and remove the notification after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500); // Wait for fade out to complete
        }, 2000);
    }

    // Create a button element
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy File URLs';
    copyButton.style.display = 'block';
    copyButton.style.margin = '10px 0';
    copyButton.style.backgroundColor = '#007bff'; // Bootstrap primary color
    copyButton.style.color = '#fff';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '5px';
    copyButton.style.cursor = 'pointer';

    // Append the button below the h2 tag
    const h2Tag = document.querySelector('h2');
    if (h2Tag) {
        h2Tag.parentNode.insertBefore(copyButton, h2Tag.nextSibling);

        // Add click event to the button
        copyButton.addEventListener('click', function() {
            // Extract the base URL from the h2 tag
            const anchor = h2Tag.querySelector('a');
            if (anchor) {
                const baseUrl = anchor.href.replace('http://', 'http://').replace('www.', ''); // Ensure it's in the correct format
                const fileBaseUrl = baseUrl.replace('wordpress.com', 'files.wordpress.com');

                // Find all URLs in the table
                const table = document.querySelector('table'); // Adjust this selector if necessary
                if (table) {
                    const rows = table.querySelectorAll('tr');
                    let matchingUrls = [];

                    rows.forEach(row => {
                        const cells = row.querySelectorAll('td'); // Assuming URLs are in <td> elements
                        cells.forEach(cell => {
                            const links = cell.querySelectorAll('a'); // Find all links in the cell
                            links.forEach(link => {
                                const url = link.href;
                                if (url.startsWith(fileBaseUrl)) {
                                    matchingUrls.push(url);
                                }
                            });
                        });
                    });

                    // Copy matching URLs to clipboard
                    if (matchingUrls.length > 0) {
                        copyToClipboard(matchingUrls.join('\n'));
                        showNotification('Copied'); // Show copied notification
                    } else {
                        showNotification('Not copied'); // Show not copied notification
                    }
                } else {
                    showNotification('Not copied'); // Show not copied notification
                }
            } else {
                showNotification('Not copied'); // Show not copied notification
            }
        });
    } else {
        showNotification('Not copied'); // Show not copied notification
    }
})();