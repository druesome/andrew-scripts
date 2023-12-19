// ==UserScript==
// @name         VaultPress Backup Download Links
// @namespace    vaultpress-backup-download-links
// @version      1.0
// @description  Adds links VaultPress backups
// @updateURL https://github.com/druesome/andrew-scripts/raw/main/vaultpress-backup-download-links.user.js
// @downloadURL https://github.com/druesome/andrew-scripts/raw/main/vaultpress-backup-download-links.user.js
// @author       druesome
// @match        https://mc.vaultpress.com/site/*/backup-browser
// ==/UserScript==

function addBackupLinks() {
  var parentNodeTitle = document.querySelector('.node__title[data-label]');
  if (parentNodeTitle) {
    var parentNodeValue = parentNodeTitle.getAttribute('data-label').split(' ')[0];

    var childNodeTitles = document.querySelectorAll('.node-contents .node__title[data-label]:not(.backup-link-added)');
    childNodeTitles.forEach(function(nodeTitle) {
      var childNodeValue = nodeTitle.getAttribute('data-label').split(' ')[0];
      var backupLink = 'https://dashboard.vaultpress.com/' + parentNodeValue + childNodeValue + '/';
      var downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', backupLink);
      downloadLink.textContent = 'Download backup';
      var hyphenText = document.createTextNode(' - ');

      // Insert the hyphen text node before the download link
      nodeTitle.insertAdjacentElement('afterend', downloadLink);
      downloadLink.parentNode.insertBefore(hyphenText, downloadLink);

      // Mark this node title as having a backup link added
      nodeTitle.classList.add('backup-link-added');
    });
  }
}

// Event listener for the "Show All" button
document.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Show All') {
    // Load more backups and re-add backup links after loading is done
    loadMoreBackups(addBackupLinks);
  }
});

// MutationObserver to detect when new nodes are added to the .node-contents element
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0) {
      // New nodes have been added, call addBackupLinks function
      addBackupLinks();
    }
  });
});

// Start observing the .node-contents element for changes
var targetNode = document.querySelector('.node-contents');
if (targetNode) {
  observer.observe(targetNode, { childList: true });
}

// Call addBackupLinks when the page loads to add links initially
addBackupLinks();
