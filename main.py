import sql_manager
from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('main_page.html')    # Make sure to change to home page html later

if __name__ == '__main__':
    app.run(debug=True)