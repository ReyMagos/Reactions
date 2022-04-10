from backend.content import Films


def search(start):
    ans = []
    for val in Films.mas:
        if val[:min(len(val), len(start))] == start:
            ans.append(val)
    return ans
