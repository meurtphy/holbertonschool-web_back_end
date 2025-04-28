#!/usr/bin/env python3
"""Measure the total runtime of executing async_comprehension 4 times in parallel."""

import asyncio
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension

async def measure_runtime() -> float:
    """Execute async_comprehension four times in parallel and measure the total runtime."""
    start_time = time.perf_counter()

    # Create a list of coroutines
    coroutines = [async_comprehension() for _ in range(4)]

    # Run them in parallel
    await asyncio.gather(*coroutines)

    end_time = time.perf_counter()

    return end_time - start_time
