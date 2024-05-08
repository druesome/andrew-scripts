// ==UserScript==
// @name         Atomic CLI Links
// @namespace    atomic-cli-links
// @version      1.2
// @description  Adds links to CLI, VPMC and Revert tools on Atomic sites in Zendesk.
// @updateURL	 https://github.com/druesome/andrew-scripts/raw/main/atomic-cli-links.user.js
// @downloadURL	 https://github.com/druesome/andrew-scripts/raw/main/atomic-cli-links.user.js
// @author       druesome
// @match        https://*.apps.zdusercontent.com/*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var $ = window.jQuery;

// Add links to CLI if site is Atomic

function addcliLinks() {
    $('.user__info_container .sites .site').each(function() {
        var $site = $(this);
        var $atomicSpan = $site.find('.atomic');
        if ($atomicSpan.length > 0 && !$site.hasClass('cliadded')) {
            $site.addClass('cliadded');
            var siteURL = 'https://' + $site.find('.site-domain').first().text();

            // Extract blog ID from Videos link
            var videosLink = $site.find('.site-links a[title="VideoPress files"]');
            var blogId = videosLink.attr('href').match(/blog=(\d+)/)[1];

            // Add link to Revert tool using extracted blog ID
            var revertLink = $('<a>').attr('href', 'https://mc.a8c.com/automated-transfer/revert.php?blog_id=' + blogId).attr('target', '_blank').text('Revert');
            var revertListItem = $('<li>').append(revertLink);
            $site.find('.site-links').append(revertListItem);

            // Add link to VPMC
            var vpmcLink = $('<a>').attr('href', 'https://mc.vaultpress.com/site/blog_id=' + blogId).attr('target', '_blank').text('VPMC');
            var vpmcListItem = $('<li>').append(vpmcLink);
            $site.find('.site-links').append(vpmcListItem);

            // Add link to CLI
            var cliLink = $('<a>').attr('href', siteURL + '/_cli').attr('target', '_blank').text('CLI');
            var cliListItem = $('<li>').append(cliLink);
            $site.find('.site-links').append(cliListItem);
        }
    });
}

// Loop until links are added
window.setInterval(function() {
    addcliLinks();
}, 1000);
