import os
import json, datetime
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
    set_expired_coupons_to_inactive()
    return result.inserted_id

def get_all_coupons():
    set_expired_coupons_to_inactive()
    collection = db.GetCollection("coupons")
    result = collection.find({})
    return result

def delete_coupon(coupon_id):
    collection = db.GetCollection("coupons")
    query_filter = {'_id': ObjectId(coupon_id)}
    result = collection.delete_one(query_filter)
    set_expired_coupons_to_inactive()
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
    set_expired_coupons_to_inactive()
    return result

def get_coupon_by_id(coupon_id):
    set_expired_coupons_to_inactive()
    collection = db.GetCollection("coupons")
    query_filter = {'_id': ObjectId(coupon_id)}
    result = collection.find_one(query_filter)
    return result

def set_expired_coupons_to_inactive():
    collection = db.GetCollection("coupons")
    query_filter = {"couponEndDay": {"$lt": datetime.datetime.now()}}
    update = {"$set": {"couponStatus": "inactive"}}
    result = collection.update_many(query_filter, update)
    return result.modified_count > 0




