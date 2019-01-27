"""Models and database function for Hackbright project."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Hazard(db.Model):
	"""Table of hazard categories."""

	__tablename__ = "hazards"

	haz_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
	haz_type = db.Column(db.String(30), nullable=False)

	event = db.relationship('Event')

	def __repr__(self):
		"""Helpful representation of object when printed."""

		return f"<haz_id : {self.haz_id}, haz_type : {self.haz_type}>"

class Event(db.Model):
	"""Attributes associated with each hazard event(marker) on the map."""

	__tablename__ = "events"

	event_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	haz_id = db.Column(db.Integer, db.ForeignKey('hazards.haz_id'), nullable=False)
	event_title = db.Column(db.String(100), nullable = False)
	active = db.Column(db.Boolean, nullable=False)
	datetime_seen = db.Column(db.DateTime, nullable=False)
	event_start = db.Column(db.DateTime, nullable=True)
	event_end = db.Column(db.Date, nullable=True)
	description = db.Column(db.String(1000), nullable = False)
	last_edited = db.Column(db.DateTime, server_default=db.func.current_timestamp())
	last_edited_user = db.Column(db.Integer, nullable=False)
	latitude = db.Column(db.Float, nullable=False)
	longitude = db.Column(db.Float, nullable=False)

	user = db.relationship('User')
	hazard = db.relationship('Hazard')
	event = db.relationship('EventVote')
	# photo = db.relationship('Photo')
	# comment = db.relationship('Comment')

	def __repr__(self):
		"""Helpful representation of object when printed."""

		return f"<event_id : {self.event_id}, user_id : {self.user_id}, haz_id : {self.haz_id}>"

class EventVote(db.Model):
	"""Tracks votes related to every event."""

	__tablename__ = "eventvotes"

	eventvote_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
	eventvote_submitted = db.Column(db.DateTime, nullable=False)

	user = db.relationship('User')
	event = db.relationship('Event')

	def __repr__(self):
		"""Helpful representation of object when printed."""

		return f"<eventvote_id : {self.eventvote_id}, user_id : {self.user_id}, event_id : {self.event_id}>"

class Photo(db.Model):
	"""Attributes for photos uploaded for an event."""

	__tablename__ = "photos"

	photo_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
	photo_submitted = db.Column(db.DateTime, server_default=db.func.current_timestamp())
	url = db.Column(db.String, nullable=False)

	user = db.relationship('User')
	event = db.relationship('Event')

	def __repr__(self):
		"""Helpful representation of object when printed."""

		return f"<photo_id : {self.photo_id}, caption: {self.caption}>" 

class User(db.Model):
	"""User information"""

	__tablename__ = "users"

	user_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
	first_name = db.Column(db.String, nullable=False)
	last_name = db.Column(db.String, nullable=False)
	display_name = db.Column(db.String, nullable=False)
	email = db.Column(db.String, nullable=False)
	password = db.Column(db.String, nullable=False)

	event = db.relationship('Event')
	eventvote = db.relationship('EventVote')
	# photo = db.relationship('Photo')
	# comment = db.relationship('Comment')

	def __repr__(self):
		"""Helpful representation of object when printed."""

		return f"<user_id : {self.user_id}, name: {self.first_name} {self.last_name}>" 

class Comment(db.Model):
	"""Comments added by users to each event."""

	__tablename__ = "comments"

	comment_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
	comment = db.Column(db.String(250), nullable=False)
	comment_submitted = db.Column(db.DateTime, server_default=db.func.current_timestamp())

	user = db.relationship('User')
	event = db.relationship('Event')

	def __repr__(self):
		"""Helpful representation of object when printed."""

		return f"<comment_id : {self.comment_id}, user_id: {self.user_id}, comment: {self.comment}>" 

##############################################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///env-haz-app'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)
	
if __name__ == "__main__":
    # if module is run interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app
    connect_to_db(app)
    print("Connected to DB.")

