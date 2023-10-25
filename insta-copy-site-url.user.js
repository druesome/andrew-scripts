// ==UserScript==
// @name         Insta-Copy Site URL
// @namespace    insta-copy-site-url
// @version      0.3
// @description  Instantly copies URL of user's sites in one click.
// @author       druesome
// @match        https://*.apps.zdusercontent.com/*
// @match        https://*.zendesk.com/agent/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==


GM_addStyle ( `
  span.primary-domain {
  transition: all 0.3s;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background-color: #cfe88b;
  }
}
` );

var $ = window.jQuery;

// Transform site URLs into clickable elements

function constructLinks() {
    $('.user__info_container .sites .site:not(.thisdone)').each(function() {
        var siteURL = $(this).find('.primary-domain').text();
        $(this).addClass('thisdone');
        var primaryDomain = $(this).find('.primary-domain');
        primaryDomain.addClass('cp_btn');
        primaryDomain.on('click', function() {
            copy_url(siteURL, primaryDomain);
        });
    });
}

// Copy the URL

async function copy_url(text, element) {
    try {
        await navigator.clipboard.writeText(text);
        element.text('Copied');
        setTimeout(function() {
            element.text(text);
        }, 2000);
        console.log('Text copied to clipboard');
    } catch (error) {
        console.error('Failed to copy text to clipboard:', error);
    }
}

// Loop until all links are done

window.setInterval(function(){
    constructLinks();
}, 1000);
