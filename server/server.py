from flask import (Flask, render_template, redirect, request, jsonify)
from flask_cors import CORS, cross_origin
from model import connect_to_db, db, Hazard, Event, Comment, Photo, User
import random

app = Flask(__name__)
app.secret_key = "secretkey"
CORS(app)

# @app.route('/sign-up', methods=['POST'])
# def sign_up():
#     """Sign up a new user."""

#     data = request.get_json()
#     user_email = data['email']

# @app.route('/sign-in', methods=['POST'])
# def sign_up():
#     """Sign up a new user."""

#     data = request.get_json()
#     user_email = data['email']


@app.route("/api/submit_event_data", methods=['POST'])
def get_event_data():
    """Get event form data and post to database."""

    content = request.get_json()
    haz = Hazard.query.filter(Hazard.haz_type == content['selectedHaz']).one()
    haz_id = haz.haz_id

    new_event = Event(
                user_id = 1,
                haz_id = haz_id,
                event_title = content['eventTitle'],
                active = True,
                datetime_seen = content['dateTimeSeen'],
                event_start = content['dateTimeStart'],
                # event_end = '2018-12-31',
                description = content['eventDescription'],
                last_edited_user = 1,
                latitude = content['latitude'],
                longitude = content['longitude']
                )
    db.session.add(new_event)
    db.session.commit()
    
    new_marker = {
            'event_id' : new_event.event_id,
            'event_title' : new_event.event_title,
            'haz_id' : new_event.haz_id,
            'datetime_seen' : new_event.datetime_seen,
            'event_start' : new_event.event_start,
            'description' : new_event.description,
            'last_edited' : new_event.last_edited,
            'last_edited_user' : new_event.last_edited_user,
            'latitude' : new_event.latitude,
            'longitude' : new_event.longitude
    }
    print (new_marker)
    return jsonify(new_marker)

@app.route("/api/render_markers.json", methods=['GET'])
def render_markers():

    events = Event.query.all()
    event_list = []
    for event in events:
        event_object = {
            'event_id' : event.event_id,
            'event_title' : event.event_title,
            'haz_id' : event.haz_id,
            'datetime_seen' : event.datetime_seen,
            'event_start' : event.event_start,
            'event_end' : event.event_end,
            'description' : event.description,
            'last_edited' : event.last_edited,
            'last_edited_user' : event.last_edited_user,
            'latitude' : event.latitude,
            'longitude' : event.longitude
        }
        event_list.append(event_object)
    return jsonify(event_list)

@app.route("/api/render_comments/<event_id>", methods =['GET'])
def render_comments(event_id):

    comments = Comment.query.filter(Comment.event_id == event_id).all()
    comment_list = []
    for comment in comments:
        comment_object = {
            'comment_event_title': comment.event.event_title,
            'comment_text': comment.comment,
            'comment_submitted': comment.comment_submitted,
            'comment_user_fn': comment.user.first_name,
            'comment_user_ln': comment.user.last_name
        }
        comment_list.append(comment_object)
    return jsonify(comment_list)

@app.route("/api/submit_comment/<event_id>", methods = ['POST', 'GET'])
def submit_comment(event_id):
    """Submit a new comment to the database"""

    content = request.get_json()
    new_comment = Comment(
                user_id = 1,
                event_id = event_id,
                comment = content['comment_text']
                )
    new_comment_obj = {'comment_text': content['comment_text'],
                        'comment_user_fn': content['comment_user_fn'],
                        'comment_user_ln': content['comment_user_ln'],
                        'comment_submitted': content['comment_submitted']
    }
    db.session.add(new_comment)
    db.session.commit()  

    return jsonify(new_comment_obj)
  
@app.route("/api/submit_photos", methods=['POST'])
def post_photos():
    """When a user uploads photos, post the URL to the database."""

    content = request.get_json()
    print(content)
    photo_urls = content['urls']

    for url in photo_urls:
        new_photo = Photo(
            user_id = 1,
            event_id = content['eventId'],
            url = url
        )
        db.session.add(new_photo)
    db.session.commit()

    return "Photo successfully added to database!"

@app.route("/api/get_photos/<event_id>", methods=['GET'])
def get_photos(event_id):
    """Load photos when an infowindow is clicked."""

    photos = Photo.query.filter(Photo.event_id == event_id).all()
    print(photos)
    photo_list =[]
    for photo in photos:
        photo_list.append(photo.url)
    return jsonify(photo_list)

@app.route("/api/get_event_count", methods=['GET'])
def get_event_count():
    """Get count of events in database."""

    events_count = db.session.query(Event).count()
    users_count = db.session.query(User).count()
    
    return jsonify({"events_count": events_count, "users_count": users_count})

if __name__ == "__main__":
    app.debug = True
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    app.run(port=5000, host='0.0.0.0')