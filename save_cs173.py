import urllib.request
import re

req = urllib.request.Request(
    'http://jacobprabhu.com/cs173', 
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    with open('c:\\Users\\wildc\\OneDrive\\cs173-practice\\html_out2.txt', 'w', encoding='utf-8') as f:
        f.write(html)
    print("CS173 HTML saved.")
except Exception as e:
    print(f"Error: {e}")
