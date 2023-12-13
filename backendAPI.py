from flask import Flask, jsonify
import sqlite3
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/api/foreclosures": {"origins": "*"}})


@app.route('/api/foreclosures')
def get_foreclosures():
    conn = sqlite3.connect('chicago_data.db')
    c = conn.cursor()
    c.execute('SELECT * FROM foreclosures')
    rows = c.fetchall()
    conn.close()
    
     # Convert rows to a list of dicts, including the new fields
    foreclosures = [
        {
            'id': row[0],
            'property_address': row[1],
            'owner_management_agent_name': row[5],
            'owner_notices_agent_phone': row[7],
            'owner_notices_agent_email': row[8],
            'owner_address': row[9],
            'owner_city': row[10],
            'owner_state': row[11],
            'latitude': row[-2],
            'longitude': row[-1]
        }
        for row in rows
    ]
    return jsonify(foreclosures)
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
