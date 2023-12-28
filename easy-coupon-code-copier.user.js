// ==UserScript==
// @name         Easy Coupon Code Copier
// @namespace    easy-coupon-code-copier
// @version      1.3
// @description  Quickly copy coupon codes in Zendesk!
// @updateURL    https://github.com/druesome/andrew-scripts/raw/main/easy-coupon-code-copier.user.js
// @downloadURL  https://github.com/druesome/andrew-scripts/raw/main/easy-coupon-code-copier.user.js
// @author       druesome
// @match        https://*.apps.zdusercontent.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
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
`);

var $ = window.jQuery;

var monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

function fetchCouponCodes() {
  const cacheBuster = Date.now();
  const url = 'https://raw.githubusercontent.com/druesome/andrew-scripts/main/couponCodes.json' + '?cache=' + cacheBuster;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.codes)
    .catch(error => console.error('Failed to fetch coupon codes: ', error));
}

function isCouponExpired(expirationDate) {
  const now = new Date();
  const expiration = new Date(expirationDate);
  return now > expiration;
}

function addCouponLinks() {
  $('.user__info_container .actions').each(function (site) {
    if (!$(this).hasClass('itsadded')) {
      $(this).addClass('itsadded');

      // Add regular monthly coupon code
      var addRegularCoupon = function (couponCode, expirationDate) {
        var span = $('<span>');
        span.addClass('coupon-code');
        span.css('cursor', 'pointer');
        span.click(function () {
          if (!isCouponExpired(expirationDate)) {
            navigator.clipboard.writeText(couponCode)
              .then(function () {
                console.log('Coupon code copied to clipboard: ' + couponCode);
                span.text('Copied');
                setTimeout(function () {
                  span.text(couponCode);
                }, 2000);
              })
              .catch(function (error) {
                console.error('Failed to copy coupon code to clipboard: ', error);
              });
          }
        });

        if (isCouponExpired(expirationDate)) {
          span.text('Expired');
          span.addClass('no-coupon');
        } else {
          span.text(couponCode);
        }

        $('.user__info_container .actions').append(span);
      };

      // Add one-off coupon code
      var addOneOffCoupon = function (couponData) {
        var span = $('<span>');
        span.addClass('coupon-code');
        span.css('cursor', 'pointer');
        span.click(function () {
          if (!isCouponExpired(couponData.expiration)) {
            navigator.clipboard.writeText(couponData.code)
              .then(function () {
                console.log('One-off coupon code copied to clipboard: ' + couponData.code);
                span.text('Copied');
                setTimeout(function () {
                  span.text(couponData.code);
                }, 2000);
              })
              .catch(function (error) {
                console.error('Failed to copy one-off coupon code to clipboard: ', error);
              });
          }
        });

        if (isCouponExpired(couponData.expiration)) {
          span.text('Expired');
          span.addClass('no-coupon');
        } else {
          span.text(couponData.code);
        }

        $('.user__info_container .actions').append(span);
      };

      var currentMonth = new Date().getMonth() + 1;
      fetchCouponCodes().then(couponCodes => {
        var regularCouponCode = couponCodes[currentMonth.toString()];
        if (typeof regularCouponCode === 'string') {
          addRegularCoupon(regularCouponCode);
        } else {
          console.error('No regular coupon code found for the current month');
        }

        var oneOffCouponData = couponCodes['13'];
        if (oneOffCouponData && typeof oneOffCouponData === 'object') {
          addOneOffCoupon(oneOffCouponData);
        }
      });
    }
  });
}

// Loop until links are added
window.setInterval(function () {
  addCouponLinks();
}, 1000);
