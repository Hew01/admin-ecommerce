import os
import json
from bson import ObjectId
import mongoDB.databaseAPI as db


def insert_category(document):
    insertDocument = {
        "categoryName": document["categoryName"],
        "categoryQuantity": 0
    }
    collection = db.GetCollection("categories")
    result = collection.insert_one(insertDocument)
    return result.inserted_id

def get_all_categories_with_total_amount():
    collection = db.GetCollection("categories")
    documents = collection.find({})
    orders = db.GetCollection("orders").find({})
    products = db.GetCollection("products")
    result = list()
    for doc in documents:
        currentDocAmount = 0
        for order in orders:
            totalAmount = 0
            for item in order["productList"]:
                product = products.find_one({'_id': ObjectId(item["productID"])})
                if product["category"] == ObjectId(doc["_id"]):
                    totalAmount += product["price"]*item["quantity"]
            currentDocAmount += totalAmount
        result.append({
            "categoryName": doc["categoryName"],
            "productQuantity": doc["productQuantity"],
            "totalAmount": currentDocAmount
        })
    return result

def delete_category(category_id):
    collection = db.GetCollection("categories")
    products = db.GetCollection("products").find({"category": ObjectId(category_id)})
    for product in products:
        db.UpdateDocument("products", product["_id"], {"$set": {"category": None}})
    query_filter = {'_id': ObjectId(category_id)}
    result = collection.delete_one(query_filter)
    return result.deleted_count > 0

def update_category(category_id, document):
    update = {
        "categoryName": document["categoryName"],
    }
    result = db.UpdateDocument("orders", category_id, update)
    return result

def get_category_by_id(category_id):
    collection = db.GetCollection("categories")
    query_filter = {'_id': ObjectId(category_id)}
    result = collection.find_one(query_filter)
    return result

def UpdateCategoryQuantity():
    categories = db.GetCollection("categories").find({})
    for category in categories:
        category["categoryQuantity"] = db.GetCollection("products").count_documents({"category": category["_id"]})
        db.UpdateDocument("categories", category["_id"], {
            "categoryName": category["categoryName"],
            "categoryQuantity": category["categoryQuantity"]
        })  
    return True
