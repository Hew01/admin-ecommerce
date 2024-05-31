from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import products
from mongoDB.databaseAPI import parse_json

#productAPI
product_bp = Blueprint("products", __name__, url_prefix="/products")

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
    name = request.form.get("search_string")
    cursor = products.FindProductByName(name)
    json_data = parse_json(cursor)
    return json_data

#AddProduct
@product_bp.route('/add', methods=['POST'])
def AddProduct():
    productName = request.get_json()['productName']
    componentType = request.get_json()['componentType']
    price = request.get_json()['price']  
    detailedInfo = request.get_json()['Detailed Info']  
    image = request.get_json()['images']
    brand = request.get_json()['brand']
    decription = request.get_json()['description']
    cursor = products.AddDocument("products", request.get_json())
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
    cursor = products.RemoveDocument("products",id)
    result = False
    if(cursor.deleted_count >0):
        result = True
    else:
        result = False
        
    return {
        "operationSuccess": result
    }