// ==UserScript==
// @name         WPCOM Plan Links Generator
// @namespace    wpcom-plan-links-generator
// @version      1.0
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
  padding: 3px;
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
    { value: 'ecommerce-3-years', label: 'eCommerce 3-year' }
];

// Go through each site and add the dropdown

function addPlans() {
  $('.user__info_container .sites .site').each(function() {
    var siteURL = $(this).find('.primary-domain').text();
    if (!$(this).hasClass('plansadded')) {
      $(this).addClass('plansadded');
      var selectElement = $('<select name="wpcomplans" id="wpcomplans" form="wpcomplans"></select>');

      // Add "Select a plan" option
      var selectOption = $('<option disabled selected>Select a Plan</option>');
      selectElement.append(selectOption);

      var groupLabel = '';
      for (var i = 0; i < planOptions.length; i++) {
        if (planOptions[i].value === '') {
          groupLabel = planOptions[i].label;
          var optgroupElement = $('<optgroup label="' + groupLabel + '"></optgroup>');
          selectElement.append(optgroupElement);
        } else {
          var optionElement = $('<option value="' + planOptions[i].value + '">' + planOptions[i].label + '</option>');
          if (groupLabel !== '') {
            optgroupElement.append(optionElement);
          } else {
            selectElement.append(optionElement);
          }
        }
      }

      selectElement.on('change', function() {
        var selectedPlan = $(this).val();
        if (selectedPlan) {
          var checkoutURL = 'https://wordpress.com/checkout/' + siteURL + '/' + selectedPlan;
          copyToClipboard(checkoutURL);
          $(this).hide();
          $(this).after('<span class="copied-message">Copied</span>');
          setTimeout(function() {
            $('.copied-message').remove();
            selectElement.show();
          }, 2000);
        }
      });

      $(this).find('.site-links').append(selectElement);
    }
  });
}

// Copy plan URL to clipboard

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(function() {
            console.log('URL copied to clipboard:', text);
        })
        .catch(function(error) {
            console.error('Failed to copy URL to clipboard:', error);
        });
}

// Loop until we reach the last site

window.setInterval(function() {
    addPlans();
}, 1000);
