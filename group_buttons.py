import re

with open("units.html", "r", encoding="utf-8") as f:
    html = f.read()

def replacer(match):
    full_block = match.group(0)
    # The regex captured everything inside `<div class="pdf-links"...> ... </div>`
    
    # We want to replace the generic 4 buttons with two groups
    # Group 1: MCQ (base + sol)
    # Group 2: FRQ (base + sol)
    
    # We'll extract the exact hrefs that exist in this block
    mcq_href = ""
    mcq_sol_href = ""
    frq_href = ""
    frq_sol_href = ""
    
    for line in full_block.split('\n'):
        m = re.search(r'href="([^"]+)"', line)
        if m:
            href = m.group(1)
            if "mcq_sol" in href: mcq_sol_href = href
            elif "mcq" in href: mcq_href = href
            elif "frq_sol" in href: frq_sol_href = href
            elif "frq" in href: frq_href = href
            
    # Rebuild the HTML
    res = '<div class="pdf-links">\n'
    
    # MCQ Group
    if mcq_href or mcq_sol_href:
        res += '  <div class="pdf-group">\n'
        if mcq_href:
            res += f'    <a class="btn btn-secondary" href="{mcq_href}" target="_blank">📄 All MCQs</a>\n'
        if mcq_sol_href:
            res += f'    <a class="btn btn-ghost btn-sol" href="{mcq_sol_href}" target="_blank">✅ Solutions</a>\n'
        res += '  </div>\n'
        
    # FRQ Group
    if frq_href or frq_sol_href:
        res += '  <div class="pdf-group">\n'
        if frq_href:
            res += f'    <a class="btn btn-secondary" href="{frq_href}" target="_blank">📄 All FRQs</a>\n'
        if frq_sol_href:
            res += f'    <a class="btn btn-ghost btn-sol" href="{frq_sol_href}" target="_blank">✅ Solutions</a>\n'
        res += '  </div>\n'
        
    res += '</div>'
    return res

pattern = re.compile(r'<div class="pdf-links" style="[^"]+">.*?</div>', re.DOTALL)
new_html = pattern.sub(replacer, html)

with open("units.html", "w", encoding="utf-8") as f:
    f.write(new_html)

print("units.html regrouped successfully.")
