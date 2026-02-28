import requests

semesters = ["2019SP", "2018FA", "2018SP"]
suffixes_mcq = ["W", "B", "mcq"]
suffixes_frq = ["C", "A", "frq"]
suffixes_sol = ["R", "sol", "rubric", "solutions"]

def check(url):
    try:
        r = requests.head(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=2)
        if r.status_code == 200:
            print(f"FOUND: {url}")
            return True
    except:
        pass
    return False

for sem in semesters:
    for s in suffixes_mcq:
        check(f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet01{s}.pdf")
    for s in suffixes_frq:
        check(f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet01{s}.pdf")
    for s in suffixes_sol:
        check(f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet01{s}.pdf")

# Also check final exam formats
for sem in semesters:
    check(f"http://jacobprabhu.com/cs173/CS_173_{sem}_final.pdf")
    check(f"http://jacobprabhu.com/cs173/CS_173_{sem}_final_sol.pdf")
    check(f"http://jacobprabhu.com/cs173/CS_173_{sem}_finalR.pdf")
