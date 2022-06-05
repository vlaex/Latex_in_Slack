import renderMathInElement from "katex/contrib/auto-render";
// import replaceTextWithLatex from "./replaceTextWithLatex";

setInterval(_ => {
  const items = document.querySelectorAll(".c-virtual_list__item");
  if (!items.length) return;

  for (let item of items) {
    if (item.dataset.latexChecked) continue;

    renderMathInElement(item, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\(", right: "\\)", display: false},
        {left: "\\[", right: "\\]", display: true}
      ],
      throwOnError: false
    });

    item.dataset.latexChecked = "true";
  }
}, 1000);