#!/usr/bin/env python3
"""Module that defines the to_kv function."""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Return a tuple containing a string and the square of the number as a float."""
    return (k, float(v ** 2))
