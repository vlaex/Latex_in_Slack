import katex from "katex";

const renderEquationsContainer = () => {
  const equations = [
    {example: "x^{2}"},
    {example: "\\sqrt{x}"},
    {example: "\\sqrt[n]{x}"},
    {example: "\\frac{x}{y}"},
    {example: "x_{123}"},
    {example: "\\leq"},
    {example: "\\geq"},
    {example: "\\pi"},
    {example: "\\alpha"},
    {example: "\\beta"}
  ];

  const container = document.createElement("div");
  container.classList.add("hidden", "katex-equations-btns");

  const buttons = equations.map(equation => {
    const equationWithSigns = `$ ${equation.example} $ `;
    const button = document.createElement("button");

    button.classList.add("p-composer__button--sticky", "c-icon_button");

    button.innerHTML = katex.renderToString(equation.example);
    button.onclick = () => {
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      range.deleteContents();

      let node = document.createTextNode(equationWithSigns);
      range.insertNode(node);

      for (let i = 0; i !== equationWithSigns.length; i++) {
        selection.modify("move", "right", "character");
      }
    }

    return button;
  });

  container.append(...buttons);

  return container;
}

setInterval(_ => {
  const composer = document.querySelector(".c-wysiwyg_container div[role=toolbar] .p-composer__body");
  if (!composer || composer.dataset.latexAdded) return;

  composer.dataset.latexAdded = true;

  const latexBtn = document.createElement("button");
  latexBtn.classList.add(
    "c-icon_button",
    "c-icon_button--light",
    "c-icon_button--size_small",
    "p-composer__button",
    "p-composer__button--composer_ia",
    "p-composer__button--sticky"
  );

  latexBtn.title = "LaTeX";
  latexBtn.innerHTML = katex.renderToString("L");

  composer.append(latexBtn);

  latexBtn.parentElement.parentElement.append(renderEquationsContainer());

  latexBtn.onclick = () => {
    latexBtn.parentElement.parentElement
      .querySelector(".katex-equations-btns")
      .classList
      .toggle("hidden");
  };

}, 1000);