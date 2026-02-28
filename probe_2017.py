import urllib.request
import fitz

def test_type(sem, unit, suf):
    url = f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit:02d}{suf}.pdf"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        pdf_data = urllib.request.urlopen(req).read()
        with open("test.pdf", 'wb') as f:
            f.write(pdf_data)
        doc = fitz.open("test.pdf")
        text = doc[0].get_text()
        print(f"{sem} {suf}:\n{text[:100].replace(chr(10), ' ')}")
    except Exception as e:
        print(f"Failed {sem} {suf}")

test_type("2017FA", 1, "A")
test_type("2017FA", 1, "B")
test_type("2017SP", 1, "A")
test_type("2017SP", 1, "B")
test_type("2018FA", 1, "A")
test_type("2018FA", 1, "B")
