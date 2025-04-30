#!/usr/bin/env python3
"""Insert a new document in a MongoDB collection"""


def insert_school(mongo_collection, **kwargs):
    """Inserts a new document into a MongoDB collection using kwargs"""
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id