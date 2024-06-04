from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import coupons
from mongoDB.databaseAPI import parse_json

#productAPI
coupon_bp = Blueprint("coupon", __name__, url_prefix="/coupons")
coupon_bp.before_request
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
    
@coupon_bp.route("/add", methods=["POST"])
def Addcoupon():
    name = request.get_json()['couponName']
    type = request.get_json()['couponType']
    value = request.get_json()['couponValue']
    start = request.get_json()['couponStartDay']
    end = request.get_json()['couponEndDay']
    status = request.get_json()['couponStatus']
    target = request.get_json()['couponTarget']

    cursor = coupons.insert_coupon(request.get_json())
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }

@coupon_bp.route("/update/<id>", methods=["POST"])
def Updatecoupon(id):
    cursor = coupons.update_coupon(id, request.get_json())
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }

@coupon_bp.route("/remove/<id>", methods=["POST"])
def Removecoupon(id):
    cursor = coupons.delete_coupon(id)
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }

@coupon_bp.route("/<id>", methods=["POST"])
def Getcoupon(id):
    cursor = coupons.get_coupon_by_id(id)
    json_data = parse_json(cursor)
    return json_data

@coupon_bp.route("/all", methods=["POST"])
def GetAllcoupon():
    cursor = coupons.get_all_coupons()
    json_data = parse_json(cursor)
    return json_data