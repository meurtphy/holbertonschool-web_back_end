#!/usr/bin/env python3
"""Hypermedia pagination module."""

import csv
import math
from typing import Dict, List


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
            List[List]: the dataset without the header row
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Remove header
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Return a page of the dataset.

        Args:
            page (int): page number (starts at 1)
            page_size (int): number of items per page

        Returns:
            List[List]: page of the dataset
        """
        assert (
            isinstance(page, int) and page > 0
        ), "Page must be a positive integer"
        assert (
            isinstance(page_size, int) and page_size > 0
        ), "Page size must be a positive integer"

        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        dataset = self.dataset()

        if start_index >= len(dataset):
            return []

        return dataset[start_index:end_index]

    def get_hyper(
        self, page: int = 1, page_size: int = 10
    ) -> Dict[str, object]:
        """
        Return pagination details with hypermedia metadata.

        Args:
            page (int): page number (starts at 1)
            page_size (int): number of items per page

        Returns:
            Dict[str, object]: metadata and page content.
        """
        data = self.get_page(page, page_size)
        dataset = self.dataset()
        total_pages = math.ceil(len(dataset) / page_size)

        return {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': page + 1 if page < total_pages else None,
            'prev_page': page - 1 if page > 1 else None,
            'total_pages': total_pages
        }
