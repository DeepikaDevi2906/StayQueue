def booking_created_event(
    booking
):

    return {
        "booking_id": booking.id,
        "user_id": booking.user_id,
        "room_id": booking.room_id,
        "check_in": str(booking.check_in),
        "check_out": str(booking.check_out),
        "status": booking.status
    }