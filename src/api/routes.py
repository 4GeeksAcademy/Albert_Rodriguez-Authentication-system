"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask import request, jsonify
from api.models import User, db
from api.utils import APIException

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)

    # Fetch user from database
    user = User.query.filter_by(email=email).first()

    # Check if user exists and password matches
    if user is None or user.password != password:
        return jsonify({"msg": "Bad username or password"}), 401

    # Generate token
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary ={
        "message": "Your email is: " + email
    }
    return jsonify(dictionary), 200

@api.route("/register", methods=["POST"])
def register_user():
    email = request.json.get("email", None).lower()  
    password = request.json.get("password", None)
    
    is_active = True  
    
    
    if email is None or password is None:
        return jsonify({"message": "Missing email or password"}), 400
    
    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"message": "Email already registered"}), 409

    user = User(email=email, password=password, is_active=is_active)
    
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


