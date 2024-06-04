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
    return result.matched_count > 0

def RemoveDocument(collectionName, id):
    collection = GetCollection(collectionName)
    query_filter = {'_id': ObjectId(id)}
    result = collection.delete_one(query_filter)
    return result

def parse_json(data):
    return json.loads(json_util.dumps(data))


def FindDocuemntByString(collectionName, fieldName, string):
    products = GetCollection(collectionName)
    search_regex = {"$regex": string, "$options": "i"}
    result = products.find({fieldName: search_regex})
    return result
