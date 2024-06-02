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
    result = collection.insert_one(document)
    return result

def UpdateDocument(collectionName, documentID, document):
    products = GetCollection(collectionName)
    query_filter = {'_id': ObjectId(documentID)}
    update = {"$set": document}
    result = products.update_one(query_filter, update)
    return result.modified_count > 0

def RemoveDocument(collectionName, id):
    collection = GetCollection(collectionName)
    query_filter = {'_id': ObjectId(id)}
    result = collection.delete_one(query_filter)
    return result

def parse_json(data):
    return json.loads(json_util.dumps(data))

def AddInventoryItem(document):
    collection = GetCollection("inventory")
    result = collection.insert_one(document)
    return result.inserted_id

def GetInventoryItem(id):
    collection = GetCollection("inventory")
    result = collection.find_one({'_id': ObjectId(id)})
    return result

def UpdateInventoryItem(id, update):
    collection = GetCollection("inventory")
    query_filter = {'_id': ObjectId(id)}
    result = collection.update_one(query_filter, update)
    return result.modified_count > 0

def RemoveInventoryItem(id):
    collection = GetCollection("inventory")
    query_filter = {'_id': ObjectId(id)}
    result = collection.delete_one(query_filter)
    return result.deleted_count > 0

def AddCategoryItem(document):
    collection = GetCollection("categories")
    result = collection.insert_one(document)
    return result.inserted_id

def GetCategoryItem(id):
    collection = GetCollection("categories")
    result = collection.find_one({'_id': ObjectId(id)})
    return result

def UpdateCategoryItem(id, update):
    collection = GetCollection("categories")
    query_filter = {'_id': ObjectId(id)}
    result = collection.update_one(query_filter, update)
    return result.modified_count > 0

def RemoveCategoryItem(id):
    collection = GetCollection("categories")
    query_filter = {'_id': ObjectId(id)}
    result = collection.delete_one(query_filter)
    return result.deleted_count > 0
