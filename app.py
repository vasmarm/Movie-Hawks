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
    # JWS_URL = 'mysql://frkgd2yep9avgh5i:v9i0jxcvk31usd96@sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/da1d21r7cqb5yeq2'	
    con = mysql.connector.connect(user='frkgd2yep9avgh5i', password='v9i0jxcvk31usd96',
                                host='sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
                                database='da1d21r7cqb5yeq2')
    c = con.cursor()

    c.execute("""SELECT * FROM tmdb_5000_movies where budget <> 0 and revenue <>0 LIMIT 100""")
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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)