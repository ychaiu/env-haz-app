"""Utility file to seed env-haz-app database from files in seed_data"""

from sqlalchemy import func
from model import Event, connect_to_db, db
from datetime import datetime
from server import app

def load_seed_events():
    """Load sample events from seed_events.csv"""

    # Delete existing rows to prevent duplicates
    Event.query.delete()

    for row in open("seed_data/seed_events.csv"):
        row = row.rstrip()

        user_id, haz_id, event_title, active, datetime_seen, event_start, event_end, description, last_edited, last_edited_user, latitude, longitude = row.split(",")

        if active == 'TRUE':
            active = True
        else:
            active = False

        event = Event(user_id = user_id,
                        haz_id = haz_id,
                        event_title = event_title,
                        active = active,
                        datetime_seen = datetime_seen,
                        event_start = event_start,
                        event_end = event_end,
                        description = description,
                        last_edited = last_edited,
                        last_edited_user = last_edited_user,
                        latitude = latitude, 
                        longitude = longitude)
        db.session.add(event)

    db.session.commit()
    print("Successfully seeded into the events table!")

if __name__ == '__main__':
    connect_to_db(app)
    load_seed_events()
