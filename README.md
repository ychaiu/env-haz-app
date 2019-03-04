# HAZMAP
https://drive.google.com/file/d/1oA3VnZhp29AKkrps9KA3EI16ChDfZg8M/view?usp=sharing

HAZMAP is community-driven reporting tool for environmental hazards.  On a map built using the Google Maps API, users can search for a place of interest, explore hazards classified by type, and comment on reported concerns submitted by other community members.  To report a hazard, users place a marker on the map, and submit information regarding the event, including a hazard category, date and time seen, photos, and a description. HazMap uses the Cloudinary API to store and serve photos, which are rendered in each marker's information window. All new reports are updated instantly, allowing users to explore concerns in their neighborhood in real-time. Created for my Hackbright capstone project, Feb 2019.

Tech Stack: React, Redux, React Router, PostgreSQL, Flask, SQLAlchemy, jQuery, Bootstrap
APIs: Google Maps, Cloudinary

## Getting API Keys

#### Google Maps Javascript API Key
To get a Maps Javscript API Key, follow the instructions [here](https://developers.google.com/maps/documentation/javascript/get-api-key).
To protect your key, you can set restrictions to allow only approved websites/IP addresses, and also limit the number of daily/hourly calls.

#### Cloudinary API Key
Set up a [Cloudinary](https://cloudinary.com/) account. You'll need the following in later parts of the setup:
1. API Key: On the Dashboard, under Account Details
2. Upload URL: On the Dashboard, under Account Details, click the arrow for `More`, and find the API Base URL. Click the down arrow, and a pop-up will show the Image Upload URL
3. Preset: In Settings, navigate to Upload, and scroll to the bottom. You can have multiple presets depending on image transformation needs

## Installation

### Clone and Set Up Virtual Environment

1. To start, you'll need these libraries and packages installed
```
git
pip3
npm >= 6.4.1
python3
postgres >= 10.6
```

2. Clone the repository
```
git clone https://github.com/ychaiu/env-haz-app.git
```

3. Inside the root folder, create and activate a virtual environment with [virtualenv](https://virtualenv.pypa.io/en/latest/installation/)
```
pip install virtualenv
virtualenv en
source env/bin/activate
```
In `.gitignore`, verify that `env/` is ignored.

### Set Up Backend Server

1. With your virtual environment active(env), install requirements
```
cd server
pip3 install -r requirements.txt
```

2. For sessions and any activity that requires encryption, a Flask secret key is needed. This is not used in this app, but let's set it up in case it's needed in the future.

```
cd server
touch config.py
echo FLASK_SECRET_KEY = <YOUR SECRET KEY> >> config.py
```

Add this file to `.gitignore` as `server/config.py`

2. With PostgreSQL installed, create your database, and load in the schema
```
createdb env-haz-app
python3 -i model.py
db.create_all()
```

If you ever need to drop the database
```
dropdb <DATABASE NAME>
```

3. Exit out of any active program and seed the database
```
python3 seed.py
```

4. To run the server
```
python3 server.py
```

### Set Up Client Side

The client side for this project was bootstrapped with [Create-React-App](https://github.com/facebook/create-react-app), which is a great starter for first-time projects. Create-React-App comes with Webpack, Babel, and other configurations for easy setup. However, you can skip this step when cloning this repository.

1. Install dependencies
```
cd client
npm install
```

2. Setup environmental variables
**Note: API keys and API calls are currently made on the front end, which presents a security vulnerability. This is less of a concern for the Google Maps API key, which allows owner restrictions. Google also suggests the [same thing] (https://developers.google.com/maps/documentation/javascript/get-api-key). However, the Cloudinary API key is at risk. Future versions of this project will store API keys and make API calls from the backend.

```
cd client
touch .env
```
In your `.env` file, include the following. When `REACT_APP_` is prepended to the front of your environmental variable, React knows how to locate and use that constant:
```
REACT_APP_CLOUDINARY_API = <CLOUDINARY API KEY>
REACT_APP_CLOUDINARY_PRESET = <CLOUDINARY PRESET>
REACT_APP_CLOUDINARY_UPLOAD_URL = <CLOUDINARY UPLOAD URL>
REACT_APP_GOOGLE_MAPS_API = <GOOGLE MAPS API KEY>
```

3. Run the application
```npm start```
