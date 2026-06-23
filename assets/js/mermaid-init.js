document.addEventListener('DOMContentLoaded', async () => {
  const mermaidCodeBlocks = document.querySelectorAll('pre code.language-mermaid');

  if (mermaidCodeBlocks.length === 0) {
    return;
  }

  mermaidCodeBlocks.forEach((codeBlock, index) => {
    const pre = codeBlock.closest('pre');
    if (!pre) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'mermaid';
    wrapper.id = `mermaid-diagram-${index + 1}`;
    wrapper.textContent = codeBlock.textContent.trim();

    const figure = document.createElement('figure');
    figure.className = 'mermaid-figure';
    figure.appendChild(wrapper);

    const container = pre.parentElement && pre.parentElement.classList.contains('highlighter-rouge')
      ? pre.parentElement
      : pre;

    container.replaceWith(figure);
  });

  const mermaidModule = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');

  mermaidModule.default.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    themeVariables: {
      background: '#191815',
      primaryColor: '#1f1d19',
      primaryTextColor: '#ece3d2',
      primaryBorderColor: '#4a4133',
      lineColor: '#b8955c',
      secondaryColor: '#24211c',
      tertiaryColor: '#1b1916',
      noteBkgColor: '#24211c',
      noteTextColor: '#ece3d2',
      noteBorderColor: '#5a4a32',
      actorBkg: '#1f1d19',
      actorBorder: '#5a4a32',
      actorTextColor: '#fff9ec',
      sequenceNumberColor: '#ece3d2',
      signalColor: '#c5a66b',
      labelBoxBkgColor: '#1f1d19',
      labelBoxBorderColor: '#5a4a32',
      labelTextColor: '#ece3d2',
      loopTextColor: '#ece3d2'
    }
  });

  await mermaidModule.default.run({
    querySelector: '.mermaid'
  });
});
