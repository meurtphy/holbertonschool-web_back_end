#!/usr/bin/env python3

def make_multiplier(multiplier: float) -> callable:
    """Create a function that multiplies a float by a given multiplier."""
    def multiply(n: float) -> float:
        return n * multiplier
    return multiply