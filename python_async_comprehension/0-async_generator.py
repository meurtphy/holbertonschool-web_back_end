#!/usr/bin/env python3
"""Coroutine that asynchronously generates random numbers."""

import asyncio
import random
from typing import AsyncGenerator


async def async_generator() -> AsyncGenerator[float, None]:
    """Generate 10 random numbers between 0 and 10,"""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.random() * 10
