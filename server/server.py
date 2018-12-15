from flask import (Flask, render_template, redirect, request, jsonify)
from flask_debugtoolbar import DebugToolbarExtension
from model import connect_to_db, Hazard

app = Flask(__name__)
app.secret_key = "ABC"

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

if __name__ == "__main__":
    app.debug = True
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)
    DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')