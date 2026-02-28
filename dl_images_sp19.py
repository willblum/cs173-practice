import urllib.request
import os
import fitz

def get_image(url, out_name):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    pdf_data = urllib.request.urlopen(req).read()
    with open("temp.pdf", 'wb') as f:
        f.write(pdf_data)
        
    doc = fitz.open("temp.pdf")
    # render page 0 (which has the graphs)
    page = doc.load_page(0)
    # Clip the page to just the upper/middle half if possible, or just render the whole page.
    # We will just render the whole page for now since it contains the graph.
    mat = fitz.Matrix(2.0, 2.0)
    pix = page.get_pixmap(matrix=mat)
    pix.save(f"images/{out_name}")
    print(f"Saved {out_name}")

get_image("http://jacobprabhu.com/cs173/CS_173_2019SP_examlet07W.pdf", "sp19_ex7_mcq.png")
get_image("http://jacobprabhu.com/cs173/CS_173_2019SP_examlet07C.pdf", "sp19_ex7_frq.png")
get_image("http://jacobprabhu.com/cs173/CS_173_2019SP_examlet09W.pdf", "sp19_ex9_mcq.png")
get_image("http://jacobprabhu.com/cs173/CS_173_2019SP_examlet09C.pdf", "sp19_ex9_frq.png")
