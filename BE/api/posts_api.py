from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import facebooks
from mongoDB.databaseAPI import parse_json



post_bp = Blueprint("post", __name__, url_prefix="/posts")
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

@post_bp.route("/new_post", methods=["POST"])
def new_post():
    parentObject = request.get_json()["parentObject"]
    connectionName = request.get_json()["connectionName"]
    imagePath = request.get_json()["imageURL"]
    message = request.get_json()["message"]
    cursor = facebooks.postFacebook(parentObject, connectionName, imagePath, message)
    result= False
    if(cursor):
        result = True
    else:
        result = False

    return {
        "operationSuccess": result
    }

@post_bp.route("/get_post/<id>", methods=["POST"])
def get_posts(id):
    cursor = facebooks.getPost(id)
    json_data = parse_json(cursor)
    return json_data

@post_bp.route("/get_all_posts", methods=["POST"])
def get_all_posts():
    cursor = facebooks.GetAllPost()
    json_data = parse_json(cursor)
    return json_data

@post_bp.route("/delete_post/<id>", methods=["POST"])
def delete_post(id):
    cursor = facebooks.DeletePost(id)
    json_data = parse_json(cursor)
    return json_data

@post_bp.route("/get_post_detail/<id>", methods=["POST"])
def get_post_detail(id):
    cursor = facebooks.GetInteraction(id)
    return cursor

@post_bp.route("/comment/<id>", methods=["POST"])
def comment(id):
    cursor = facebooks.CommentToPost(id, request.get_json()["message"])
    return cursor

@post_bp.route("/get_followers", methods=["POST"])
def get_followers():
    cursor = facebooks.getFollower()
    return cursor