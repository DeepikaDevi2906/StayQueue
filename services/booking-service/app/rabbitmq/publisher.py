
import pika
import json


def publish_booking_created(event):

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host="rabbitmq",
        )
    )

    channel = connection.channel()

    channel.exchange_declare(
        exchange="booking_exchange",
        exchange_type="fanout"
    )

    channel.basic_publish(
        exchange="booking_exchange",
        routing_key="",
        body=json.dumps(event)
    )

    connection.close()