from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import accounts
from mongoDB.databaseAPI import parse_json

#productAPI
account_bp = Blueprint("account", __name__, url_prefix="/accounts")
    
@account_bp.route("/add", methods=["POST"])
def Addaccount():
    accountname = request.get_json()['username']
    password = request.get_json()['password']
    accountType = request.get_json()['accountType']
    cursor = accounts.create_account(accountname, password, accountType)
    if(type(cursor) == bool):
        return {
            "operationSuccess": cursor
        }
    else:
        json_data = parse_json(cursor)
        return json_data
    
@account_bp.route("/changepassword/<id>", methods=["POST"])
def Updateaccount(id):
    password = request.get_json()['password']
    cursor = accounts.change_password(id, password)
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }

@account_bp.route("/remove/<id>", methods=["POST"])
def Removeaccount(id):
    cursor = accounts.delete_account(id)
    result = False
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }

@account_bp.route("/login", methods=["POST"])
def Login():
    accountname = request.get_json()['username']
    password = request.get_json()['password']
    loginType = request.get_json()['loginType']
    cursor = accounts.log_in(accountname, password, loginType)
    json_data = parse_json(cursor)
    return json_data

@account_bp.route("/logout", methods=["POST"])
def Logout():
    sessionID = request.get_json()["sessionID"]
    accountID = request.get_json()["accountID"]
    cursor = accounts.log_out(sessionID, accountID)
    if(cursor):
        result = True
    else:
        result = False
    return {
        "operationSuccess": result
    }