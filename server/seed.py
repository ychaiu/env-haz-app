"""Utility file to seed env-haz-app database from files in seed_data"""

from sqlalchemy import func
from model import Event, Hazard, User, Comment, Photo, connect_to_db, db
from server import app

def delete_old_data():
    """Delete existing data to prevent duplicates."""

    User.query.delete()
    Comment.query.delete()
    Event.query.delete()
    User.query.delete()
    Hazard.query.delete()
    Photo.query.delete()

def load_seed_users():
    """Load users from seed_users.csv"""

    for row in open("seed_data/seed_users.csv"):
        row = row.rstrip()
        first_name, last_name, display_name, email, password = row.split(",")
        user = User(first_name = first_name,
                    last_name = last_name,
                    display_name = display_name,
                    email = email,
                    password = password)
        db.session.add(user)

    db.session.commit()
    print("Successfully seeded into users table!")

def load_seed_hazard_types():
    """Load hazard types from hazard_types.csv"""

    for row in open("seed_data/hazard_types.csv"):
        row = row.rstrip()
        hazard = Hazard(haz_type = row)
        db.session.add(hazard)

    db.session.commit()
    print("Successfully seeded into hazards table!")

def load_seed_events():
    """Load sample events from seed_events.csv"""

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

def load_seed_comments():
    """Load sample events from seed_comments.csv"""

    for row in open("seed_data/seed_comments.csv"):
        row = row.rstrip()
        user_id, event_id, comment = row.split(",")
        row_comment = Comment(user_id = user_id,
                                event_id = event_id,
                                comment = comment)
        db.session.add(row_comment)
    db.session.commit()
    print("Successfully seeded into the comments table!")

def load_seed_photos():
    """Load sample photo urls from seed_photos.csv"""

    for row in open("seed_data/seed_photos.csv"):
        row = row.rstrip()
        user_id, event_id, url = row.split(",")
        row_photo = Photo(user_id = user_id,
                            event_id = event_id,
                            url = url)
        db.session.add(row_photo)
    db.session.commit()
    print("Successfuly seeded into the photos table!")

if __name__ == '__main__':
    connect_to_db(app)
    delete_old_data()
    load_seed_users()
    load_seed_hazard_types()
    load_seed_events()
    load_seed_comments()
    load_seed_photos()
