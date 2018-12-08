from flask import (Flask, render_template, redirect, request, flash, session)
from flask_debugtoolbar import DebugToolbarExtension
from model import connect_to_db


app = Flask(__name__)
app.secret_key = "ABC"

@app.route("/")
def homepage():
    """Render the homepage"""

    return render_template("homepage.html")

if __name__ == "__main__":
    app.debug = True
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)
    DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')