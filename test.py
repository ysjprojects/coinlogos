import requests
BASE = "http://coinlogos.kekapi.com/"
response = requests.get(BASE + "networks")

print(response.json())

'''
api.add_resource(Coins, "/coins")
api.add_resource(CoinsByNetwork, "/coins/network/<string:network>")
api.add_resource(CoinsByTicker, "/coins/ticker/<string:ticker>")

api.add_resource(CoinById, "/coin/id/<string:coin_id>")
api.add_resource(CoinByTicker, "/coin/ticker/<string:ticker>")
api.add_resource(CoinByAddress, "/coin/address/<string:network>/<string:address>")

api.add_resource(Networks, "/networks")
'''