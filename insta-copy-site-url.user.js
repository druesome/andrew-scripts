// ==UserScript==
// @name         Insta-Copy Site URL
// @namespace    insta-copy-site-url
// @version      1.3
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
  span.site-domain {
  transition: all 0.3s;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background-color: #cfe88b;
  }
}

span.site-domain {
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
        $site.addClass('thisdone');

        // Find all instances of site-domain within the site
        var $siteDomains = $site.find('.site-domain');

        // Process each instance of site-domain
        $siteDomains.each(function(index) {
            var $siteDomain = $(this);
            var siteURL = $siteDomain.text();

                // If the site-domain is the first one, add the cpy_btn class and handle click event
                $siteDomain.addClass('cpy_btn');
                $siteDomain.on('click', function() {
                    copy_url(siteURL, $siteDomain);
                });

            // Set DARC span
            var $darcSpan = $siteDomain.next('.darc');

            // Remove the surrounding link
            $siteDomain.closest('a').contents().unwrap();

            // Build a new link around the DARC span and make it open in a new tab
            var $darcLink = $('<a>').attr('href', 'https://mc.a8c.com/tools/reportcard/domain/?domain=' + encodeURIComponent(siteURL)).attr('target', '_blank').append($darcSpan);
            $siteDomain.after($darcLink);
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
