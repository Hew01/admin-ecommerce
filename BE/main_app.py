from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
import api.product_api
from function import products
from mongoDB.databaseAPI import parse_json
app = Flask(__name__)
CORS(app)
import api


app.register_blueprint(api.product_api.product_bp)
if __name__ == '__main__':
    app.run()
