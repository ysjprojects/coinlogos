import requests
from lxml import html
from db import db, CoinModel,AddressModel
from app import CoinSchema
from marshmallow import ValidationError

def update_coinlogos():
    schema = CoinSchema()

    response = requests.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true')

    

    for coin in response.json():

        try:
        
            coin_id = coin['id']
            coin_ticker = coin['symbol'].upper()
            coin_logo = None

            existing_entry = CoinModel.query.filter_by(id=coin_id).first()
            
            if existing_entry:
                continue

        
            
            result = requests.get(f'https://www.coingecko.com/en/coins/{coin_id}')

            tree = html.fromstring(result.content)

            stats = [ele.text_content().strip() for ele in tree.cssselect('tr > *')]
            ranking = stats[stats.index('Market Cap Rank')+1]

            if ranking == 'N/A':
                continue
            
            coin_logo = tree.cssselect('div.mt-3 > div > div > img')[0].get('src')
            
            if not coin_logo:
                continue

            
            addresses=[]
            platforms = coin['platforms']
            if platforms != {}:
                for k, v in platforms.items():
                    if v == "":
                        continue
                    else:
                        addresses.append({"network":k,"address":v})
            
            entry = {"id": coin_id, 
                    "ticker": coin_ticker, 
                    "logo": coin_logo,
                    "addresses":addresses}
            

            try:
                data = schema.load(entry)
            except ValidationError as err:
                print(err.messages)
                continue

            coin = CoinModel(id=data['id'], ticker=data['ticker'], logo = data['logo'])

            for addr in data['addresses']:
                network = addr['network']
                address = addr['address']
                coin.addresses.append(AddressModel(id=f'{network}{address}', network=network, address=address))


            db.session.add(coin)
            db.session.commit()
            print(entry)
        except:
            continue
    
    return True

def clear_tables():
    for coin in db.session.query(CoinModel).all():
        db.session.delete(coin)

