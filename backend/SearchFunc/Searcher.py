from backend.content import Films


def search(start):
    start = start.lower()
    ans = []
    for val in Films.mas:
        if val[:min(len(val), len(start))].lower() == start:
            ans.append(val)
    return ans
