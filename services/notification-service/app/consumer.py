import pika
import json
import time


def callback(ch, method, properties, body):

    event = json.loads(body.decode())

    print("\nNotification Sent")
    print(event)


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
        queue="notification_queue"
    )

    channel.queue_bind(
        exchange="booking_exchange",
        queue="notification_queue"
    )

    channel.basic_consume(
        queue="notification_queue",
        on_message_callback=callback,
        auto_ack=True
    )

    print("Notification Consumer Started...")

    channel.start_consuming()