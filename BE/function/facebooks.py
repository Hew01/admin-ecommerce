import os
import json, requests
from bson import ObjectId
import facebook as fb
from mongoDB import databaseAPI as db

FACEBOOK_PAGEID = "106547555885440"
FACEBOOK_ACCESS_TOKEN = "EAADr2C3NhfMBO0PZCHkLtyXrfahxEoWI8QqduOpXHtNuZAZCUrQxq1JADt6tl40cZCNCccYezxZA5W9ZBxIuaOoMqTw7GJ7zJwdFNRZAfgEphH5KUJ0Gb1mFkK9LwHrAROZBZB5RrPvZBlbg190R1xTIjZCCexqY8hNlNasb0VnfYw9E7ggFewjkGqqwcZChYIfmA3iNLcgZCbPZCNZCtK0iyjVN8IhRIsZD"

fbCall = fb.GraphAPI(FACEBOOK_ACCESS_TOKEN)

def postFacebook(parentObject, connectionName, imagePath, postMessage):
    result = None
    returnResult = None
    if(imagePath == ""):
        result = fbCall.put_object(parentObject, connectionName, message = postMessage)
        posts = db.GetCollection("posts")
        returnResult = posts.insert_one({
                "postID": result["id"],
                "message": postMessage,
                "pageID": FACEBOOK_PAGEID,
                "parentObject": parentObject,
                "connectionName": connectionName
        }).inserted_id
    else:
        response = requests.get(imagePath)
        if(response.status_code == 200):
            result = fbCall.put_photo(response.content, message = postMessage)
            posts = db.GetCollection("posts")
            returnResult =posts.insert_one({
                "postID": result["id"],
                "message": postMessage,
                "pageID": FACEBOOK_PAGEID,
                "parentObject": parentObject,
                "connectionName": connectionName
            }).inserted_id

    return returnResult

def getFollower():
    url = "https://graph.facebook.com/{}?fields=fan_count&access_token={}".format(FACEBOOK_PAGEID, FACEBOOK_ACCESS_TOKEN)
    result = requests.get(url)
    if(result.status_code == 200):
        return result.json()
    
def GetInteraction(postid):
    url = "https://graph.facebook.com/{}/?fields=comments,shares,reactions&access_token={}".format(postid, FACEBOOK_ACCESS_TOKEN)
    print(url)
    string = url
    result = requests.get(string)
    return result.json()

def GetAllPost():
    url = "https://graph.facebook.com/{}/?fields=posts&access_token={}".format(FACEBOOK_PAGEID, FACEBOOK_ACCESS_TOKEN)
    result = requests.get(url)
    if(result.status_code == 200):
        return result.json()
    else:
        return{
            "openrationSuccess": False
        }

def CommentToPost(postID, message):
    return fbCall.put_object(postID, "comments", message = message)


def getPost(postID):
    return fbCall.get_object(postID)

def DeletePost(postID):
    url = "https://graph.facebook.com/{}/?access_token={}".format(postID, FACEBOOK_ACCESS_TOKEN)
    result = requests.delete(url)
    if(result.status_code == 200):
        posts = db.GetCollection("posts")
        posts.delete_one({"postID": postID})
        return {
            "openrationSuccess": result.json()["success"]
        }
    else:
        return {
            "openrationSuccess": False
        }

