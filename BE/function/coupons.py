import os
import json
from bson import ObjectId
import mongoDB.databaseAPI as db

def insert_coupon(document):
    insertDocument = {
        "couponName": document["couponName"],
        "couponType": document["couponType"],
        "couponValue": document["couponValue"],
        "couponStartDay": document["couponStartDay"],
        "couponEndDay": document["couponEndDay"],
        "couponStatus": document["couponStatus"],
        "couponTarget": document["couponTarget"],
    }
    collection = db.GetCollection("coupons")
    result = collection.insert_one(insertDocument)
    return result.inserted_id

def get_all_coupons():
    collection = db.GetCollection("coupons")
    result = collection.find({})
    return result

def delete_coupon(coupon_id):
    collection = db.GetCollection("coupons")
    query_filter = {'_id': ObjectId(coupon_id)}
    result = collection.delete_one(query_filter)
    return result.deleted_count > 0

def update_coupon(coupon_id, document):
    update = {
        "couponName": document["couponName"],
        "couponType": document["couponType"],
        "couponValue": document["couponValue"],
        "couponStartDay": document["couponStartDay"],
        "couponEndDay": document["couponEndDay"],
        "couponStatus": document["couponStatus"],
        "couponTarget": document["couponTarget"],
    }
    result = db.UpdateDocument("coupons", coupon_id, update)
    return result

def get_coupon_by_id(coupon_id):
    collection = db.GetCollection("coupons")
    query_filter = {'_id': ObjectId(coupon_id)}
    result = collection.find_one(query_filter)
    return result



