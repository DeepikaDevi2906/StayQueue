import pika
import json
import time

from app.database.session import SessionLocal
from app.models.analytics import Analytics
def start_consumer():

    while True:
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host="rabbitmq",
                    heartbeat=600
                )
            )
            break

        except:
            print("Waiting for RabbitMQ...")
            time.sleep(5)

    channel = connection.channel()

    channel.exchange_declare(
        exchange="booking_exchange",
        exchange_type="fanout"
    )

    channel.queue_declare(
        queue="analytics_queue"
    )

    channel.queue_bind(
        exchange="booking_exchange",
        queue="analytics_queue"
    )

    channel.basic_consume(
        queue="analytics_queue",
        on_message_callback=callback,
        auto_ack=True
    )

    print("Analytics Consumer Started...")

    channel.start_consuming()

def callback(ch, method, properties, body):

    event = json.loads(body.decode())

    db = SessionLocal()

    try:

        analytics = Analytics(
            booking_id=event["booking_id"],
            user_id=event["user_id"],
            room_id=event["room_id"]
        )

        db.add(analytics)
        db.commit()

        print("\nAnalytics Saved")
        print(event)

    finally:
        db.close()

