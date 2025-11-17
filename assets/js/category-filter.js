document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const postItems = document.querySelectorAll('.post-list-item');
  const searchInput = document.getElementById('search-input');
  const clearButton = document.getElementById('clear-search');
  const postList = document.getElementById('post-list');

  let currentCategory = 'all';
  let currentSearchTerm = '';

  // Filter posts based on both category and search
  function filterPosts() {
    let visibleCount = 0;

    postItems.forEach(post => {
      const postCategory = post.getAttribute('data-category');
      const postTitle = post.querySelector('a').textContent.toLowerCase();
      const postCategoryText = post.querySelector('.post-category')?.textContent.toLowerCase() || '';
      const searchText = postTitle + ' ' + postCategoryText;

      // Check category filter
      const categoryMatch = currentCategory === 'all' || postCategory === currentCategory;

      // Check search filter
      const searchMatch = currentSearchTerm === '' || searchText.includes(currentSearchTerm.toLowerCase());

      if (categoryMatch && searchMatch) {
        post.classList.remove('hidden');
        visibleCount++;
      } else {
        post.classList.add('hidden');
      }
    });

    // Show "no results" message if needed
    updateNoResultsMessage(visibleCount);
  }

  // Update or create "no results" message
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
    } else {
      if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
      }
    }
  }

  // Category button click handler
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      currentCategory = this.getAttribute('data-category');

      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      filterPosts();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearchTerm = this.value;

      // Show/hide clear button
      if (currentSearchTerm) {
        clearButton.style.display = 'block';
      } else {
        clearButton.style.display = 'none';
      }

      filterPosts();
    });
  }

  // Clear search button handler
  if (clearButton) {
    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      currentSearchTerm = '';
      this.style.display = 'none';
      filterPosts();
      searchInput.focus();
    });
  }
});
