import requests
from lxml import html

result = requests.get(f'https://www.coingecko.com/en/coins/buzzcoin')
tree = html.fromstring(result.content)

ranking = [ele.text_content().strip() for ele in tree.cssselect('tr > *')]
print(ranking[ranking.index('Market Cap Rank')+1])