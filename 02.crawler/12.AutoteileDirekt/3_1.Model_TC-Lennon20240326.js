let dict_url = {"18": "https://www.autoteiledirekt.de/ajax/product/related-auto?productId=1362932&makerId=104", "45": "https://www.autoteiledirekt.de/ajax/product/related-auto?productId=7275104&makerId=121"};
let list_key = ["18", "45"];

console.log('总数量：' + String(list_key.length));

for(let i=0; i<list_key.length; i++) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', dict_url[list_key[i]], false);
    xhr.onload = function() {
        if(xhr.status == 200 && xhr.readyState == 4) {
            let blob_data = new Blob([xhr.response], {type: 'text/plain'});
            let blob_url = URL.createObjectURL(blob_data);
            let blob_a = document.createElement('a');
            blob_a.href = blob_url;
            blob_a.download = list_key[i] + '.txt';
            blob_a.click();
            URL.revokeObjectURL(blob_url);
        }
        console.log(xhr.readyState);
    };
    xhr.send();
}