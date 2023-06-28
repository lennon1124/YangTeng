# 爬虫任务 - 2023.06.28（临时指北）
## 1. 常见爬虫
### 1.0. 篡改猴
- [Tampermonkey](https://www.tampermonkey.net/)

### 1.1. `JavaScript`
- [菜鸟教程](https://www.runoob.com/js/js-tutorial.html)

### 1.2. <a id="requests">`requests`</a> & 1.3. <a id="selenium">`Selenium`</a>
- [b站](https://www.bilibili.com/video/BV1bL4y1V7q1)

### 1.4. <a id="tomcat">`Tomcat`</a>
- [菜鸟教程](https://www.runoob.com/html/html-tutorial.html)

## 2. 常爬网站
- |网址|爬前操作|目录字段|内容字段|爬取方法|
  |:-|:-|:-|:-|:-:|
  |01. [RockAuto](https://www.rockauto.com/en/parts/STANDARD%20MOTOR%20PRODUCTS,Speed%20Sensor,10634)||`Part_Number`、***`Url`***|1. `Part_Number`、`Manufacturer`、`Vehicle`、`Note_1`、***`Info`***、`Note_2`、`Alternate_OE_Part_Numbers`、`Src`<br />2. ***`Info`***、`Specifications`|[Selenium](#selenium)|
  |02. [Dorman](https://www.dormanproducts.com/gsearch.aspx?type=keyword&origin=keyword&q=Climate%2520Control%2520Module&start=0&num=100)|`100 records per page`|`Part_Number`、`Part_Type`、`Application_Summary`、***`Url`***|1. ***`Url`***、`OE_Numbers`、***`vehicle_url`***、`Src`、`其他Specifications`<br />2. ***`vehicle_url`***、`Vehicle`|[requests](#requests)|
  |03. [eBay](https://www.ebay.de/sch/i.html?_dkr=1&iconV2Request=true&_blrs=recall_filtering&_ssn=nb-parts-de&store_cat=0&store_name=nbpartsersatzteile&_oac=1&_nkw=bremsscheiben)|1. `Items per page` -> `240`<br />2. `Sort` -> `Price + Shipping: highest first`|***`Item_Number`***、`Url`|***`Item_Number`***、`Title`、`Price`、`Sold`、`Vehicle`、`Src`、`其他ItemSpecifics`|[requests](#requests)|
  |04. [Cardone](https://www.cardone.com/motors/wiper-and-washer/windshield-wiper-motor/?limit=96&sort=alphaasc)|1. `Show` -> `96`<br />2. `Sort By:` -> `A to Z`|`Title`、`Vehicle`、***`Url`***|1. ***`Url`***、***`Part_Number`***、`Src`、`其他General`<br />2. ***`Part_Number`***、`OE_Numbers`|[requests](#requests) + [Tomcat](#tomcat)|
  |05. [Standard](https://www.standardbrand.com/en/products/sensors/sensors/anti-lock-brake-abs-sensors)|1. 在官网找出[`iframe`](https://ecatalog.smpcorp.com/V2/STD/#/partsearch/searchText/ABS%20Speed%20Sensor?type=p&view=pp)：`title="E-Cat Frame"`，设置`View 96`、`Part  (A-Z)`<br />2. 在`iframe`找出[`api`](https://ecatalog.smpcorp.com/V2/STD/api/part/partsearch?filter=ABS%20Speed%20Sensor&filterType=n&searchType=p&imageSize=80&start=0&limit=96&sort=3&catFilter=-All-&yearFilter=-All-&makeFilter=-All-&modelFilter=-All-&engineFilter=-All-&attrCodeFilter=-All-&attrValueFilter=-All-&plkEngineMakeFilter=-All-&plkEngineModelFilter=-All-&plkEngineDispFilter=-All-)：`https://ecatalog.smpcorp.com/V2/STD/api/part/partsearch?filter=` + `Part_Type` + `&filterType=n&searchType=p&imageSize=80&start=` + `start` + `&limit=96&sort=3&catFilter=-All-&yearFilter=-All-&makeFilter=-All-&modelFilter=-All-&engineFilter=-All-&attrCodeFilter=-All-&attrValueFilter=-All-&plkEngineMakeFilter=-All-&plkEngineModelFilter=-All-&plkEngineDispFilter=-All-`<br />3. 在详情页找出[`详情api`](https://ecatalog.smpcorp.com/V2/STD/api/part/partselect?part=ALS417&func=PART&vid=)：`https://ecatalog.smpcorp.com/V2/STD/api/part/partselect?part=` + `Part_Number` + `&func=PART`<br />4. 在详情页找出[`图片api`](https://ecatalog.smpcorp.com/V2/STD/api/image/getallimages?partNum=ALS417&brand=STI&zoomFactor_sm=75&zoomFactor_md=360&zoomFactor_bg=960)：`https://ecatalog.smpcorp.com/V2/STD/api/image/getallimages?partNum=` + `Part_Number` + `&brand=` + `Brand` + `&zoomFactor_sm=75&zoomFactor_md=360&zoomFactor_bg=960`|***`Part_Number`***、`Url`|***`Part_Number`***、`POP`、`Per_Car`、`Part_Type`、`Vehicle`、`Src`、`其他partSpecs`|[requests](#requests)|
  |06. [CARiD](https://www.carid.com/search/NGK+Laser+Iridium+Spark+Plugs/code-ccb8ce4eee843e4eb433d7a9a8931e0d/queryId-420738fe115bb7ad7af949d2688d7e1a/?redirect=1/sort-price-desc)|`Sort by` -> `Price High to Low`|***`Url`***|***`Url`***、`Title`、`mpn`、`Brand`、`Part_Number`、`UPC`、`Vehicle`、`Src`、`其他Specifications`|[Selenium](#selenium)|
  |07. [Summit](https://www.summitracing.com/search?PageSize=100&SortBy=SKU&SortOrder=Ascending&keyword=LS%20Oil%20Pan)|1. `Records Per Page` -> `100 Records Per Page`<br />2. `Sort By` -> `Part Number (a-z)`|`Part_Number`、`Title`、`Description`、***`Url`***|***`Url`***、`Price`、`Src`、`其他Overview`|[Selenium](#selenium)|
  |08. [SpectraPremium](https://ecat.spectrapremium.com/en/parts?line=oil_pans&year=&make=&model=&submodel=&universal=0&hide-exclusives-canadian-market=0&sort=part-number&limit=50)|1. `Sort by part #`<br />2. `Number of results` -> `50`|`Part_Number`、***`Url`***|1. ***`Url`***、`Src`、`其他Part_Specifications`<br />2. ***`Url`***、`Vehicle`|[requests](#requests)|
  |09. [Denniskirk](https://www.denniskirk.com/atv/cv-axle/brandasc.srt/100.ipp)|1. `Results per Page` -> `100`<br />2. `Sort by` -> `Brand: A-Z`|`Title`、`Brand`、`Price`、***`Url`***|***`Url`***、`OE`、`Vehicle`、`Src`、`其他Specifications`|[Tomcat](#tomcat)|

## 3. 反爬手段
### 3.1. 请求头
#### 3.1.1. `User-Agent`
- |爬取方法|代码示例|
  |:-:|:-|
  |[requests](#requests)|`headers = {'User-Agent': 'UA'}`<br /><br />`requests.get(url, headers=headers)`|
  |[Selenium](#selenium)|`from selenium.webdriver import ChromeOptions`<br /><br />`option = ChromeOptions()`<br />`option.add_argument('user-agent=UA')`<br /><br />`from selenium.webdriver import Chrome`<br />`from selenium.webdriver.chrome.service import Service`<br /><br />`browser = Chrome(service=Service('chromedriver'), options=option)`|

- |序号|`User-Agent` Pool|
  |:-:|:-|
  |01.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.90 Safari/537.36`|
  |02.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.16 Safari/537.36`|
  |03.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.63 Safari/537.36`|
  |04.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.24 Safari/537.36`|
  |05.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.49 Safari/537.36`|
  |06.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.28 Safari/537.36`|
  |07.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.5563.64 Safari/537.36`|
  |08.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.5563.41 Safari/537.36`|
  |09.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.5563.19 Safari/537.36`|
  |10.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.77 Safari/537.36`|
  |11.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.30 Safari/537.36`|
  |12.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.74 Safari/537.36`|
  |13.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.25 Safari/537.36`|
  |14.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.71 Safari/537.36`|
  |15.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.22 Safari/537.36`|
  |16.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.62 Safari/537.36`|
  |17.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.18 Safari/537.36`|
  |18.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.61 Safari/537.36`|
  |19.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.21 Safari/537.36`|
  |20.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.52 Safari/537.36`|
  |21.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.19 Safari/537.36`|
  |22.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36`|
  |23.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.29 Safari/537.36`|
  |24.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.20 Safari/537.36`|
  |25.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36`|
  |26.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.24 Safari/537.36`|
  |27.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36`|
  |28.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36`|
  |29.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.27 Safari/537.36`|
  |30.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36`|
  |31.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.15 Safari/537.36`|
  |32.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36`|
  |33.|`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.20 Safari/537.36`|

#### 3.1.2. `Referer`
- |爬取方法|代码示例|
  |:-:|:-|
  |[requests](#requests)|`headers = {'Referer': 'Referer'}`<br /><br />`requests.get(url, headers=headers)`|

#### ~~3.1.3. `Cookie`~~

### 3.2. 代理池
- [快代理](https://www.kuaidaili.com/) -> 隧道代理
#### 3.2.1. 使用代理池
- |爬取方法|代码示例|
  |:-:|:-|
  |[requests](#requests)|`proxies = {'http': 'http://username:password@tunnelhost:tunnelport',`<br />&emsp;&emsp;&emsp;&emsp;&emsp;`'https': 'http://username:password@tunnelhost:tunnelport'}`<br /><br />`requests.get(url, proxies=proxies)`|
  |[Selenium](#selenium)|`from selenium.webdriver import ChromeOptions`<br /><br />`option = ChromeOptions()`<br />`option.add_argument('--proxy-server=http://tunnelhost:tunnelport')`<br /><br />`from selenium.webdriver import Chrome`<br />`from selenium.webdriver.chrome.service import Service`<br /><br />`browser = Chrome(service=Service('chromedriver'), options=option)`|

#### 3.2.2. 发票申请
- |发票类型|发票抬头|纳税人识别号|
  |:-:|:-:|:-:|
  |企业增值税普通发票/电子普通发票|福建扬腾创新信息科技有限公司|91350100MA338EEKXY|