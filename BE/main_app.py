from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
import api.categories_api
import api.order_api
import api.product_api
from function import products
from mongoDB.databaseAPI import parse_json
import api

app = Flask(__name__)
CORS(app)

app.register_blueprint(api.product_api.product_bp)
app.register_blueprint(api.order_api.order_bp)
app.register_blueprint(api.categories_api.category_bp)

if __name__ == '__main__':
    app.run()
