from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 매 요청마다 MySQL 새 연결 생성
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="KUE_TE",
        password="ilovekwu",
        database="AI_alliance"
    )

@app.route("/partners")
def get_partners():
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT category, store_name, benefit, location FROM Partners")
    rows = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(rows)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
