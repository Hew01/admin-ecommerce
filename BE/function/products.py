import os
import json
from bson import ObjectId
import mongoDB.databaseAPI as db
def GetAllProduct():
    products = db.GetCollection("products")
    result = products.find({})
    resultsList = list()
    for product in result:
        inventory = db.GetCollection("inventory").find_one({"productID": product["_id"]})
        category = db.GetCollection("categories").find_one({"_id": product["category"]})
        newResult = {
        "_id": str(product["_id"]),
        "productName": product["productName"],
        "price": product["price"],
        "Detailed Info": product["Detailed Info"],
        "images": product["images"],
        "brand": product["brand"],
        "description": product["description"],
        "category": category["categoryName"],
        "quantity": inventory["quantity"],
        "instockStatus": inventory["instockStatus"],
        "publishStatus": inventory["publishStatus"],
        }
        resultsList.append(newResult)

    return resultsList

def GetProductByID(id):
    products = db.GetCollection("products")
    result = products.find_one({'_id': ObjectId(id)})
    inventory = db.GetCollection("inventory").find_one({"productID": result["_id"]})
    category = db.GetCollection("categories").find_one({"_id": result["category"]})
    newResult = {
        "_id": str(result["_id"]),
        "productName": result["productName"],
        "price": result["price"],
        "Detailed Info": result["Detailed Info"],
        "images": result["images"],
        "brand": result["brand"],
        "description": result["description"],
        "category": category["categoryName"],
        "quantity": inventory["quantity"],
        "instockStatus": inventory["instockStatus"],
        "publishStatus": inventory["publishStatus"],
        }    
    
    return newResult

def FindProductByName(name):
    products = db.GetCollection("products")
    search_regex = {"$regex": name, "$options": "i"}
    result = products.find({'productName': search_regex})
    resultsList = list()
    for product in result:
        inventory = db.GetCollection("inventory").find_one({"_id": product["inventory"]})
        category = db.GetCollection("categories").find_one({"_id": product["category"]})
        newResult = {
        "_id": str(product["_id"]),
        "productName": product["productName"],
        "price": product["price"],
        "Detailed Info": product["Detailed Info"],
        "images": product["images"],
        "brand": product["brand"],
        "description": product["description"],
        "category": category["categoryName"],
        "quantity": inventory["quantity"],
        "instockStatus": inventory["instockStatus"],
        "publishStatus": inventory["publishStatus"],
        }
        resultsList.append(newResult)

    return resultsList

def AddProduct(collectionName, document):
    insertDocument = {       
    "productName": document["productName"],
    "category": ObjectId(document["category"]),
    "price": document["price"],
    "Detailed Info": document["Detailed Info"],
    "images": document["images"],
    "brand": document["brand"],
    "description": document["description"],
    }
    result = db.AddDocument(collectionName, insertDocument)
    returnResult = db.AddInventoryItem({
        "productID": result.inserted_id,
        "quantity": 0,
        "instockStatus": False,
        "publishStatus": "inactive"
    })
    returnResult = db.UpdateCategoryItem(document["category"], {"$inc": {"productQuantity": 1}})
    return returnResult

def RemoveProduct(collectionName, id):
    document = db.GetCollection(collectionName).find_one({'_id': ObjectId(id)})
    inventory = db.GetCollection("inventory").find_one({"productID": document["_id"]})
    result = db.RemoveInventoryItem(inventory["_id"])
    result = db.UpdateCategoryItem(document["category"], {"$inc": {"productQuantity": -1}})
    result = db.RemoveDocument(collectionName, id)  
    return result

def UpdateProduct(productID, document):
    """
    Update data of one document in "products" collection.
    
    :param productID: the productID is how we find the document that need update. The productID is the ObjectID of the document
    :param updateDocument: updateDocument (json object) will containt these field: productName, brand, price, Detailed Info, images, decription, componentType. It will update a field in the document
    :return: True if update success, else False
    """
    updateDocument = {       
    "productName": document["productName"],
    "price": document["price"],
    "Detailed Info": document["Detailed Info"],
    "images": document["images"],
    "brand": document["brand"],
    "description": document["description"],
    "category": ObjectId(document["category"]),
    }
    result = db.UpdateDocument("products", productID, updateDocument)
    return result

def GetCompactProducts():  
    products = GetAllProduct()
    results = list()
    for product in products:
        if(product["publishStatus"] == "publishing" and product["instockStatus"] == True):
            results.append(product)
    return results
