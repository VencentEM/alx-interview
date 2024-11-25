#!/usr/bin/python3
"""
Making Change
"""


def makeChange(coins, total):
    """
    Function that determine the fewest number of coins needed to
    meet a given amount total
    """
    if total <= 0:
        return 0

    arr = [float('inf')] * (total + 1)
    arr[0] = 0

    for i in range(1, len(arr)):
        for j in range(len(coins)):
            if coins[j] <= i:
                arr[i] = min(arr[i], arr[i - coins[j]] + 1)

    if arr[i] != float('inf'):
        return arr[i]
    else:
        return -1
