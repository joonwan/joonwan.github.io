---
layout: post
title: Projects
show_meta: false
---

<section class="projects-index-list">
  {% for project in site.data.projects.items %}
    <article class="project-card">
      <a class="project-card-image" href="{{ '/projects/' | append: project.slug | relative_url }}">
        <img src="{{ project.image | relative_url }}" alt="{{ project.title }} cover image" />
      </a>
      <div class="project-card-body">
        <p class="project-card-meta">{{ project.period }} · {{ project.role }}</p>
        <h2><a href="{{ '/projects/' | append: project.slug | relative_url }}">{{ project.title }}</a></h2>
        <p class="project-card-summary">{{ project.summary }}</p>
        <p class="project-card-description">{{ project.description }}</p>
        <div class="project-card-actions">
          <div class="project-card-tags">
            {% for tag in project.tags %}
              <span>{{ tag }}</span>
            {% endfor %}
          </div>
          <a class="project-card-link" href="{{ '/projects/' | append: project.slug | relative_url }}">View Project <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  {% endfor %}
</section>
