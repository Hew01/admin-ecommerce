from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
from function import authentication
from function import chat
from mongoDB.databaseAPI import parse_json
from webSocket.app import socketio

#productAPI

chat_bp = Blueprint("chat", __name__, url_prefix="/chat")
chat_bp.before_request  
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
    
@chat_bp.route('/send_message', methods=['POST'])
def send_message():
    message = request.get_json()["message"]
    senderID = request.get_json()["senderID"]
    senderSide = request.get_json()["senderSide"]
    chatID = request.get_json()["chatID"]
    cursor = chat.chat(chatID, senderID, senderSide, message)
    if(type(cursor) == bool):
        return {
            "operationSuccess": cursor
        }
    else:
        socketio.emit('new_message', cursor)
        json_data = parse_json(cursor)
        return json_data
    
@chat_bp.route('/get_chat/<chatID>', methods=['POST'])
def get_messages(chatID):
    cursor = chat.getChat(chatID)
    json_data = parse_json(cursor)
    return json_data

@chat_bp.route('/create_new_chat', methods=['POST'])
def create_new_chat():
    userID = request.get_json()["userID"]
    adminID = request.get_json()["adminID"]
    cursor = chat.create_new_chat(userID, adminID)
    if(type(cursor) == bool):
        return {
            "operationSuccess": cursor
        }
    else:
        socketio.emit('new_chat', cursor)
        json_data = parse_json(cursor)
        return json_data

@chat_bp.route('/get_all_chats', methods=['POST'])
def get_all_chats():
    cursor = chat.getAllChats()
    if(type(cursor) == bool):
        return {
            "operationSuccess": cursor
        }
    else:
        json_data = parse_json(cursor)
        return json_data
