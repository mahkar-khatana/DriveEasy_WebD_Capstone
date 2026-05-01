from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB = "database.db"

def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            name TEXT,
            phone TEXT,
            email TEXT,
            city TEXT,
            license TEXT,
            car TEXT,
            carId INTEGER,
            days INTEGER,
            rate INTEGER,
            total INTEGER,
            start TEXT,
            end TEXT,
            status TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/book', methods=['POST'])
def book():
    data = request.json

    conn = sqlite3.connect(DB)
    c = conn.cursor()

    c.execute('''
        INSERT INTO bookings VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ''', (
        data['id'],
        data['name'],
        data['phone'],
        data['email'],
        data['city'],
        data['license'],
        data['car'],
        data['carId'],
        data['days'],
        data['rate'],
        data['total'],
        data['start'],
        data['end'],
        data['status']
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Booking saved"})


@app.route('/bookings', methods=['GET'])
def get_bookings():
    conn = sqlite3.connect(DB)
    c = conn.cursor()

    c.execute("SELECT * FROM bookings")
    rows = c.fetchall()
    conn.close()

    bookings = []
    for r in rows:
        bookings.append({
            "id": r[0],
            "name": r[1],
            "phone": r[2],
            "email": r[3],
            "city": r[4],
            "license": r[5],
            "car": r[6],
            "carId": r[7],
            "days": r[8],
            "rate": r[9],
            "total": r[10],
            "start": r[11],
            "end": r[12],
            "status": r[13]
        })

    return jsonify(bookings)


@app.route('/clear', methods=['DELETE'])
def clear():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("DELETE FROM bookings")
    conn.commit()
    conn.close()

    return jsonify({"message": "All deleted"})


if __name__ == '__main__':
    app.run(debug=True)