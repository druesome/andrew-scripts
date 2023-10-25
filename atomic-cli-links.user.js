// ==UserScript==
// @name         Atomic CLI Links
// @namespace    atomic-cli-links
// @version      1.0
// @description  Adds links to CLI on Atomic sites in Zendesk.
// @updateURL	 https://github.com/druesome/andrew-scripts/raw/main/atomic-cli-links.user.js
// @downloadURL	 https://github.com/druesome/andrew-scripts/raw/main/atomic-cli-links.user.js
// @author       druesome
// @match        https://*.apps.zdusercontent.com/*
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

// Add links to CLI if site is Atomic

function addcliLinks() {
    $('.user__info_container .sites .site').each(function() {
        var $site = $(this);
        var $atomicSpan = $site.find('.atomic');
        if ($atomicSpan.length > 0 && !$site.hasClass('cliadded')) {
            $site.addClass('cliadded');
            var siteURL = 'https://' + $site.find('.primary-domain').text();
            var cliLink = $('<a>').attr('href', siteURL + '/_cli').attr('target', '_blank').text('CLI');
            $site.find('.site-links').append($('<li>').append(cliLink));
        }
    });
}

// Loop until links are added

window.setInterval(function() {
    addcliLinks();
}, 1000);

