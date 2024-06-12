import os
import json, datetime
from bson import ObjectId
import mongoDB.databaseAPI as db

def chat(chatID, senderID, senderSide, message):
    collection = db.GetCollection("chats")
    chat = collection.find_one({"_id": ObjectId(chatID)})
    if(chat):
        if(senderSide=="admin"):
            if(chat["adminID"] == senderID):
                result = db.GetCollection("chats").update_one({"_id": ObjectId(chatID)}, {"$push": {"messages": {
                    "senderID": senderID,
                    "senderSide": senderSide,
                    "message": message,
                    "time": datetime.datetime.now()
                }}})
                if(result):      
                    return {
                    "operationSuccess": True
                    }
                else:
                    return {
                        "operationSuccess": False
                    }
        else: 
            if (senderSide=="user"):
               if(chat["userID"] == senderID):
                result = db.GetCollection("chats").update_one({"_id": ObjectId(chatID)}, {"$push": {"messages": {
                    "senderID": senderID,
                    "senderSide": senderSide,
                    "message": message,
                    "time": datetime.datetime.now()
                }}})
                if(result):
                    return {
                    "operationSuccess": True
                    }
                else:
                    return {
                        "operationSuccess": False
                    }
               else:
                    return {
                        "operationSuccess": False,
                        "status": "User id mismatch"
                    }
    else:
        return {
            "operationSuccess": False,
            "status": "Can't find chat session"
        }
    
def getChat(id):
    collection = db.GetCollection("chats")
    chat = collection.find_one({"_id": ObjectId(id)})
    if(chat):
        return chat
    else:
        return {
            "operationSuccess": False,
            "status": "Can't find chat session"
        }
    
def create_new_chat(userID, adminID):
    collection = db.GetCollection("chats")
    chat = collection.insert_one({
        "userID": userID,
        "adminID": adminID,
        "messages": []
    })
    if(str(chat.inserted_id)):
        return {
        "operationSuccess": True,
        "chatID": str(chat.inserted_id)
        }
    else:
        return {
        "operationSuccess": False
        }
    
def getAllChats():
    collection = db.GetCollection("chats")
    chats = collection.find({})
    return chats
