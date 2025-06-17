from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# 매 요청마다 MySQL 새 연결 생성
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="KWU_TE",
        password="ilovekwu",
        database="AI_alliance"
    )

def get_chong_connection():
    return mysql.connector.connect(
        host="localhost",
        user="KWU_TE",
        password="ilovekwu",
        database="allianceDB"
    )

@app.route("/ai_partners")
def get_partners():
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT category, store_name, benefit, location FROM Partners")
    rows = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(rows)

@app.route("/chong_partners")
def get_chong_partners():
    db = get_chong_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT store_name, benefit, location, category FROM allianceTable")
    rows = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(rows)

# 리뷰 추가
@app.route("/ai_reviews", methods=["POST"])
def add_review():
    try:
        data = request.get_json()
        category = data.get('category')
        store_name = data.get('store_name')
        rating = data.get('rating')
        content = data.get('content')
        created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        db = get_connection()
        cursor = db.cursor()
        
        query = """INSERT INTO reviews (category, store_name, rating, content, created_at) 
                   VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(query, (category, store_name, rating, content, created_at))
        
        db.commit()
        cursor.close()
        db.close()
        
        return jsonify({"success": True, "message": "리뷰가 성공적으로 추가되었습니다."})
    
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# 특정 가게의 리뷰 가져오기
@app.route("/ai_reviews/<store_name>")
def get_reviews(store_name):
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        
        # 최근 3개 리뷰 가져오기
        query = """SELECT rating, content, created_at 
                   FROM reviews 
                   WHERE store_name = %s 
                   ORDER BY created_at DESC 
                   LIMIT 3"""
        cursor.execute(query, (store_name,))
        recent_reviews = cursor.fetchall()
        
        # 평균 별점 계산
        avg_query = """SELECT AVG(rating) as avg_rating 
                       FROM reviews 
                       WHERE store_name = %s"""
        cursor.execute(avg_query, (store_name,))
        avg_result = cursor.fetchone()
        avg_rating = float(avg_result['avg_rating']) if avg_result['avg_rating'] else 0
        
        cursor.close()
        db.close()
        
        return jsonify({
            "reviews": recent_reviews,
            "average_rating": round(avg_rating, 1)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 총학생회 리뷰 추가
@app.route("/chong_reviews", methods=["POST"])
def add_chong_review():
    try:
        data = request.get_json()
        category = data.get('category')
        store_name = data.get('store_name')
        rating = data.get('rating')
        content = data.get('content')
        created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        db = get_chong_connection()
        cursor = db.cursor()
        
        query = """INSERT INTO reviews (category, store_name, rating, content, created_at) 
                   VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(query, (category, store_name, rating, content, created_at))
        
        db.commit()
        cursor.close()
        db.close()
        
        return jsonify({"success": True, "message": "리뷰가 성공적으로 추가되었습니다."})
    
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# 총학생회 특정 가게의 리뷰 가져오기
@app.route("/chong_reviews/<store_name>")
def get_chong_reviews(store_name):
    try:
        db = get_chong_connection()
        cursor = db.cursor(dictionary=True)
        
        # 최근 3개 리뷰 가져오기
        query = """SELECT rating, content, created_at 
                   FROM reviews 
                   WHERE store_name = %s 
                   ORDER BY created_at DESC 
                   LIMIT 3"""
        cursor.execute(query, (store_name,))
        recent_reviews = cursor.fetchall()
        
        # 평균 별점 계산
        avg_query = """SELECT AVG(rating) as avg_rating 
                       FROM reviews 
                       WHERE store_name = %s"""
        cursor.execute(avg_query, (store_name,))
        avg_result = cursor.fetchone()
        avg_rating = float(avg_result['avg_rating']) if avg_result['avg_rating'] else 0
        
        cursor.close()
        db.close()
        
        return jsonify({
            "reviews": recent_reviews,
            "average_rating": round(avg_rating, 1)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/add_ai_partners", methods=["POST"])
def add_ai_partner():
    try:
        data = request.get_json()
        db = get_connection()
        cursor = db.cursor()
        query = "INSERT INTO Partners (category, store_name, benefit, location) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data["category"], data["store_name"], data["benefit"], data["location"]))
        db.commit()
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=False, message=str(e))

@app.route("/add_chong_partners", methods=["POST"])
def add_chong_partner():
    try:
        data = request.get_json()
        db = get_chong_connection()
        cursor = db.cursor()
        query = "INSERT INTO allianceTable (category, store_name, benefit, location) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data["category"], data["store_name"], data["benefit"], data["location"]))
        db.commit()
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=False, message=str(e))


# 추천 가게 관련 DB 연결
def get_recommend_connection():
    return mysql.connector.connect(
        host="172.29.26.55",
        user="KWU_TE",
        password="ilovekwu",
        database="recommend_db"
    )

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050, debug=True)