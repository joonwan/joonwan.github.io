document.addEventListener('DOMContentLoaded', () => {
  const postBody = document.getElementById('post-body');
  const toc = document.getElementById('post-toc');
  const tocCard = document.getElementById('post-toc-card');

  if (!postBody || !toc || !tocCard) {
    return;
  }

  const headings = [...postBody.querySelectorAll('h2, h3')];

  if (headings.length === 0) {
    return;
  }

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-가-힣]/g, '')
      .replace(/\s+/g, '-');

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `${slugify(heading.textContent) || 'section'}-${index + 1}`;
    }

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.className = `post-toc-link post-toc-link-depth-${heading.tagName.slice(1)}`;
    link.textContent = heading.textContent;
    toc.appendChild(link);
  });

  tocCard.hidden = false;

  const links = [...toc.querySelectorAll('.post-toc-link')];

  const setActiveLink = (id) => {
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveLink(visible[0].target.id);
      }
    },
    {
      rootMargin: '-18% 0px -70% 0px',
      threshold: [0, 1],
    }
  );

  headings.forEach((heading) => observer.observe(heading));
});
