from flask import (Flask, render_template, redirect, request, jsonify)
from flask_cors import CORS, cross_origin
from model import connect_to_db, db, Hazard, Event

app = Flask(__name__)
app.secret_key = "secretkey"
CORS(app)


# @app.route("/")
# def homepage():
#     """Render the homepage"""

#     return render_template("index.html")

@app.route("/hazardSelection.json")
def haz_selections():
    """Return json of hazard types"""

    haz_selections = Hazard.query.all()
    hazlist = []
    for haz in haz_selections:
        hazlist.append(haz.haz_type)

    return jsonify({'haz_type': hazlist})

@app.route("/api/submit_event_data", methods=['GET', 'POST'])
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
                last_edited_user = 1,
                latitude = 37.803115,
                longitude = -122.257976)

    db.session.add(new_event)
    db.session.commit()
    
    return 'Success'

@app.route("/api/render_markers.json", methods=['GET', 'POST'])
def render_markers():

    events = Event.query.all()
    event_list = []
    for event in events:
        event_object = {
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


if __name__ == "__main__":
    app.debug = True
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    app.run(port=5000, host='0.0.0.0')