// ==UserScript==
// @name         Dorman爬虫-Menu
// @namespace    https://github.com/lennon1124/YangTeng
// @version      2024.03.04
// @description  Crawler
// @author       Lennon
// @match        *://www.dormanproducts.com/gsearch.aspx?*
// @icon         https://www.dormanproducts.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function() {
        let param_amount = 393;

        // parameter
        let list_param = window.location.href.split('?')[1].split('&');
        let param_start;
        for(let i=0; i<list_param.length; i++) {
            if(list_param[i].startsWith('start=')) {
                param_start = parseInt(list_param[i].split('start=')[1]);
            }
        }

        window.scrollTo(0, document.body.scrollHeight);
        console.log('\n\n\n= = = = = = = = = = = = = = =');
        console.log('Crawler Log 1: Start');

        // array
        let array_data = new Array();
        let list_part = document.querySelectorAll('div.searchItems-img>a');
        for(let i=0; i<list_part.length; i++) {
            array_data[i] = {};
            array_data[i]['Page'] = param_start / 100 + 1;
            array_data[i]['No.'] = i + 1;
            array_data[i]['Url'] = 'https://www.dormanproducts.com/' + list_part[i].getAttribute('href').trim();
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
        blob_a.download = String(param_start / 100 + 1) + '.txt';
        blob_a.click();
        URL.revokeObjectURL(blob_url);
        console.log('Crawler Log 4: End');
        console.log('= = = = = = = = = = = = = = =\n\n\n');

        // next
        if(param_amount > param_start+100) {
            window.location.href = window.location.href.replace('&start='+String(param_start), '&start='+String(param_start+100));
        }
    }
})();