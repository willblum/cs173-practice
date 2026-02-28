import re

with open("units.html", "r", encoding="utf-8") as f:
    html = f.read()

def replacer(match):
    unit_num = match.group(1)
    # Unit 12 uses 'unit12_...' just like the others in the pdf compiler script.
    pdf_html = f"""<div class="pdf-links" style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 8px;">
          <a class="btn btn-secondary" href="pdfs/unit{unit_num}_mcq_compiled.pdf" target="_blank">📄 All MCQs</a>
          <a class="btn btn-secondary" href="pdfs/unit{unit_num}_frq_compiled.pdf" target="_blank">📄 All FRQs</a>
          <a class="btn btn-secondary" href="pdfs/unit{unit_num}_solutions_compiled.pdf" target="_blank">📝 All Solutions</a>
        </div>"""
    return f'<div class="unit-body collapsed" id="body-unit{unit_num}">\n        {pdf_html}'

# The regex matches `<div class="unit-body collapsed" id="body-unit(\d+)">` and then EVERYTHING until `</div>\n    </div>`
pattern = re.compile(r'<div class="unit-body collapsed" id="body-unit(\d+)">\s*<div class="mode-tabs">.*?</button>\s*</div>\s*<div class="progress-area".*?</div>\s*<div class="unit-content".*?</div>', re.DOTALL)

new_html = pattern.sub(replacer, html)

with open("units.html", "w", encoding="utf-8") as f:
    f.write(new_html)

print("units.html updated successfully.")
