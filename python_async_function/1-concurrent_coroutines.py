#!/usr/bin/env python3
"""
Module that defines the wait_n function.
It uses asynchronous programming to run multiple coroutines
that wait for a random delay and returns the delays in ascending order.
"""

import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random

async def wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawns wait_random n times with the specified max_delay and
    returns the list of all the delays in ascending order.

    Args:
        n (int): Number of times to spawn wait_random.
        max_delay (int): The maximum delay for each wait_random call.

    Returns:
        List[float]: A list of all the delays in ascending order.
    """
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]
    delays = []

    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)

    return delays
