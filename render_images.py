import fitz
import os

images_dir = "c:\\Users\\wildc\\OneDrive\\cs173-practice\\images"
os.makedirs(images_dir, exist_ok=True)

def render_page(pdf_path, page_num, out_name):
    doc = fitz.open(pdf_path)
    if page_num < len(doc):
        page = doc.load_page(page_num)
        zoom = 2.0
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        pix.save(os.path.join(images_dir, out_name))
        print(f"Saved {out_name}")

render_page("t_6.pdf", 0, "examlet6_p1.png")
render_page("t_6.pdf", 1, "examlet6_p2.png")
render_page("t_7.pdf", 1, "examlet7_p2.png")
render_page("t_9.pdf", 1, "examlet9_p2.png")
