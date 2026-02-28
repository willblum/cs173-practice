import re

with open("units.html", "r", encoding="utf-8") as f:
    html = f.read()

def replacer(match):
    unit_num = match.group(1)
    
    # Check if the solutions exist (the python compiler script guarantees it or it's just missing).
    # We will just write all 4 anchors, and let a sweeper script prune them if missing
    pdf_html = f"""<div class="pdf-links" style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 8px;">
          <a class="btn btn-secondary" href="pdfs/unit{unit_num}_mcq.pdf" target="_blank">📄 All MCQs</a>
          <a class="btn btn-primary" href="pdfs/unit{unit_num}_mcq_sol.pdf" target="_blank">✅ MCQ Solutions</a>
          <a class="btn btn-secondary" href="pdfs/unit{unit_num}_frq.pdf" target="_blank">📄 All FRQs</a>
          <a class="btn btn-primary" href="pdfs/unit{unit_num}_frq_sol.pdf" target="_blank">✅ FRQ Solutions</a>
        </div>"""
    return f'<div class="unit-body collapsed" id="body-unit{unit_num}">\n        {pdf_html}'

# Find the current unit-body elements 
pattern = re.compile(r'<div class="unit-body collapsed" id="body-unit(\d+)">\s*<div class="pdf-links".*?</div>', re.DOTALL)
new_html = pattern.sub(replacer, html)

with open("units.html", "w", encoding="utf-8") as f:
    f.write(new_html)

print("units.html updated successfully with four buttons.")
