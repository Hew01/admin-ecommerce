import os
import json
from bson import ObjectId
from mongoDB.databaseAPI import GetCollection, AddDocument, RemoveDocument

def GetAllProduct():
    products = GetCollection("products")
    result = products.find({})
    return result

def GetProductByID(id):
    products = GetCollection("products")
    result = products.find_one({'_id': ObjectId(id)})
    return result

def FindProductByName(name):
    products = GetCollection("products")
    search_regex = {"$regex": name, "$options": "i"}
    result = products.find({'productName': search_regex})
    return result

def AddProduct(collectionName, json_object):
    result = AddDocument(collectionName, json_object)
    return result

def RemoveProduct(collectionName, id):
    result = RemoveDocument(collectionName, id)
    return result