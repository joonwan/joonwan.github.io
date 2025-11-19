// GitHub-style alerts for Jekyll
// Converts blockquotes with [!NOTE], [!TIP], etc. into styled alert boxes

document.addEventListener('DOMContentLoaded', function() {
  const alertTypes = {
    'NOTE': 'note',
    'TIP': 'tip',
    'IMPORTANT': 'important',
    'WARNING': 'warning',
    'CAUTION': 'caution'
  };

  // Find all blockquotes
  const blockquotes = document.querySelectorAll('blockquote');

  blockquotes.forEach(blockquote => {
    const firstParagraph = blockquote.querySelector('p:first-child');
    if (!firstParagraph) return;

    const text = firstParagraph.textContent.trim();

    // Check if it starts with [!TYPE]
    const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
    if (!match) return;

    const alertType = match[1];
    const alertClass = alertTypes[alertType];

    // Remove the [!TYPE] marker from the text
    const remainingText = text.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/, '');

    // Transform the blockquote into an alert
    blockquote.classList.add('markdown-alert', `markdown-alert-${alertClass}`);

    // Create title element
    const title = document.createElement('div');
    title.className = 'markdown-alert-title';
    title.textContent = alertType.charAt(0) + alertType.slice(1).toLowerCase();

    // Update the first paragraph
    if (remainingText) {
      firstParagraph.textContent = remainingText;
    } else {
      firstParagraph.remove();
    }

    // Insert title at the beginning
    blockquote.insertBefore(title, blockquote.firstChild);
  });
});
