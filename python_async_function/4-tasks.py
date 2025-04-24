#!/usr/bin/env python3
"""
Module that defines task_wait_n to run multiple.
"""

import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawns task_wait_random n times and returns the list of delays
    in the order of completion.

    Args:
        n (int): Number of tasks to create.
        max_delay (int): Maximum delay for each task.

    Returns:
        List[float]: List of actual delays, sorted by completion order.
    """
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays = []

    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)

    return delays
