from playwright.sync_api import sync_playwright

# = = = = = = = = = = = = = = = = = =

proxy = {'server': 'http://j933.kdltps.com:15818',
         'username': 't18126899091866',
         'password': 'kh8hjqtl'}

p = sync_playwright().start()
browser = p.chromium.launch(args=['--start-maximized'],
                            headless=False,
                            # proxy=proxy,
                            chromium_sandbox=True)
context = browser.new_context(no_viewport=True)

page = context.new_page()

# = = = = = = = = = = = = = = = = = =

page.goto('https://www.rockauto.com/', timeout=0)
page.wait_for_load_state(state='networkidle')

# = = = = = = = = = = = = = = = = = =

list_row = page.query_selector_all('xpath=//a[@class="navlabellink nvoffset nnormal"]')
list_part_number = [row.text_content() for row in list_row]
print(list_part_number)

# = = = = = = = = = = = = = = = = = =

import pandas as pd

# = = = = = = = = = = = = = = = = = =

pd.DataFrame({'Part Number': list_part_number}).to_excel('./part_in.xlsx', index=False)
browser.close()