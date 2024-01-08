// ==UserScript==
// @name         TurbochargerPros爬虫-Menu
// @namespace    https://github.com/lennon1124/YangTeng
// @version      2024.01.08
// @description  Crawler
// @author       Lennon
// @match        *://www.turbochargerpros.com/search_result.asp?*
// @icon         https://www.turbochargerpros.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function() {
        window.scrollTo(0, document.body.scrollHeight);
        console.log('\n\n\n= = = = = = = = = = = = = = =');
        console.log('Crawler Log 1: Start');

        // array
        let array_data = new Array();
        let list_part = document.querySelectorAll('div.ss-image');
        for(let i=0; i<list_part.length; i++) {
            array_data[i] = {};
            array_data[i]['No.'] = i + 1;
            array_data[i]['Url'] = 'https:' + list_part[i].querySelector('a').getAttribute('href').trim();
        }
        console.log('Crawler Log 2: Array');

        // json
        let json_data = JSON.stringify(array_data);
        console.log('Crawler Log 3: Json');

        // blob
        let blob_data = new Blob([json_data], {type: 'text/plain'});
        let blob_url = URL.createObjectURL(blob_data);
        let blob_a = document.createElement('a');
        blob_a.href = blob_url;
        blob_a.download = window.location.href + '.txt';
        blob_a.click();
        URL.revokeObjectURL(blob_url);
        console.log('Crawler Log 4: End');
        console.log('= = = = = = = = = = = = = = =\n\n\n');

        // next
        window.location.href = document.querySelector('div[ng-if="pagination.next"]>a').getAttribute('href');
    }
})();