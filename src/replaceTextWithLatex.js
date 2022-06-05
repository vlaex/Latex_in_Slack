import katex from "katex";

export default (text) => {
  return text
    .replaceAll("<br>", "\n")
    .replace(/\$[^\$]+\$/g, _latex => {
      _latex = _latex
        .replaceAll("$", "")
        .replaceAll("\n", "\\\\")
        .replace(/ +/g, " ")
        .replace(/&amp;/g, "&");

      return katex.renderToString(_latex, {
        throwOnError: false
      });
    })
    .replaceAll("\n", "<br>");
};