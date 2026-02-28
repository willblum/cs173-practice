import re
import requests

html = requests.get('http://jacobprabhu.com/cs173/').text
matches = re.findall(r'href="(CS_173_[^"]*examlet01[^"]*)"', html)
for m in sorted(set(matches)):
    print(m)
