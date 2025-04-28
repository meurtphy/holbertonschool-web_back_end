#!/usr/bin/env python3
"""Coroutine that asynchronously generates random numbers."""

import asyncio
import random
from typing import Generator, Any


async def async_generator() -> Generator[float, None, None]: #type: ignore
    """Generate 10 random numbers between 0 and 10, waiting 1 second between each."""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
