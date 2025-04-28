#!/usr/bin/env python3
"""Simple """

import asyncio
from typing import List

# Import correct selon Holberton
async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """Collecte 10 nombres aléatoires"""
    return [i async for i in async_generator()]
