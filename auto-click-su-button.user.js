// ==UserScript==
// @name         Auto-click SU Button
// @namespace    auto-click-su-button
// @version      0.1
// @description  Auto-clicks SU Button so you don't have to!
// @match     https://mc.a8c.com/tools/support-session/*
// @grant        none
// ==/UserScript==

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
		function(m, key, value) {
			vars[key] = value;
		});
	return vars;
}

function closeWindow(){
  window.close();
}

var params = getUrlVars();

if (!params.autostart_nonce) {
	var link = document.getElementById('support-session-start-link');

	link.click();

	setTimeout(closeWindow, 1000);
}



