from backend.content import Films


def search(start):
    start = start.lower()
    ans = []
    for i in range(len(Films.mas)):
        val = Films.mas[i]
        if val[:min(len(val), len(start))].lower() == start:
            ans.append((val, i))
    return ans
