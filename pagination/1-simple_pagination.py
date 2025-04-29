#!/usr/bin/env python3
"""Simple pagination module to paginate a database of popular baby names."""

import csv
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculate start and end indexes for pagination.

    Args:
        page (int): page number (starts at 1)
        page_size (int): number of items per page

    Returns:
        Tuple[int, int]: (start index, end index)
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initialize the server with no dataset loaded."""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Load and cache dataset from CSV file.

        Returns:
            List[List]: the dataset (excluding the header)
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Skip header
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Return a page of the dataset.

        Args:
            page (int): page number (starts at 1)
            page_size (int): number of items per page

        Returns:
            List[List]: a list of rows representing the requested page
        """
        assert (
            isinstance(page, int) and page > 0
        ), "Page must be a positive integer"
        assert (
            isinstance(page_size, int) and page_size > 0
        ), "Page size must be a positive integer"

        start, end = index_range(page, page_size)
        dataset = self.dataset()

        if start >= len(dataset):
            return []

        return dataset[start:end]
