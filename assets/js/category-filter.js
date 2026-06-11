document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const postItems = document.querySelectorAll('.post-list-item');
  const searchInput = document.getElementById('search-input');
  const clearButton = document.getElementById('clear-search');
  const postList = document.getElementById('post-list');
  const params = new URLSearchParams(window.location.search);

  let currentCategory = params.get('category') || 'all';
  let currentSearchTerm = '';

  const validCategories = new Set(Array.from(categoryButtons).map(button => button.getAttribute('data-category')));
  if (!validCategories.has(currentCategory)) {
    currentCategory = 'all';
  }

  function syncCategoryButtons() {
    categoryButtons.forEach(button => {
      button.classList.toggle('active', button.getAttribute('data-category') === currentCategory);
    });
  }

  function syncCategoryQuery() {
    const url = new URL(window.location);
    if (currentCategory === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', currentCategory);
    }
    window.history.replaceState({}, '', url);
  }

  // Filter posts based on both category and search
  function filterPosts() {
    let visibleCount = 0;

    postItems.forEach(post => {
      const postCategory = post.getAttribute('data-category');
      const postTitle = post.querySelector('.post-list-title')?.textContent.toLowerCase() || '';
      const postCategoryText = post.querySelector('.post-category')?.textContent.toLowerCase() || '';
      const searchText = postTitle + ' ' + postCategoryText;

      const categoryMatch = currentCategory === 'all' || postCategory === currentCategory;
      const searchMatch = currentSearchTerm === '' || searchText.includes(currentSearchTerm.toLowerCase());

      if (categoryMatch && searchMatch) {
        post.classList.remove('hidden');
        visibleCount++;
      } else {
        post.classList.add('hidden');
      }
    });

    updateNoResultsMessage(visibleCount);
  }

  function updateNoResultsMessage(visibleCount) {
    let noResultsMsg = document.querySelector('.no-results');

    if (visibleCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results';
        noResultsMsg.textContent = 'No posts found matching your search.';
        postList.parentNode.insertBefore(noResultsMsg, postList.nextSibling);
      }
      noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      currentCategory = this.getAttribute('data-category');
      syncCategoryButtons();
      syncCategoryQuery();
      filterPosts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearchTerm = this.value;

      if (currentSearchTerm) {
        clearButton.style.display = 'block';
      } else {
        clearButton.style.display = 'none';
      }

      filterPosts();
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      currentSearchTerm = '';
      this.style.display = 'none';
      filterPosts();
      searchInput.focus();
    });
  }

  syncCategoryButtons();
  filterPosts();
});
