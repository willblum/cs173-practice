import urllib.request
req = urllib.request.Request(
    'https://jacobprabhu.com/uiuc/', 
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
)
try:
    print(urllib.request.urlopen(req).read().decode('utf-8')[:1000])
except Exception as e:
    print(f"Error: {e}")
