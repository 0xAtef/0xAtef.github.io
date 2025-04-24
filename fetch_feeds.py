import feedparser
import json
from datetime import datetime, timedelta

feeds = {
    "HackerNews": "https://feeds.feedburner.com/TheHackersNews",
    "Krebs": "https://krebsonsecurity.com/feed/",
    "BleepingComputer": "https://www.bleepingcomputer.com/feed/"
}

data = []
now = datetime.utcnow()

for source, url in feeds.items():
    parsed = feedparser.parse(url)
    for entry in parsed.entries:
        pub_date = entry.get('published_parsed') or entry.get('updated_parsed')
        if not pub_date:
            continue

        published_dt = datetime(*pub_date[:6])
        published = published_dt.isoformat()

        item = {
            "title": entry.get("title", "Untitled"),
            "link": entry.get("link", "#"),
            "summary": entry.get("summary", "No summary.")[:300],
            "published": published,
            "source": source
        }

        # Optional: skip entries with any missing critical fields
        if all(item.values()):
            if (now - published_dt) <= timedelta(minutes=720):
                data.append(item)

# Sort by latest published
data.sort(key=lambda x: x["published"], reverse=True)

with open("_data/feeds.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
