#!/usr/bin/env python3
"""Simple helper function for pagination."""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Return a tuple of (start index, end index) for pagination.

    Args:
        page (int): Current page number (starts from 1).
        page_size (int): Number of items per page.

    Returns:
        Tuple[int, int]: Start and end indexes.
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)
