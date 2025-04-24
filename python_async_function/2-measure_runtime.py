#!/usr/bin/env python3
"""
Module that measures the total runtime of executing wait_n function.
"""

import time
from typing import Callable
wait_n = __import__('1-concurrent_coroutines').wait_n

def measure_time(n: int, max_delay: int) -> float:
    """
    Measures the average runtime per coroutine for wait_n.

    Args:
        n (int): Number of times to run wait_random.
        max_delay (int): The maximum delay for each coroutine.

    Returns:
        float: Average execution time per coroutine.
    """
    start = time.time()
    __import__('asyncio').run(wait_n(n, max_delay))
    end = time.time()
    total_time = end - start
    return total_time / n
