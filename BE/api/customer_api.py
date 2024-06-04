from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import customers
from mongoDB.databaseAPI import parse_json

#productAPI
customer_bp = Blueprint("customer", __name__, url_prefix="/customers")
customer_bp.before_request
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
    
@customer_bp.route("/add", methods=["POST"])
def AddCustomer():
    name = request.get_json()["customerName"]
    type = request.get_json()["customerType"]
    email = request.get_json()["email"]
    phone = request.get_json()["phoneNumber"]
    address = request.get_json()["deliveryAddress"]
    cursor = customers.insert_customer(request.get_json())
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }

@customer_bp.route("/update/<id>", methods=["POST"])
def UpdateCustomer(id):
    cursor = customers.update_customer(id, request.get_json())
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }

@customer_bp.route("/remove/<id>", methods=["POST"])
def RemoveCustomer(id):
    cursor = customers.delete_customer(id)
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }

@customer_bp.route("/<id>", methods=["POST"])
def GetCustomer(id):
    cursor = customers.get_customer_by_id(id)
    json_data = parse_json(cursor)
    return json_data

@customer_bp.route("/all", methods=["POST"])
def GetAllCustomer():
    cursor = customers.get_all_customers()
    json_data = parse_json(cursor)
    return json_data