from flask import (Flask, render_template, redirect, request, jsonify)
from flask_cors import CORS, cross_origin
from model import connect_to_db, db, Hazard, Event, Comment

app = Flask(__name__)
app.secret_key = "secretkey"
CORS(app)


# @app.route("/")
# def homepage():
#     """Render the homepage"""

#     return render_template("index.html")

@app.route("/api/hazardSelection.json")
def haz_selections():
    """Return json of hazard types"""

    haz_selections = Hazard.query.all()
    hazlist = []
    for haz in haz_selections:
        hazlist.append(haz.haz_type)

    return jsonify({'haz_type': hazlist})

@app.route("/api/submit_event_data", methods=['POST'])
def get_event_data():
    """Get event form data and post to database."""

    content = request.get_json()
    new_event = Event(
                user_id = 1,
                haz_id = 1,
                event_title = content['eventTitle'],
                active = True,
                datetime_seen = content['dateTimeSeen'],
                event_start = content['dateTimeStart'],
                # event_end = '2018-12-31',
                description = content['eventDescription'],
                last_edited = '2018-12-31 00:00:00',
                #datetime python builtin
                last_edited_user = 1,
                latitude = content['latitude'],
                longitude = content['longitude']
                )
    db.session.add(new_event)
    db.session.commit()
    
    new_marker = {
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
            'comment_text': comment.comment,
            'comment_submitted': comment.comment_submitted,
            'comment_user_fn': comment.user.first_name,
            'comment_user_ln': comment.user.last_name
        }
        comment_list.append(comment_object)
    return jsonify(comment_list)

@app.route("/api/submit_comment", methods = ['POST', 'GET'])
def submit_comment():
    """Submit a new comment to the database"""

    content = request.get_json()
    new_comment_list = []
    new_comment = Comment(
                user_id = 1,
                event_id = 71,
                comment = content['commentInput']
                )
    new_comment_list.append(content['commentInput'])
    db.session.add(new_comment)
    db.session.commit()  

    return jsonify(new_comment_list)
  
@app.route("/api/image_files", methods=['GET', 'POST'])
def get_image_files():
    """When a user uploads a photo, show a preview through this route."""



if __name__ == "__main__":
    app.debug = True
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    app.run(port=5000, host='0.0.0.0')