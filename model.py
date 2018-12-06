"""Models and database function for Hackbright project."""

from flask_sqlalchemy import flask_sqlalchemy

db = SQLAlchemy()

class HazardType(db.Model):
    """Table of hazard categories."""

    __tablename__ = "hazards"

    haz_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    haz_type = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        """Helpful representation of object when printed."""

        return f"<haz_id : {self.haz_id}, haz_type : {self.haz_type}>"

class Event(db.Model):
    """Attributes associated with each hazard event(marker) on the map."""

    event_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    haz_id = db.Column(db.Integer, db.ForeignKey('hazards.haz_id'), nullable=False)
    active = db.Column(db.Integer, nulflable=False)
    datetime_seen = db.Column(db.Integer, autoincrement=True, primary_key=True)
    event_start = db.Column(db.Integer, db.ForeignKey('movies.movie_id'), nullable=False)
    event_end = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    last_edited = db.Column(db.Integer, nullable=False)
    last_edited_user = db.Column(db.Integer, nullable=False)
    latitude = db.Column(db.Integer, nullable=False)
    longitude = db.Column(db.Integer, nullable=False)

class HazEvent(db.Model):

class EventVote(db.Model):

class Photos(db.Model):

class Users(db.Model):

class Comment(db.Model):
