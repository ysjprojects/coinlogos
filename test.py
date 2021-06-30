import requests
from lxml import html

result = requests.get(f'https://www.coingecko.com/en/coins/sono')
tree = html.fromstring(result.content)

ranking = tree.cssselect('tr > td')[7].get('src')
print(ranking)
