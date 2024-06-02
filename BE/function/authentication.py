import os
import json, datetime
from datetime import timedelta
from bson import ObjectId
from mongoDB.databaseAPI import GetCollection, AddDocument, RemoveDocument

def check_session(sessionID, accountID) -> bool:
    """
    Check if there is any collection match sessionID and accountID in "sessions" collection

    :param sessionID: the sessionID of the session
    :param accountID: the accountID of the session
    :return: True if there is any collection match sessionID and accountID, False otherwise
    """
    sessions = GetCollection("sessions")
    query_filter = {'_id': ObjectId(sessionID), 'accountID': accountID}
    result = sessions.find(query_filter)
    return bool(list(result))

def create_session(accountID: str, sessionType: str) -> str:
    """
    Create a new session in the collection "sessions" and return the ID of ObjectID of "_id" as sessionID

    :param accountID: the accountID of the session
    :param sessionType: the sessionType of the session, can only be "temp" or "fixed"
    :return: the sessionID (string) of the new session
    """
    sessions = GetCollection("sessions")
    sessionCreatedDate = datetime.utcnow()
    if sessionType == "fixed":
        sessionEndDate = sessionCreatedDate + timedelta(days=30)
    else:
        sessionEndDate = None
    document = {
        "sessionCreatedDate": sessionCreatedDate,
        "sessionEndDate": sessionEndDate,
        "sessionType": sessionType,
        "accountID": accountID
    }
    result = sessions.insert_one(document)
    return str(result.inserted_id)

def remove_expired_sessions():
    """
    Remove sessions that have expired or if the endDate is None or empty

    :return: number of sessions removed
    """
    sessions = GetCollection("sessions")
    now = datetime.utcnow()
    query_filter = {'$or': [{'sessionEndDate': {'$lt': now}}, {'sessionEndDate': None}]}
    result = sessions.delete_many(query_filter)
    return result.deleted_count
