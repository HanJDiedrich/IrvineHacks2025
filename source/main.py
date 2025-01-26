import source.sql_manager as sql_manager
from flask import Flask, render_template, request, redirect, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)    # Allow requests from React frontend

# Routes
# Fetch data from Flask backend
@app.route('/api/items', methods=['GET'])
def get_data():
    # Get data from server
    items = [
        # Fill this out later
    ]
    return jsonify(items)

# Use axios for POST and GET requests???
# Add data to Flask backend
@app.route('/app/items', methods=['POST'])
def add_data():
    data = request.json
    # Json data needed for upload
    name = data['name']
    public = data['public']
    rowX = data['rowX']
    rowY = data['rowY']
    creatorName = data['creatorName']
    gameLink = data['gameLink']
    gameData = data['gameData']

    return jsonify({"message": "Do something with data"}), 201

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == "POST":
        details = request.form      # Get all values from form on index.html
        username = details['username']      # Example field and data value

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)