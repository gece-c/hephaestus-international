import html as html_lib
import json
import re
import urllib.request

raw = urllib.request.urlopen("https://www.bootcampuniversity.org/projects").read().decode(
    "utf-8", errors="replace"
)

# Each card is an <article> or <a> block - split by Visit aria-label
parts = re.split(r'aria-label="Visit ', raw)
projects = []
for part in parts[1:]:
    title_m = re.match(r'([^"]+)"', part)
    if not title_m:
        continue
    title = html_lib.unescape(title_m.group(1))
    href_m = re.search(r'href="([^"]+)"', part[:500])
    href = href_m.group(1) if href_m else ""
    desc_m = re.search(r"<p class=\"mt-3[^\"]*\">([^<]+)</p>", part)
    if not desc_m:
        desc_m = re.search(r"<p[^>]*class=\"[^\"]*mt-3[^\"]*\"[^>]*>([^<]+)</p>", part)
    desc = html_lib.unescape(desc_m.group(1)) if desc_m else ""
    focus = [
        html_lib.unescape(x)
        for x in re.findall(r"<li>([^<]+)</li>", part[:2500])
    ]
    projects.append(
        {"title": title, "href": href, "description": desc, "focus": focus}
    )

with open(
    r"D:\Code Work\hephaestus-international\scripts\bootcamp-projects.json",
    "w",
    encoding="utf-8",
) as f:
    json.dump(projects, f, indent=2)

print(len(projects), "projects")
