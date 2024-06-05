from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import facebooks
from mongoDB.databaseAPI import parse_json

post_bp = Blueprint("posts", __name__, url_prefix="/posts")
post_bp.before_request
def check_session():
    sessionID = request.get_json()["sessionID"]
    accountID = request.get_json()["accountID"]
    if not sessionID or not accountID:
        return jsonify({
            "message": "sessionID and accountID are required",
            "success": False
        }), 400
    if not authentication.check_session(sessionID, accountID):
        return jsonify({
            "message": "authentication failed",
            "success": False
        }), 401
