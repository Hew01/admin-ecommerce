import os
import json, base64
from function import authentication
from bson import ObjectId
import mongoDB.databaseAPI as db

def log_in(username, password: str, loginType):
    accounts = db.GetCollection("accounts")
    encodePassword = base64.b64encode(password.encode("utf-8"))
    query_filter = {"username": username, "password": encodePassword}
    result = accounts.find_one(query_filter)
    if(result):
        sessionKey = authentication.create_session(str(result["_id"]), loginType)
        return{"sessionKey": sessionKey, "accountID": str(result["_id"])}
    else:
        return{"message": "authentication failed"}
    
def log_out(sessionID, accountID):
    return authentication.remove_expired_sessions(sessionID, accountID)

def create_account(username, password: str, accountType):
    accounts = db.GetCollection("accounts")
    encodePassword = base64.b64encode(password.encode("utf-8"))
    result = accounts.insert_one({"username": username, "password": encodePassword, "accountType": accountType})  
    return {
            "operationSuccess": True,
            "accountID": str(result.inserted_id)
        }

def delete_account(accountID):
    accounts = db.GetCollection("accounts")
    result = accounts.delete_one({"_id": ObjectId(accountID)})
    db.GetCollection("customers").update_one({"accountID": ObjectId(accountID)}, {"$set": {"accountID": None}})
    return result.deleted_count > 0

def change_password(accountID, password: str):
    accounts = db.GetCollection("accounts")
    encodePassword = base64.b64encode(password.encode("utf-8"))
    result = accounts.update_one({"_id": ObjectId(accountID)}, {"$set": {"password": encodePassword}})
    return result.matched_count > 0