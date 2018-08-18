import os

import pandas as pd
import numpy as np

import mysql.connector 
import pymysql

from flask import Flask, jsonify, render_template
from mysql.connector import errorcode


app = Flask(__name__)

data = []
#################################################
# Database Setup
#################################################

@app.route("/data")
def dataFetch():
    """Return a list of sample names."""
    con = mysql.connector.connect(user='root', password='admin',
                                    host='127.0.0.1',
                                    database='movie_magic_db')
    c = con.cursor()

    c.execute("""SELECT budget, original_title, popularity, revenue, vote_average, vote_count FROM tmdb_5000_movies order by budget""")

    for row in c:
        d = {
            'budget': row[0],
            'original_title': row[1],
            'popularity': row[2],
            'revenue': row[3],
            'voter_average': row[4],
            'voter_count': row[5]
        }
        data.append(d)
    
    print(data)
    c.close()
    return jsonify(data)

@app.route("/")
def renderData():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()