from sqlalchemy.orm import Session

from app.models.event_log import EventLog


def process_event(
    db: Session,
    data: dict
):

    event = data["event"]

    user_id = data["user_id"]

    hotel_id = data["hotel_id"]

    if event == "BOOKING_CREATED":

        log = EventLog(
            user_id=user_id,
            hotel_id=hotel_id,
            booking_status="SUCCESS"
        )

        db.add(log)

        db.commit()

        return

    record = db.query(
        EventLog
    ).filter(
        EventLog.user_id == user_id,
        EventLog.hotel_id == hotel_id
    ).order_by(
        EventLog.id.desc()
    ).first()

    if not record:
        return

    if event == "EMAIL_SENT":

        record.email_status = "SENT"

    elif event == "NOTIFICATION_SENT":

        record.notification_status = "SENT"

    db.commit()