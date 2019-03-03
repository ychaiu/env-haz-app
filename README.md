# HAZMAP
https://drive.google.com/file/d/1oA3VnZhp29AKkrps9KA3EI16ChDfZg8M/view?usp=sharing

HAZMAP is community-driven reporting tool for environmental hazards.  On a map built using the Google Maps API, users can search for a place of interest, explore hazards classified by type, and comment on reported concerns submitted by other community members.  To report a hazard, users place a marker on the map, and submit information regarding the event, including a hazard category, date and time seen, photos, and a description. HazMap uses the Cloudinary API to store and serve photos, which are rendered in each marker's information window. All new reports are updated instantly, allowing users to explore concerns in their neighborhood in real-time. Created for my Hackbright capstone project, Feb 2019.

Tech Stack: React, Redux, React Router, PostgreSQL, Flask, SQLAlchemy, jQuery, Bootstrap

## Installing

### Clone and Set Up Virtual Environment

To start, you'll need these libraries and packages installed
```
git
pip
npm
python3
```

Clone the repository
```
git clone https://github.com/ychaiu/env-haz-app.git
```

Inside the root folder, create and activate a virtual environment with [virtualenv](https://virtualenv.pypa.io/en/latest/installation/)
```
pip install virtualenv
virtualenv en
source env/bin/activate
```

In `.gitignore`, verify that `env/` is ignored.

# Set Up Backend Server
```
cd server




This project was bootstrapped with [Create-React-App](https://github.com/facebook/create-react-app), which is a great starter for first-time projects. Create-React-App comes with Webpack, Babel, and other configurations for easy setup. However, you can skip this step when cloning this repository.
