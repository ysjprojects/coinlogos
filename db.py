from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class CoinModel(db.Model):
    __tablename__ = "coin"
    id = db.Column(db.String, primary_key = True)
    ticker = db.Column(db.String, nullable = False)
    logo = db.Column(db.String, nullable = False)
    addresses = db.relationship("AddressModel", cascade="all, delete, delete-orphan", backref="coin")

    def __repr__(self):
        return f"Coin(id={self.id}, ticker={self.ticker}, imgurl={self.logo})"
    
    
    
class AddressModel(db.Model):
    __tablename__ = "address"
    id = db.Column(db.String, primary_key=True)
    parent_id = db.Column(db.String, db.ForeignKey("coin.id", ondelete="CASCADE"))
    network = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"Address(parent_id={self.parent_id}, network={self.network}, address={self.address})" 
    
    
