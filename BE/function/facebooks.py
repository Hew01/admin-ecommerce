import os
import json, requests
from bson import ObjectId
import facebook as fb

FACEBOOK_ACCESS_TOKEN = "EAADr2C3NhfMBOzMnGLxN7ZAPUunnV6BV24xXRo5hZB3wqYeWJszRaI9KYOvv1nrgRye2XCzPYGZCiLzIbW4ZB3tRM4bbVv4WPVFoZAMsZCZBZC5WhZA3WCeAvJG3iNwo4V1o4QuJxPsTzQPcs3aDDSj0dIKlHdA6kLK05jX4tok9txeGu2ZAZBFZBxr83lL4upi9TzbC5KcKncjyhZCSZAEQZAnbTBIzJ0ZD"

fbCall = fb.GraphAPI(FACEBOOK_ACCESS_TOKEN)

def postFacebook(parentObject, connectionName, imagePath, postMessage):
    result = None
    if(imagePath == ""):
        result = fbCall.put_object(parentObject, connectionName, message = postMessage)
    else:
        response = requests.get(imagePath)
        if(response.status_code == 200):
            result = fbCall.put_photo(response.content, message = postMessage)
        else:
            result = {
                "operationStatus": "Failed to load image"
            }

    return result

def getFollower(id):
    url = "https://graph.facebook.com/{}?fields=fan_count&access_token={}".format(id, FACEBOOK_ACCESS_TOKEN)
    result = requests.get(url)
    if(result.status_code == 200):
        return result.json()
    
def GetInteraction(postid):
    url = "https://graph.facebook.com/{}/?fields=comments,shares,reactions&access_token={}".format(postid, FACEBOOK_ACCESS_TOKEN)
    print(url)
    string = url
    result = requests.get(string)
    return result.content

def GetAllPost(pageID):
    url = "https://graph.facebook.com/{}/?fields=posts&access_token=?".format(pageID)
    string = url+FACEBOOK_ACCESS_TOKEN
    result = requests.get(string)
    if(result.status_code == 200):
        return result.json()

def CommentToPost(postID, message):
    return fbCall.put_object(postID, "comments", message = message)


def getPost(postID):
    return fbCall.get_object(postID)


