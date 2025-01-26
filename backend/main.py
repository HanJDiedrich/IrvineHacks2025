from flask import Flask, render_template, request, redirect, jsonify
from flask_cors import CORS
import sql_manager as SQLMan
app = Flask(__name__)
CORS(app)    # Allow requests from React frontend

# Routes
# upload data to database
@app.route('/upload_game_data', methods=['POST'], strict_slashes = False)
def upload_data():
    data = request.get_json()
    print("Recieved:", data)
    gameName = data['gameName']
    print(gameName)
    public = data['public']
    print(public)
    creatorName = data['creatorName']
    print(creatorName)
    category = data['category']
    print(category)
    groups = data['groups']
    print(groups)
    wordsPerGroup = data['wordsPerGroup']
    print(wordsPerGroup)
    gameData = data['gameData']
    print(gameData)
    gameLink = data['gameLink']
    print(gameLink)
    manager = SQLMan.MySQLManager()
    manager.insert_new_game(gameName, public, creatorName, category, groups, wordsPerGroup, gameData, gameLink)
    #gameName, public, creatorName, category, groups, wordsPerGroup, gameData, gameLink


    return jsonify({"message": "Game created"}), 200

# Use axios for POST and GET requests???
# Add data to Flask backend

@app.route('/get_game_data', methods=['GET'])
def get_game_data():
    manager = SQLMan.MySQLManager()
    


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