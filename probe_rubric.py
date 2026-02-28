import urllib.request
import fitz

url = "http://jacobprabhu.com/cs173/CS_173_2019SP_examlet01W.pdf"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
pdf_data = urllib.request.urlopen(req).read()
with open("test.pdf", 'wb') as f:
    f.write(pdf_data)
doc = fitz.open("test.pdf")
print("Pages in 01W:", len(doc))
for i, page in enumerate(doc):
    text = page.get_text()
    if "rubric" in text.lower() or "solution" in text.lower():
        print("Found rubric on page", i)

url = "http://jacobprabhu.com/cs173/CS_173_2018FA_examlet01A.pdf"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
pdf_data = urllib.request.urlopen(req).read()
with open("test.pdf", 'wb') as f:
    f.write(pdf_data)
doc = fitz.open("test.pdf")
print("Pages in 01A:", len(doc))
for i, page in enumerate(doc):
    text = page.get_text()
    if "rubric" in text.lower() or "solution" in text.lower():
        print("Found rubric on page", i)
