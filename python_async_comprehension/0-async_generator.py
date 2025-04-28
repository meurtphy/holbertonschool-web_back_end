#!/usr/bin/env python3
import asyncio
import random


async def async_generator():
    """Coroutine qui génère 10 nombres aléatoires"""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
