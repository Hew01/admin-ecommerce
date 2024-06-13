from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import products, orders
from mongoDB.databaseAPI import parse_json

#productAPI
order_bp = Blueprint("orders", __name__, url_prefix="/orders")
order_bp.before_request
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
    
@order_bp.route('/<id>', methods=['POST'])
def get_order_by_id(id):
    cursor = orders.get_order_by_id(id)
    json_data = parse_json(cursor)
    return json_data

@order_bp.route('/remove/<id>', methods=['POST'])
def delete_order(id):
    cursor = orders.delete_order(id)
    return {
        "operationSuccess": cursor
    }

@order_bp.route('/update/<id>', methods=['POST'])
def update_order(id):
    cursor = orders.update_order(id, request.get_json())
    if(type(cursor) == bool):
        return {
            "operationSuccess": cursor
        }
    else:
        json_data = parse_json(cursor)
        return json_data

@order_bp.route('/all', methods=['POST'])
def get_all_orders():
    cursor = orders.get_all_orders()
    json_data = parse_json(cursor)
    return json_data

@order_bp.route('/add', methods=['POST'])
def add_order():
    postID = request.get_json()["postID"],
    customerID =  request.get_json()["customerID"],
    dateCreated = request.get_json()["dateCreated"],
    productList = request.get_json()["productList"],
    totalAmount = request.get_json()["totalAmount"],
    couponID = request.get_json()["couponID"],
    finalAmount = request.get_json()["finalAmount"],
    shipAddress = request.get_json()["shipAddress"],
    orderStatus = request.get_json()["orderStatus"],
    orderNote = request.get_json()["orderNote"],
    shipingStatus = request.get_json()["shippingStatus"]
    cursor = orders.insert_order(request.get_json())
    if(type(cursor) == bool):
        return {
            "operationSuccess": cursor
        }
    else:
        json_data = parse_json(cursor)
        return json_data
@order_bp.route('/status', methods=['POST'])
def update_order_status():
    cursor = orders.get_order_status()
    json_data = parse_json(cursor)
    return json_data

@order_bp.route('/<id>/setstatus/<status>', methods=['POST'])
def set_order_status(id, status):
    cursor = orders.set_order_status(id, status)
    return {
        "operationSuccess": cursor
    }

@order_bp.route('/<id>/setshipping/<status>', methods=['POST'])
def set_shipping_status(id, status):
    cursor = orders.set_shipping_status(id, status)
    return {
        "operationSuccess": cursor
    }

@order_bp.route('/get_order_by_customer/<id>', methods=['POST'])
def get_order_by_customer(id):
    cursor = orders.get_orders_by_customer(id)
    json_data = parse_json(cursor)
    return json_data
