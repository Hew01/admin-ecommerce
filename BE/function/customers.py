import os
import json
from bson import ObjectId
import mongoDB.databaseAPI as db

def insert_customer(document):
    insertDocument = {
        "customerName": document["customerName"],
        "customerType": document["customerType"],
        "email": document["email"],
        "phoneNumber": document["phoneNumber"],
        "accountID": None,
        "couponList": [],
        "wishlist": [],
        "deliveryAddress": document["deliveryAddress"],
    }
    collection = db.GetCollection("customers")
    result = collection.insert_one(insertDocument)
    return result.inserted_id

def get_all_customers():
    collection = db.GetCollection("customers")
    result = collection.find({})
    return result

def delete_customer(customer_id):
    collection = db.GetCollection("customers")
    query_filter = {'_id': ObjectId(customer_id)}
    result = collection.delete_one(query_filter)
    return result.deleted_count > 0

def update_customer(customer_id, document):
    update = {
        "customerName": document["customerName"],
        "customerType": document["customerType"],
        "email": document["email"],
        "phoneNumber": document["phoneNumber"],
        "deliveryAddress": document["deliveryAddress"],
    }
    result = db.UpdateDocument("customers", customer_id, update)
    return result

def get_customer_by_id(customer_id):
    collection = db.GetCollection("customers")
    query_filter = {'_id': ObjectId(customer_id)}
    result = collection.find_one(query_filter)
    orders = db.GetCollection("orders").find({'customerID': customer_id})
    totalAmount = 0
    orderList = []
    for order in orders:
        orderList.append(str(order["_id"]))
        if(order["orderStatus"] == "paid"):
            totalAmount += order["finalAmount"]

    returnData = {
        "customerName": result["customerName"],
        "customerType": result["customerType"],
        "email": result["email"],
        "phoneNumber": result["phoneNumber"],
        "deliveryAddress": result["deliveryAddress"],
        "totalAmount": totalAmount,
        "orderList": orderList,
        "accountID": result["accountID"],
        "couponList": result["couponList"],
        "wishlist": result["wishlist"]
    }
    return returnData



