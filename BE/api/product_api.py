from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import products, recommend
from bson import ObjectId
from mongoDB.databaseAPI import parse_json, GetCollection

#productAPI
product_bp = Blueprint("products", __name__, url_prefix="/products")
@product_bp.before_request
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

#Get All Product
@product_bp.route('/all', methods=['POST'])
def get_all_product():
    cursor = products.GetAllProduct()
    json_data = parse_json(cursor)
    return json_data

#Get One Product By ObjectID
@product_bp.route('/<id>', methods=['POST'])
def get_product_by_id(id):
    cursor = products.GetProductByID(id)
    json_data = parse_json(cursor)
    return json_data

#Search product by name
@product_bp.route('/search', methods=['POST'])
def search():
    name = request.get_json()["search_string"]
    cursor = products.FindProductByName(name)
    json_data = parse_json(cursor)
    return json_data

#AddProduct
@product_bp.route('/add', methods=['POST'])
def AddProduct():
    productName = request.get_json()['productName']
    componentType = request.get_json()['category']
    price = request.get_json()['price']  
    detailedInfo = request.get_json()['detailed_info']  
    image = request.get_json()['images']
    brand = request.get_json()['brand']
    decription = request.get_json()['description']
    cursor = products.AddProduct("products", request.get_json())
    result = False
    if(cursor):
        result = True
    else:
        result = False

    return {
        "operationSuccess": result
    }

#RemoveProduct
@product_bp.route('/remove/<id>', methods=['POST'])
def RemoveProduct(id):
    cursor = products.RemoveProduct("products",id)
    result = False
    if(cursor.deleted_count >0):
        result = True
    else:
        result = False
        
    return {
        "operationSuccess": result
    }

@product_bp.route('/update/<id>', methods=['POST'])
def UpdateProduct(id):
    cursor = products.UpdateProduct(id, request.get_json())
    result = False
    if(cursor):
        result = True
    else:
        result = False

    return {
        "operationSuccess": result
    }

@product_bp.route('/compact', methods=['POST'])
def get_compact_product():
    cursor = products.GetCompactProducts()
    json_data = parse_json(cursor)
    return json_data

@product_bp.route('/recommend/<id>/<int:quantity>', methods=['POST'])
def get_recommend_product(id, quantity):
    product = GetCollection("products").find_one({"_id": ObjectId(id)})
    list = recommend.recommend(product["productName"], quantity)
    result = []
    for model in list:
        recommended = GetCollection("products").find_one({"productName": model})
        if(recommended):
            result.append(recommended)
    json_data = parse_json(result)
    return json_data
