import urllib.request

req = urllib.request.Request(
    'https://jacobprabhu.com/uiuc/', 
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    with open('c:\\Users\\wildc\\OneDrive\\cs173-practice\\html_out.txt', 'w', encoding='utf-8') as f:
        f.write(html)
    print("HTML saved.")
except Exception as e:
    print(f"Error: {e}")
