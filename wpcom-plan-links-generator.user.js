// ==UserScript==
// @name         WPCOM Plan Links Generator
// @namespace    wpcom-plan-links-generator
// @version      1.3
// @description  Generate and copy plan links instantly.
// @updateURL	   https://github.com/druesome/andrew-scripts/raw/main/wpcom-plan-links-generator.user.js
// @downloadURL	 https://github.com/druesome/andrew-scripts/raw/main/wpcom-plan-links-generator.user.js
// @author       druesome
// @match        https://*.apps.zdusercontent.com/*
// @match        https://*.zendesk.com/agent/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==


GM_addStyle ( `
.copied-message {
  background-color: #cfe88b;
  padding: 5px;
  width: 50%;
  display: block;
}

select#wpcomplans {
  display: block;
}
` );

var $ = window.jQuery;

// Store plan details in some arrays

var planOptions = [
    { value: '', label: 'Monthly Subscriptions' },
    { value: 'personal-monthly', label: 'Personal monthly' },
    { value: 'premium-monthly', label: 'Premium monthly' },
    { value: 'business-monthly', label: 'Business monthly' },
    { value: 'ecommerce-monthly', label: 'eCommerce monthly' },
    { value: '', label: 'Yearly Subscriptions' },
    { value: 'personal', label: 'Personal yearly' },
    { value: 'premium', label: 'Premium yearly' },
    { value: 'business', label: 'Business yearly' },
    { value: 'ecommerce', label: 'eCommerce yearly' },
    { value: '', label: 'Two-Year Subscriptions' },
    { value: 'personal-2-years', label: 'Personal 2-year' },
    { value: 'premium-2-years', label: 'Premium 2-year' },
    { value: 'business-2-years', label: 'Business 2-year' },
    { value: 'ecommerce-2-years', label: 'eCommerce 2-year' },
    { value: '', label: 'Three-Year Subscriptions' },
    { value: 'personal-3-years', label: 'Personal 3-year' },
    { value: 'premium-3-years', label: 'Premium 3-year' },
    { value: 'business-3-years', label: 'Business 3-year' },
    { value: 'ecommerce-3-years', label: 'eCommerce 3-year' },
    { value: '', label: '100-Year Subscription' },
    { value: 'wp_bundle_hundred_year', label: '100-year plan' },
    { value: '', label: 'Woo Express Subscriptions' },
    { value: 'wooexpress-small-monthly', label: 'Woo Express: Essential monthly' },
    { value: 'wooexpress-small-yearly', label: 'Woo Express: Essential yearly' },
    { value: 'wooexpress-medium-monthly', label: 'Woo Express: Performance monthly' },
    { value: 'wooexpress-medium-yearly', label: 'Woo Express: Performance yearly' },
    { value: '', label: 'Add-on Subscriptions' },
    { value: 'site-redirect', label: 'Site Redirect'},
    { value: 'wordpress_com_1gb_space_addon_yearly:-q-50', label: '50 GB Upgrade'},
    { value: 'wordpress_com_1gb_space_addon_yearly:-q-100', label: '100 GB Upgrade'}
];

// Go through each site and add the dropdown

function addPlans() {
    $('.user__info_container .sites .site').each(function() {
        var $site = $(this); // Using $site for better readability
        var siteURL = $site.find('.site-domain').first().text(); // Get the site URL without 'https://'
        var jetpackSpan = $site.find('.jetpack');
        var isWooExpress = $site.find('.wooexpressessential, .wooexpressperformance').length > 0;
        var isWpcomPlan = $site.find('.personal, .premium, .business, .businesstrial, .ecommerce').length > 0;
        var isFree = $site.find('.free').length > 0;
        var isDomainOnly = $site.find('.domainonly').length > 0;

        if (!$site.hasClass('plansadded') && jetpackSpan.length === 0) {
            $site.addClass('plansadded');
            var selectElement = $('<select name="wpcomplans" id="wpcomplans" form="wpcomplans"></select>');

            var selectOption = $('<option disabled selected>Select a Plan</option>');
            selectElement.append(selectOption);

            var groupLabel = '';
            var optgroupElement;
            for (var i = 0; i < planOptions.length; i++) {
                if (planOptions[i].value === '') {
                    groupLabel = planOptions[i].label;
                    optgroupElement = $('<optgroup label="' + groupLabel + '"></optgroup>');
                } else {
                    if ((isFree || isDomainOnly) ||
                        (isWooExpress && planOptions[i].label.includes('Woo')) ||
                        (isWpcomPlan && !planOptions[i].label.includes('Woo'))) {
                        var optionElement = $('<option value="' + planOptions[i].value + '">' + planOptions[i].label + '</option>');
                        if (groupLabel !== '') {
                            optgroupElement.append(optionElement);
                        } else {
                            selectElement.append(optionElement);
                        }
                    }
                }
                if (optgroupElement && optgroupElement.children().length > 0) {
                    selectElement.append(optgroupElement);
                }
            }

            selectElement.on('change', function() {
                var selectedPlan = $(this).val();
                if (selectedPlan) {
                    var checkoutURL = 'https://wordpress.com/checkout/' + siteURL + '/' + selectedPlan;
                    copyToClipboard(checkoutURL);
                    $(this).next('.copied-message').remove(); // Remove previous message if present
                    $(this).after('<span class="copied-message">Copied</span>');
                    setTimeout(function() {
                        $('.copied-message').remove();
                    }, 2000);
                }
            });

            $site.find('.site-links').append(selectElement);
        }
    });
}



function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(function() {
            console.log('URL copied to clipboard:', text);
        })
        .catch(function(error) {
            console.error('Failed to copy URL to clipboard:', error);
        });
}

window.setInterval(function() {
    addPlans();
}, 1000);
