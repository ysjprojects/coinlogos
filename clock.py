from helpers import update_coinlogos
from db import db, CoinModel

from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()

@sched.scheduled_job('interval', hours=6)
def soft_update_coinlogos():
    update_coinlogos()


@sched.scheduled_job('cron', day='last sun')
def hard_update_coinlogos():
    for coin in db.session.query(CoinModel).all():
        db.session.delete(coin)
    update_coinlogos()


sched.start()