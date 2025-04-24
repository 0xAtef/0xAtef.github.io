---
layout: page
icon: fas fa-rss
order: 4
title: "RSS Feeds"
---

<style>
/* Dark theme page background and text */
body {
  background-color: #121212;
  color: #e0e0e0;
}

/* Vertical list of cards */
.rss-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

/* Card styling for dark theme */
.post-card {
  background: #1e1e1e;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 1rem;
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.9);
}

/* Content inside cards */
.post-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #fff;
}
.post-summary {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 0.75rem;
}

/* Meta section */
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #aaa;
}
.badge {
  background: #007acc;
  color: #fff;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}
.post-date {
  font-style: italic;
}

.no-posts {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #888;
}

.feed-count {
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 0.5rem;
}
</style>

<h2>📰 Latest Cybersecurity Posts (Last 12 Hours)</h2>
<p class="feed-count">{{ site.data.feeds.size }} posts found</p>

{% if site.data.feeds and site.data.feeds.size > 0 %}
<div class="rss-list">
  {% for post in site.data.feeds %}
  <div class="post-card">
    <h3 class="post-title">
      <a href="{{ post.link }}" target="_blank" rel="noopener" style="color: #90caf9; text-decoration: none;">
        {{ post.title | escape }}
      </a>
    </h3>
    <p class="post-summary">{{ post.summary | strip_html | truncate: 200 }}</p>
    <div class="post-meta">
      <span class="badge">{{ post.source }}</span>
      <span class="post-date">
        {% if post.published %}
          {{ post.published | date: "%b %-d, %Y %H:%M" }}
        {% else %}
          Unknown date
        {% endif %}
      </span>
    </div>
  </div>
  {% endfor %}
</div>
{% else %}
<div class="no-posts">🚫 No posts published in the last 12 hours.</div>
{% endif %}
