#!/usr/bin/env python3
"""Module that defines the make_multiplier function."""

from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Return a function that multiplies a float by the given multiplier."""
    def multiplier_func(x: float) -> float:
        """Multiply a float by the outer multiplier."""
        return x * multiplier
    return multiplier_func
