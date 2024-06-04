from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import products, orders, categories
from mongoDB.databaseAPI import parse_json

#productAPI
category_bp = Blueprint("categories", __name__, url_prefix="/categories")
category_bp.before_request
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
    
@category_bp.route('/all', methods=['POST'])
def get_all_category():
    cursor = categories.get_all_categories_with_total_amount()
    json_data = parse_json(cursor)
    return json_data

@category_bp.route('/<id>', methods=['POST'])
def get_category_by_id(id):
    cursor = categories.get_category_by_id(id)
    json_data = parse_json(cursor)
    return json_data

@category_bp.route('/add', methods=['POST'])
def AddCategory():
    categoryName = request.get_json()['categoryName']
    cursor = categories.insert_category(request.get_json())
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }