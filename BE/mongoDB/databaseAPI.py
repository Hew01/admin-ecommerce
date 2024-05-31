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

