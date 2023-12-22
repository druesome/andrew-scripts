// ==UserScript==
// @name         Insta-Copy Site URL
// @namespace    insta-copy-site-url
// @version      1.2
// @description  Instantly copies URL of user's sites in one click.
// @updateURL	   https://github.com/druesome/andrew-scripts/raw/main/insta-copy-site-url.user.js
// @downloadURL	 https://github.com/druesome/andrew-scripts/raw/main/insta-copy-site-url.user.js
// @author       druesome
// @match        https://*.apps.zdusercontent.com/*
// @match        https://*.zendesk.com/agent/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==


GM_addStyle ( `
  span.cp_btn {
  transition: all 0.3s;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background-color: #cfe88b;
  }
}

span.cp_btn {
    font-style: normal;
    font-size: 13px;
    color: #222;
}
` );

var $ = window.jQuery;

// Transform site URLs into clickable elements

function constructLinks() {
    $('.user__info_container .sites .site:not(.thisdone)').each(function() {
        var $site = $(this);
        var siteURL = $site.find('.site-domain').first().text();
        $site.addClass('thisdone');
        var $siteDomain = $site.find('.site-domain').first();
        $siteDomain.addClass('cp_btn');
        $siteDomain.on('click', function() {
            copy_url(siteURL, $siteDomain);
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
