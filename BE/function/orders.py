import os
import json
from bson import ObjectId
import mongoDB.databaseAPI as db

def insert_order(document):
    insertDocument = {
        "postID": document["postID"],
        "orderType": document["orderType"],
        "orderSource": document["orderSource"],
        "customerID": document["customerID"],
        "dateCreated": document["dateCreated"],
        "productList": document["productList"],
        "totalAmount": document["totalAmount"],
        "couponID": document["couponID"],
        "finalAmount": document["finalAmount"],
        "shipAddress": document["shipAddress"],
        "orderStatus": document["orderStatus"],
        "orderNote": document["orderNote"],
        "shippingStatus": document["shippingStatus"]
    }
    collection = db.GetCollection("orders")
    result = collection.insert_one(insertDocument)
    return result.inserted_id

def get_all_orders():
    collection = db.GetCollection("orders")
    result = collection.find({})
    return result

def delete_order(order_id):
    collection = db.GetCollection("orders")
    query_filter = {'_id': ObjectId(order_id)}
    result = collection.delete_one(query_filter)
    return result.deleted_count >0

def update_order(order_id, document):
    collection = db.GetCollection("orders")
    query_filter = {'_id': ObjectId(order_id)}
    update = {
        "postID": document["postID"],
        "orderType": document["orderType"],
        "orderSource": document["orderSource"],
        "customerID": document["customerID"],
        "dateCreated": document["dateCreated"],
        "productList": document["productList"],
        "totalAmount": document["totalAmount"],
        "couponID": document["couponID"],
        "finalAmount": document["finalAmount"],
        "shipAddress": document["shipAddress"],
        "orderStatus": document["orderStatus"],
        "orderNote": document["orderNote"],
        "shippingStatus": document["shippingStatus"]
    }
    result = db.UpdateDocument("orders", order_id, update)
    return result

def get_order_by_id(order_id):
    collection = db.GetCollection("orders")
    query_filter = {'_id': ObjectId(order_id)}
    result = collection.find_one(query_filter)
    return result


