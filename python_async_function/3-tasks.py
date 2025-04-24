#!/usr/bin/env python3
"""
Module that defines task_wait_random function to create asyncio Tasks.
"""

import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random

def task_wait_random(max_delay: int) -> asyncio.Task:
    """
    Creates and returns an asyncio.Task for wait_random with max_delay.

    Args:
        max_delay (int): The maximum delay for the wait_random call.

    Returns:
        asyncio.Task: An asyncio Task that will run wait_random.
    """
    return asyncio.create_task(wait_random(max_delay))
