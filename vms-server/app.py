from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import numpy as np
import base64
import io
from PIL import Image
import os
import json

app = Flask(__name__)
CORS(app)

# Create 'database/users' directory if it doesn't exist
USERS_DIR = 'db/users'
os.makedirs(USERS_DIR, exist_ok=True)

def process_image(image_data):
    try:
        # Ensure the image data is properly formatted
        if "," in image_data:
            image_data = image_data.split(',')[1]  # Remove the "data:image/jpeg;base64," prefix
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        return np.array(image)
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

def save_user(user_data):
    email = user_data['email']
    filename = os.path.join(USERS_DIR, f"{email}.json")
    with open(filename, 'w') as f:
        json.dump(user_data, f)

def load_users():
    users = {}
    for filename in os.listdir(USERS_DIR):
        if filename.endswith('.json'):
            with open(os.path.join(USERS_DIR, filename), 'r') as f:
                user_data = json.load(f)
                users[user_data['email']] = user_data
    return users

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json

    # Ensure required fields exist
    if not all(k in data for k in ['name', 'email', 'image']):
        return jsonify({'error': 'Missing name, email, or image'}), 400

    name = data['name']
    email = data['email']
    image = process_image(data['image'])

    if image is None:
        return jsonify({'error': 'Invalid image data'}), 400

    face_encodings = face_recognition.face_encodings(image)
    if not face_encodings:
        return jsonify({'error': 'No face detected in the image'}), 400

    face_encoding = face_encodings[0]

    user_data = {
        'name': name,
        'email': email,
        'face_encoding': face_encoding.tolist()  # Convert numpy array to list for JSON storage
    }

    save_user(user_data)

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/checkin', methods=['POST'])
def checkin():
    data = request.json

    # Ensure image key is present
    if 'image' not in data:
        return jsonify({'error': 'Missing image data'}), 400

    image = process_image(data['image'])
    if image is None:
        return jsonify({'error': 'Invalid image data'}), 400

    face_encodings = face_recognition.face_encodings(image)
    if not face_encodings:
        return jsonify({'error': 'No face detected in the image'}), 400

    face_encoding = face_encodings[0]

    users = load_users()

    for user in users.values():
        stored_encoding = np.array(user['face_encoding'])
        match = face_recognition.compare_faces([stored_encoding], face_encoding)

        if match[0]:
            return jsonify({
                'match': True,
                'user': {
                    'name': user['name'],
                    'email': user['email']
                }
            })

    return jsonify({'match': False}), 404

if __name__ == '__main__':
    app.run(debug=True)
