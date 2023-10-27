// ==UserScript==
// @name         Easy Coupon Code Copier
// @namespace    easy-coupon-code-copier
// @version      1.0
// @description  Lets you copy coupon codes in Zendesk
// @updateURL	   https://github.com/druesome/andrew-scripts/raw/main/easy-coupon-code-copier.user.js
// @downloadURL	 https://github.com/druesome/andrew-scripts/raw/main/easy-coupon-code-copier.user.js
// @author       druesome
// @match        https://*.apps.zdusercontent.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle ( `
  span.coupon-code {
  transition: all 0.3s;
  padding: 8px;
  background: #f7f7f7;
  border: 1px solid #ccc;

  &:hover {
    cursor: pointer;
    background-color: #cfe88b;
  }
}

  span.no-coupon {
  transition: all 0.3s;
  padding: 8px;
  background: #ffeeee;
  border: 1px solid #df808d;

  &:hover {
    cursor: pointer;
    background-color: #ffe0e4;
  }
}

div.actions {
margin-bottom: 20px;
}

` );

var $ = window.jQuery;

var couponCodes = {
    10: 'wphappyjz688', // October
    11: 'nocoupon', // November
    12: 'nocoupon', // December
    // ... add more coupon codes for each month
};

var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function addCouponLinks() {
    $('.user__info_container .actions').each(function(site) {
        if(!$(this).hasClass('itsadded')) {
            $(this).addClass('itsadded');
            var span = $('<span>');
            span.addClass('coupon-code');
            span.css('cursor', 'pointer');
            span.click(function() {
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth() + 1;
                var couponCode = couponCodes[currentMonth];
                if (couponCode) {
                    if (couponCode === 'nocoupon') {
                        var monthName = monthNames[currentMonth - 1];
                        span.text('No Coupon for ' + monthName);
                        span.addClass('no-coupon');
                    } else {
                        navigator.clipboard.writeText(couponCode)
                            .then(function() {
                                console.log('Coupon code copied to clipboard: ' + couponCode);
                                span.text('Copied');
                                setTimeout(function() {
                                    span.text(couponCode);
                                }, 2000);
                            })
                            .catch(function(error) {
                                console.error('Failed to copy coupon code to clipboard: ', error);
                            });
                    }
                } else {
                    console.error('No coupon code found for the current month');
                }
            });
            var currentMonth = new Date().getMonth() + 1;
            var couponCode = couponCodes[currentMonth];
            if (couponCode) {
                if (couponCode === 'nocoupon') {
                    var monthName = monthNames[currentMonth - 1];
                    span.text('No Coupon for ' + monthName);
                    span.addClass('no-coupon');
                } else {
                    span.text(couponCode);
                }
            } else {
                console.error('No coupon code found for the current month');
            }
            $('.user__info_container .actions').append(span);
        }
    });
}

// Loop until links are added
window.setInterval(function(){
    addCouponLinks();
}, 1000);
