#!/usr/bin/env python3
"""Simple """
import asyncio
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Exécute 4 async_comprehension en parallèle et mesure le temps total."""
    start_time = time.time()

    # Lancer 4 fois async_comprehension en même temps
    await asyncio.gather(
        async_comprehension(),
        async_comprehension(),
        async_comprehension(),
        async_comprehension()
    )

    end_time = time.time()
    return end_time - start_time
