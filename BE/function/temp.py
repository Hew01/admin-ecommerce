from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util, ObjectId
import json
uri = "mongodb+srv://admin:tenrousaathena1911@cluster0.shljxjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

def GetDB():
    return client["ecommerceDatabase"]

def GetCollection(collectionName):
    db = GetDB()
    collection = db[collectionName]
    return collection

def AddDocument(collectionName, document):
    collection = GetCollection(collectionName)
    insertDocument = {       
    "productName": document["productName"],
    "componentType": document["componentType"],
    "price": document["price"],
    "Detailed Info": document["Detailed Info"],
    "images": document["images"],
    "brand": document["brand"],
    "description": document["description"]
    }
    result = collection.insert_one(insertDocument)
    return result

def RemoveDocument(collectionName, id):
    collection = GetCollection(collectionName)
    query_filter = {'_id': ObjectId(id)}
    result = collection.delete_one(query_filter)
    return result

def parse_json(data):
    return json.loads(json_util.dumps(data))


def update_order(order_id, document):
    collection = GetCollection("orders")
    query_filter = {'_id': ObjectId(order_id)}
    update = {
        "postID": document["postID"],
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
    update_doc = {
        "$set": update
    }
    result = collection.update_one(query_filter, update_doc)
    return result.modified_count > 0

update_order("665ee51e9c4d8f40ce80a9a5",{
    "postID":"",
    "customerID": "",
    "dateCreated": "then",
    "productList":[
        {
            "productID": "66502f86a23ac82cab94f700",
            "quantity": 2
        }
    ],
    "totalAmount": 0,
    "couponID":[],
    "finalAmount": 0,
    "shipAddress": "abc",
    "orderStatus": "On standby",
    "shippingStatus": "Waiting Order Confirmation",
    "orderNote": "This order is use for test purpose"
})
