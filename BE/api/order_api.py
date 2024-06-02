from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import products
from mongoDB.databaseAPI import parse_json

#productAPI
order_bp = Blueprint("orders", __name__, url_prefix="/orders")