import requests
from lxml import html

result = requests.get(f'https://www.coingecko.com/en/coins/chainlink')
tree = html.fromstring(result.content)

ranking = tree.cssselect('tr > td')[7].text_content().strip()
print(ranking)