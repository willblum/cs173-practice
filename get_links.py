import urllib.request
import re

req = urllib.request.Request(
    'https://jacobprabhu.com/uiuc/', 
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = re.findall(r'href="([^"]+\.pdf)"', html)
    
    # filter for cs173 or examlet
    cs173_links = [l for l in links if '173' in l or 'exam' in l.lower()]
    print("Found links:")
    for l in set(cs173_links):
        print(l)
except Exception as e:
    print(f"Error: {e}")
