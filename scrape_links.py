import urllib.request
import re
import json

url = "http://jacobprabhu.com/cs173/"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find all hrefs
    links = re.findall(r'href="([^"]+)"', html)
    
    pdfs = [l for l in links if l.endswith('.pdf') and '173' in l]
    
    with open("jacob_links.json", "w") as f:
        json.dump(pdfs, f, indent=2)
    print(f"Found {len(pdfs)} PDFs.")
except Exception as e:
    print(f"Error: {e}")
