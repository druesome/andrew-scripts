// ==UserScript==
// @name         Plugin Compatibility Checker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Check for incompatible plugins
// @author       Druesome
// @match        https://mc.a8c.com/tools/reportcard/blog/?blog_id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const incompatiblePlugins = {
        'advanced-database-cleaner/advanced-database-cleaner.php': '"advanced-database-cleaner" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'advanced-database-cleaner/advanced-db-cleaner.php' : '"advanced-database-cleaner" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'advanced-reset-wp/advanced-reset-wp.php'          : '"advanced-reset-wp" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'advanced-wp-reset/advanced-wp-reset.php'          : '"advanced-wp-reset" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'backup/backup.php'                                : '"backup" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'better-wp-security/better-wp-security.php'        : '"better-wp-security" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'cf7-pipedrive-integration/class-cf7-pipedrive.php' : '"cf7-pipedrive-integration" has been deactivated, it interferes with site operation and is not supported on WordPress.com.',
        'database-browser/database-browser.php'            : '"database-browser" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'duplicator/duplicator.php'                        : '"duplicator" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'extended-wp-reset/extended-wp-reset.php'          : '"extended-wp-reset" has been deactivated, it interferes with site operation and is not supported on WordPress.com.',
        'file-manager-advanced/file_manager_advanced.php'  : '"file-manager-advanced" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'file-manager/file-manager.php'                    : '"file-manager" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'plugins-garbage-collector/plugins-garbage-collector.php' : '"plugins-garbage-collector" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'post-type-switcher/post-type-switcher.php'        : '"post-type-switcher" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'reset-wp/reset-wp.php'                            : '"reset-wp" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'reset/data_reset.php'                             : '"reset" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'secure-file-manager/secure-file-manager.php'      : '"secure-file-manager" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'ultimate-reset/ultimate-reset.php'                : '"ultimate-reset" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'ultimate-wp-reset/ultimate-wordpress-reset.php'   : '"ultimate-wp-reset" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'username-changer/username-changer.php'            : '"username-changer" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'username-updater/username-updater.php'            : '"username-updater" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'vamtam-offline-jetpack/vamtam-offline-jetpack.php' : '"vamtam-offline-jetpack" has been deactivated, an active Jetpack Connection is required for your site to operate properly on WordPress.com.',
        'wd-youtube/wd-youtube.php'                        : '"wd-youtube" has been deactivated, it interferes with site operation and is not supported on WordPress.com.',
        'wordpress-database-reset/wp-reset.php'            : '"wordpress-database-reset" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'wordpress-reset/wordpress-reset.php'              : '"wordpress-reset" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'wp-automatic/wp-automatic.php'                    : '"wp-automatic" has been deactivated, it interferes with site operation and is not supported on WordPress.com.',
        'wp-clone-by-wp-academy/wpclone.php'               : '"wp-clone-by-wp-academy" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'wp-config-file-editor/wp-config-file-editor.php'  : '"wp-config-file-editor" has been deactivated, it messes up data necessary to manage your site and is not supported on WordPress.com.',
        'wp-dbmanager/wp-dbmanager.php'                    : '"wp-dbmanager" has been deactivated, it messes up data necessary to manage your site and is not supported on WordPress.com.',
        'wp-file-manager/file_folder_manager.php'          : '"wp-file-manager" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'wp-phpmyadmin-extension/index.php'                : '"wp-phpmyadmin-extension" has been deactivated, it interferes with site operation. You can access phpMyAdmin under Settings > Hosting Config',
        'wp-prefix-changer/index.php'                      : '"wp-prefix-changer" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'wp-reset/wp-reset.php'                            : '"wp-reset" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'wp-uninstaller-by-azed/wp-uninstaller-by-azed.php' : '"wp-uninstaller-by-azed" is not supported on WordPress.com.',
        'wpmu-database-reset/wpmu-database-reset.php'      : '"wpmu-database-reset" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'wps-hide-login/wps-hide-login.php'                : '"wps-hide-login" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',
        'z-inventory-manager/z-inventory-manager.php'      : '"z-inventory-manager" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',

        // Backup.
        'backup-wd/backup-wd.php'                          : '"backup-wd" has been deactivated, WordPress.com handles managing your site backups for you.',
        'backupwordpress/backupwordpress.php'              : '"backupwordpress" has been deactivated, WordPress.com handles managing your site backups for you.',
        'backwpup/backwpup.php'                            : '"backwpup" has been deactivated, WordPress.com handles managing your site backups for you.',
        'jetpack-backup/jetpack-backup.php'                : '"jetpack-backup" has been deactivated, WordPress.com handles managing your site backups for you.',
        'wp-db-backup/wp-db-backup.php'                    : '"wp-db-backup" has been deactivated, WordPress.com handles managing your site backups for you.',

        // Caching/performance.
        'cache-enabler/cache-enabler.php'                  : '"cache-enabler" has been deactivated, WordPress.com automatically handles caching for your site.',
        'comet-cache/comet-cache.php'                      : '"comet-cache" has been deactivated, WordPress.com automatically handles caching for your site.',
        'hyper-cache/plugin.php'                           : '"hyper-cache" has been deactivated, WordPress.com automatically handles caching for your site.',
        'jch-optimize/jch-optimize.php'                    : '"jch-optimize" has been deactivated, WordPress.com automatically handles caching for your site.',
        'performance-lab/load.php'                         : '"performance-lab" has been deactivated, WordPress.com automatically handles caching and database optimization for your site.',
        'powered-cache/powered-cache.php'                  : '"powered-cache" has been deactivated, WordPress.com automatically handles caching for your site.',
        'quick-cache/quick-cache.php'                      : '"quick-cache" has been deactivated, WordPress.com automatically handles caching for your site.',
        'redis-cache/redis-cache.php'                      : '"redis-cache" has been deactivated, WordPress.com automatically handles caching for your site.',
        'sg-cachepress/sg-cachepress.php'                  : '"sg-cachepress" has been deactivated, WordPress.com automatically handles caching for your site.',
        'w3-total-cache/w3-total-cache.php'                : '"w3-total-cache" has been deactivated, WordPress.com automatically handles caching for your site.',
        'wp-cache/wp-cache.php'                            : '"wp-cache" has been deactivated, WordPress.com automatically handles caching for your site.',
        'wp-fastest-cache/wpFastestCache.php'              : '"wp-fastest-cache" has been deactivated, WordPress.com automatically handles caching for your site.',
        'wp-optimizer/wp-optizer.php'                      : '"wp-optimizer" has been deactivated, "performance" related plugins may break your site or cause issues and are not supported on WordPress.com.', // https://wp.me/p9F6qB-66o
        'wp-speed-of-light/wp-speed-of-light.php'          : '"wp-speed-of-light" has been deactivated, WordPress.com automatically handles caching for your site.',
        'wp-super-cache/wp-cache.php'                      : '"wp-super-cache" has been deactivated, WordPress.com automatically handles caching for your site.',

        // SQL heavy.
        'another-wordpress-classifieds-plugin/awpcp.php'   : '"another-wordpress-classifieds-plugin" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'broken-link-checker/broken-link-checker.php'      : '"broken-link-checker" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'leads/leads.php'                                  : '"leads" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'native-ads-adnow/adnow-widget.php'                : '"native-ads-now" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'ol_scrapes/ol_scrapes.php'                        : '"ol_scrapes" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'page-visit-counter/page-visit-counter.php'        : '"page-visit-counter" has been deactivated, plugins that insert or update the database on page load can cause severe performance issues for your site and are not supported.',
        'post-views-counter/post-views-counter.php'        : '"post-views-counter" has been deactivated, plugins that insert or update the database on page load can cause severe performance issues for your site and are not supported.',
        'tokenad/token-ad.php'                             : '"tokenad" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'top-10/top-10.php'                                : '"top-10" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'userpro/index.php'                                : '"userpro" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'wordpress-popular-posts/wordpress-popular-posts.php' : '"wordpress-popular-posts" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'wp-cerber/wp-cerber.php'                          : '"wp-cerber" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'wp-inject/wpinject.php'                           : '"wp-inject" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'wp-postviews/wp-postviews.php'                    : '"wp-postviews" has been deactivated, plugins that insert or update the database on page load can cause severe performance issues for your site and are not supported.',
        'wp-rss-aggregator/wp-rss-aggregator.php'          : '"wp-rss-aggregator" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'wp-rss-feed-to-post/wp-rss-feed-to-post.php'      : '"wp-rss-feed-to-post" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'wp-rss-wordai/wp-rss-wordai.php'                  : '"wp-rss-wordai" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'wp-session-manager/wp-session-manager.php'        : '"wp-session-manager" has been deactivated, it is known to cause severe database performance issues and is not supported.',
        'wp-slimstat/wp-slimstat.php'                      : '"wp-slimstat" has been deactivated, plugins that insert or update the database on page load can cause severe performance issues for your site and are not supported.',
        'wp-statistics/wp-statistics.php'                  : '"wp-statistics" has been deactivated, plugins that insert or update the database on page load can cause severe performance issues for your site and are not supported.',
        'wp-ulike/wp-ulike.php'                            : '"wp-ulike" has been deactivated, plugins that insert or update the database on page load can cause severe performance issues for your site and are not supported.',
        'WPRobot5/wprobot.php'                             : '"WPRobot5" has been deactivated, plugins that insert or update the database on page load can cause severe performance issues for your site and are not supported.',

        // Security.
        'antihacker/antihacker.php'                        : '"antihacker" has been deactivated, "security" related plugins may break your site or cause performance issues for your site and are not supported on WordPress.com.',
        'deactivate-xml-rpc-service/deactivate-xml-rpc-service.php' : '"deactivate-xml-rpc-service" has been deactivated, XML-RPC is required for your Jetpack Connection on WordPress.com.',
        'disable-xml-rpc-api/disable-xml-rpc-api.php'      : '"disable-xml-rpc-api" has been deactivated, XML-RPC is required for your Jetpack Connection on WordPress.com.',
        'disable-xml-rpc-fully/disable-xml-rpc-fully.php'  : '"disable-xml-rpc-fully" has been deactivated, XML-RPC is required for your Jetpack Connection on WordPress.com.',
        'disable-xml-rpc-unset-x-pingback/index.php'       : '"disable-xml-rpc-unset-x-pingback" has been deactivated, XML-RPC is required for your Jetpack Connection on WordPress.com.',
        'disable-xml-rpc/disable-xml-rpc.php'              : '"disable-xml-rpc" has been deactivated, XML-RPC is required for your Jetpack Connection on WordPress.com.',
        'manage-xml-rpc/manage-xml-rpc.php'                : '"manage-xml-rpc" has been deactivated, XML-RPC is required for your Jetpack Connection on WordPress.com.',
        'sg-security/sg-security.php'                      : '"sg-security" has been deactivated, "security" related plugins may break your site or cause performance issues for your site and are not supported on WordPress.com.',
        'simple-xml-rpc-disabler/simple-xml-rpc-disabler.php' : '"simple-xml-rpc-disabler" has been deactivated, XML-RPC is required for your Jetpack Connection on WordPress.com.',
        'stopbadbots/stopbadbots.php'                      : '"stopbadbots" has been deactivated, "security" related plugins may break your site or cause performance issues for your site and are not supported on WordPress.com.',
        'wee-remove-xmlrpc-methods/wee-remove-xmlrpc-methods.php' : '"wee-remove-xmlrpc-methods" has been deactivated, XML-RPC is required for your Jetpack Connection on WordPress.com.',
        'wordfence/wordfence.php'                          : '"wordfence" has been deactivated, "security" related plugins may break your site or cause performance issues for your site and are not supported on WordPress.com.',
        'wp-hide-security-enhancer/wp-hide.php'            : '"wp-hide-security-enhancer" has been deactivated, "security" related plugins may break your site or cause performance issues for your site and are not supported on WordPress.com.',
        'wp-security-hardening/wp-hardening.php'           : '"wp-security-hardening" has been deactivated. It breaks WordPress.com required plugins.', // https://wp.me/p9F6qB-66o
        'wp-simple-firewall/wp-simple-firewall.php'        : '"wp-simple-firewall" has been deactivated, it deletes data necessary to manage your site and is not supported on WordPress.com.',

        // Spam.
        'e-mail-broadcasting/e-mail-broadcasting.php'      : '"e-mail-broadcasting" has been deactivated, plugins that support sending e-mails in bulk are not supported on WordPress.com.',
        'mailit/mailit.php'                                : '"mailit" has been deactivated, plugins that support sending e-mails in bulk are not supported on WordPress.com.',
        'send-email-from-admin/send-email-from-admin.php'  : '"send-email-from-admin" has been deactivated, plugins that support sending e-mails in bulk are not supported on WordPress.com.',

        // Cloning/staging.
        'flo-launch/flo-launch.php'                        : 'Staging plugins delete data necessary to manage your site and are not supported on WordPress.com. flo-launch has been deactivated.',
        'wp-staging/wp-staging.php'                        : 'Staging plugins delete data necessary to manage your site and are not supported on WordPress.com. wp-staging has been deactivated.',

        // Misc.
        'adult-mass-photos-downloader/adult-mass-photos-downloader.php' : '"adult-mass-photos-downloader" is not supported on WordPress.com.',
        'adult-mass-videos-embedder/adult-mass-videos-embedder.php' : '"adult-mass-videos-embedder" is not supported on WordPress.com.',
        'ari-adminer/ari-adminer.php'                      : '"ari-adminer" is not supported on WordPress.com.',
        'automatic-video-posts'                            : '"automatic-video-posts" is not supported on WordPress.com.',
        'blogmatic-poster/index.php'                       : '"blogmatic-poster" is not supported on WordPress.com.',
        'blogmatic/index.php'                              : '"blogmatic" is not supported on WordPress.com.',
        'bwp-minify/bwp-minify.php'                        : '"bwp-minify" is not supported on WordPress.com.',
        'clearfy/clearfy.php'                              : '"clearfy" is not supported on WordPress.com.',
        'cornerstone/main.php'                             : '"cornerstone" is not supported on WordPress.com.',
        'cryptocurrency-pricing-list/cryptocurrency-pricing-list-and-ticker.php' : '"cryptocurrency-pricing-list" is not supported on WordPress.com.',
        'db-access-adminer/db-access-adminer.php'          : '"db-access-adminer" is not supported on WordPress.com.',
        'event-espresso-decaf/espresso.php'                : '"event-espresso-decaf" is not supported on WordPress.com.',
        'facetwp-manipulator/facetwp-manipulator.php'      : '"facetwp-manipulator" is not supported on WordPress.com.',
        'fast-velocity-minify/fvm.php'                     : '"fast-velocity-minify" is not supported on WordPress.com.',
        'nginx-helper/nginx-helper.php'                    : '"nginx-helper" is not supported on WordPress.com.',
        'p3/p3.php'                                        : '"p3" is not supported on WordPress.com.',
        'pexlechris-adminer/pexlechris-adminer.php'        : '"pexlechris-adminer" is not supported on WordPress.com.',
        'plugin-detective/plugin-detective.php'            : '"plugin-detective" is not supported on WordPress.com.',
        'porn-embed/Porn-Embed.php'                        : '"porn-embed" is not supported on WordPress.com.',
        'propellerads-official/propeller-ads.php'          : '"propellerads-official" is not supported on WordPress.com.',
        'really-simple-ssl/rlrsssl-really-simple-ssl.php'  : '"really-simple-ssl" is not supported on WordPress.com.',
        'speed-contact-bar/speed-contact-bar.php'          : '"speed-contact-bar" is not supported on WordPress.com.',
        'trafficzion/trafficzion.php'                      : '"trafficzion" is not supported on WordPress.com.',
        'tubeace/tubeace.php'                              : '"tubeace" is not supported on WordPress.com.',
        'unplug-jetpack/unplug-jetpack.php'                : '"unplug-jetpack" is not supported on WordPress.com.',
        'video-importer/video-importer.php'                : '"video-importer" is not supported on WordPress.com.',
        'woozone/plugin.php'                               : '"woozone" is not supported on WordPress.com.',
        'wp-cleanfix/index.php'                            : '"wp-cleanfix" is not supported on WordPress.com.',
        'wp-file-upload/wordpress_file_upload.php'         : '"wp-file-upload" is not supported on WordPress.com.',
        'wp-monero-miner-pro/monero-miner-pro.php'         : '"wp-monero-miner-pro" is not supported on WordPress.com.',
        'wp-monero-miner-using-coin-hive/wp-coin-hive.php' : '"wp-monero-miner-using-coin-hive" is not supported on WordPress.com.',
        'wp-optimize-by-xtraffic/wp-optimize-by-xtraffic.php' : '"wp-optimize-by-xtraffic" is not supported on WordPress.com.',
        'wpcom-migration/wpcom-migration.php'              : '"wpcom-migration" is not supported on WordPress.com.',
        'wpematico/wpematico.php'                          : '"wpematico" is not supported on WordPress.com.',
        'wpstagecoach/wpstagecoach.php'                    : '"wpstagecoach" is not supported on WordPress.com.', // https://wp.me/p9F6qB-66o
        'yuzo-related-post/yuzo_related_post.php'          : '"yuzo-related-post" is not supported on WordPress.com.',
        'zapp-proxy-server/zapp-proxy-server.php'          : '"zapp-proxy-server" is not supported on WordPress.com.',

        // CRM.
        'civicrm/civicrm.php'                              : '"civicrm" is not supported on WordPress.com.', // https://wp.me/p9F6qB-66o
    };

    window.addEventListener('load', function() {
        const pluginListDiv = document.querySelector('#site-info__plugins-list');
        if (pluginListDiv) {
            const tables = pluginListDiv.querySelectorAll('.reporttable-atomic');
            if (tables.length > 1) {
                const secondTable = tables[1];
                const rows = secondTable.querySelectorAll('tbody tr');
                const incompatiblePluginNames = []; // Array to hold names of incompatible plugins

                rows.forEach(row => {
                    const pluginNameCell = row.querySelector('td[id^="active-plugin"]');
                    if (pluginNameCell) {
                        let pluginId = decodeURIComponent(pluginNameCell.id.replace('active-plugin-', ''));
                        let pluginBaseName = pluginId.split('/')[0];

                        for (let key in incompatiblePlugins) {
                            if (key.startsWith(pluginBaseName + '/')) {
                                row.style.backgroundColor = '#FFC0CB'; // Highlight the row
                                // Add a red exclamation point
                                const warningIcon = document.createElement('span');
                                warningIcon.textContent = '⚠️';
                                warningIcon.style.color = 'red';
                                warningIcon.style.marginLeft = '5px';
                                pluginNameCell.appendChild(warningIcon);

                                incompatiblePluginNames.push(pluginBaseName); // Add only incompatible plugin name to array
                                break;
                            }
                        }
                    }
                });

                if (incompatiblePluginNames.length > 0) {
                    // Add a button to copy names of incompatible plugins to clipboard
                    const copyButton = document.createElement('button');
                    copyButton.textContent = `Copy Incompatible Plugins (${incompatiblePluginNames.length})`; // Update button text with count
                    copyButton.style.marginTop = '10px';
                    copyButton.onclick = function() {
                        navigator.clipboard.writeText(incompatiblePluginNames.join('\n')).then(() => {
                            alert('Incompatible plugins copied to clipboard!');
                        }, () => {
                            alert('Failed to copy text to clipboard');
                        });
                    };
                    pluginListDiv.appendChild(copyButton);
                } else {
                    // Display a message indicating no incompatible plugins were found
                    const noIncompatibilityMsg = document.createElement('p');
                    noIncompatibilityMsg.textContent = 'No incompatible plugins found.';
                    noIncompatibilityMsg.style.marginTop = '10px';
                    pluginListDiv.appendChild(noIncompatibilityMsg);
                }
            }
        }
    });
})();