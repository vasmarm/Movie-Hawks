import os

import pandas as pd
import numpy as np

import mysql.connector 
import pymysql

from flask import Flask, jsonify, render_template
from mysql.connector import errorcode


app = Flask(__name__)


#################################################
# Database Setup
#################################################

@app.route("/data")
def dataFetch():
    data = []
    """Return a list of sample names."""
    con = mysql.connector.connect(user='root', password='sleepingmonkey',
                                    host='127.0.0.1',
                                    database='movie_magic_db',
                                    auth_plugin='mysql_native_password')
    c = con.cursor()

    # c.execute("""SELECT budget, original_title, popularity, revenue, vote_average, vote_count FROM tmdb_5000_movies order by budget""")

    c.execute("""SELECT * FROM tmdb_5000_movies where budget <> 0 and revenue <>0 LIMIT 5""")
    for row in c:
        d = {
            'budget': row[0],
            'genres': row[1],
            'homepage': row[2],
            'id': row[3],
            'keywords': row[4],
            'original_language': row[5],
            'original_title': row[6],
            'overview': row[7],
            'popularity': row[8],
            'production_companies': row[9],
            'production_countries': row[10],
            'release_date': row[11],
            'revenue': row[12],
            'runtime': row[13],
            'spoken_languages': row[14],
            'status': row[15],
            'tagline': row[16],
            'title': row[17],
            'vote_average': row[18],
            'vote_count': row[19],
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