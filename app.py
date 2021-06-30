from flask import Flask, render_template
from flask_restful import Api, Resource, abort
from db import db, CoinModel, AddressModel
from marshmallow import Schema, fields
import os

app = Flask(__name__)
app.config ['JSON_SORT_KEYS'] = False

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or 'sqlite:///database.db'


db.app = app
db.init_app(app)
with app.app_context():
    db.create_all()

api = Api(app)

@app.route("/")
def index():
    return render_template('index.html')

class AddressSchema(Schema):
    class Meta:
        ordered=True

    id = fields.String(required=True, dump_only=True)
    network = fields.String(required=True)
    address = fields.String(required=True)

class CoinSchema(Schema):
    class Meta:
        ordered=True

    id = fields.String(required=True)
    ticker = fields.String(required=True)
    logo = fields.String(required=True)
    addresses = fields.Nested(AddressSchema, many=True)


class Coins(Resource):
    def get(self):
        result = CoinModel.query.all()
        if not result:
            abort(404,message="coin list is empty")

        schema = CoinSchema(many=True)
        
        return schema.dump(result)
        

class CoinsByNetwork(Resource):
    def get(self, network):
        result = CoinModel.query.join(AddressModel, CoinModel.addresses).filter(AddressModel.network == network ).all()
        if not result:
            abort(404,message= "Network does not exist")

        schema = CoinSchema(many=True)
        
        return schema.dump(result)

class CoinsByTicker(Resource):
    def get(self,ticker):
        result = CoinModel.query.filter_by(ticker = ticker).all()

        if not result:
            abort(404, message="Ticker does not exist")

        schema = CoinSchema(many=True)

        return schema.dump(result)

class CoinById(Resource):

    def get(self, coin_id):
        result = CoinModel.query.filter_by(id=coin_id).first()
        if not result:
            abort(404, message="coin does not exist")
        
        schema = CoinSchema()

        return schema.dump(result)

class CoinByAddress(Resource):

    def get(self, network, address):
        address_id = f"{network}{address}"
        result = AddressModel.query.filter_by(id=address_id).first()
        if not result:
            abort(404,message="address does not exist")

        schema = CoinSchema()
        
        coin = CoinModel.query.filter_by(id=result.parent_id).first()

        if not coin:
            abort(404,message="address is not linked to any coin")
        
        return schema.dump(coin)



class CoinByTicker(Resource):
    def get(self, ticker):
        result = CoinModel.query.filter_by(ticker == ticker).first()
        if not result:
            abort(404, message="Ticker does not exist")
        
        schema = CoinSchema()

        return schema.dump(result)

class Networks(Resource):
    def get(self):
        query = db.session.query(AddressModel.network.distinct().label("network"))
        networks = [r.network for r in query.all()]

        return {"result": networks}





api.add_resource(Coins, "/coins")
api.add_resource(CoinsByNetwork, "/coins/network/<string:network>")
api.add_resource(CoinsByTicker, "/coins/ticker/<string:ticker>")

api.add_resource(CoinById, "/coin/id/<string:coin_id>")
api.add_resource(CoinByTicker, "/coin/ticker/<string:ticker>")
api.add_resource(CoinByAddress, "/coin/address/<string:network>/<string:address>")

api.add_resource(Networks, "/networks")