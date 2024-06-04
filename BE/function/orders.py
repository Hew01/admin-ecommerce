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
        "shippingStatus": document["shippingStatus"],
        "paymentMethod": document["paymentMethod"]
    }
    if(order_validation(insertDocument)==False):
        return{
            "orderLegality": False
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
        "shippingStatus": document["shippingStatus"],
        "paymentMethod": document["paymentMethod"]
    }
    if(order_validation(update)==False):
        return{
            "orderLegality": False
        }
    result = db.UpdateDocument("orders", order_id, update)
    return result

def get_order_by_id(order_id):
    collection = db.GetCollection("orders")
    query_filter = {'_id': ObjectId(order_id)}
    result = collection.find_one(query_filter)
    return result

def get_order_status():
    orders = get_all_orders()
    paid = 0
    pending =0
    cancelled = 0
    failed = 0
    for order in orders:
        if order["orderStatus"] == "paid":
            paid += 1
        elif order["orderStatus"] == "pending":
            pending += 1
        elif order["orderStatus"] == "cancelled":
            cancelled += 1
        elif order["orderStatus"] == "failed":
            failed += 1
    return {
        "paid": paid,
        "pending": pending,
        "cancelled": cancelled,
        "failed": failed
    }


def order_validation(order):
    isLegit = True
    totalAmount = 0
    for item in order["productList"]:
        product = db.GetCollection("products").find_one({'_id': ObjectId(item["productID"])})
        totalAmount += (product["price"] * item["quantity"])
    if order["totalAmount"] != totalAmount:    
        isLegit = False
        return isLegit
    finalAmount = totalAmount
    for item in order["couponID"]:
        coupon = db.GetCollection("coupons").find_one({'_id': ObjectId(item)})
        if coupon is not None:
            if(coupon["couponType"] == "percent"):
                finalAmount = finalAmount - (finalAmount * coupon["couponValue"] / 100)
            elif(coupon["couponType"] == "flat"):
                finalAmount = finalAmount - coupon["couponValue"]
    if order["finalAmount"] != finalAmount:
        isLegit = False
        return isLegit
    return isLegit