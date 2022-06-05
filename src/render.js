// import renderMathInElement from "katex/contrib/auto-render";
import replaceTextWithLatex from "./replaceTextWithLatex";

setInterval(_ => {
  const items = document.querySelectorAll(".c-virtual_list__item");
  if (!items.length) return;

  for (let item of items) {
    if (item.dataset.latexChecked) continue;

    const sections = item.querySelectorAll(".p-rich_text_section");

    for (let section of sections) {
      section.innerHTML = replaceTextWithLatex(section.innerHTML);
    }

    item.dataset.latexChecked = "true";
  }
}, 1000);