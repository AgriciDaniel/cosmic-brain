export function setSpacing(margin: string, padding: string) {
  // Create a div element
  const div = document.createElement('div');

  // Set the margin of the div element
  div.style.margin = margin;
  div.style.padding = padding;
  div.className = margin + ' ' + padding;

  // Append the div to the document body
  document.body.appendChild(div);

  // Retrieve the computed margin values
  const computedStyle = window.getComputedStyle(div);
  const minSize = "18px";

  documentQuerySelector(".margin-top").style.height = computedStyle.marginTop;
  documentQuerySelector(".margin-right").style.width = computedStyle.marginRight;
  documentQuerySelector(".margin-bottom").style.height = computedStyle.marginBottom;
  documentQuerySelector(".margin-left").style.width = computedStyle.marginLeft;

  documentQuerySelector(".padding-top").style.height = computedStyle.paddingTop;
  documentQuerySelector(".padding-right").style.width = computedStyle.paddingRight;
  documentQuerySelector(".padding-bottom").style.height = computedStyle.paddingBottom;
  documentQuerySelector(".padding-left").style.width = computedStyle.paddingLeft;

  documentQuerySelector(".container").style.width =
    " calc(100px + 3px " +
    "+ max(" + computedStyle.marginLeft + ", " + minSize + ") " +
    "+ max(" + computedStyle.marginRight + ", " + minSize + ") " +
    "+ max(" + computedStyle.paddingLeft + ", " + minSize + ") " +
    "+ max(" + computedStyle.paddingRight + ", " + minSize + ") )";

  documentQuerySelector(".container").style.height =
    " calc(32px + 3px " +
    "+ max(" + computedStyle.marginTop + ", " + minSize + ") " +
    "+ max(" + computedStyle.marginBottom + ", " + minSize + ") " +
    "+ max(" + computedStyle.paddingTop + ", " + minSize + ") " +
    "+ max(" + computedStyle.paddingBottom + ", " + minSize + ") )";

  // Dimension values
  documentQuerySelector(".margin-top").innerHTML = parseFloat(computedStyle.marginTop).toString();
  documentQuerySelector(".margin-right").innerHTML = parseFloat(computedStyle.marginRight).toString();
  documentQuerySelector(".margin-bottom").innerHTML = parseFloat(computedStyle.marginBottom).toString();
  documentQuerySelector(".margin-left").innerHTML = parseFloat(computedStyle.marginLeft).toString();
         
  documentQuerySelector(".padding-top").innerHTML = parseFloat(computedStyle.paddingTop).toString();
  documentQuerySelector(".padding-right").innerHTML = parseFloat(computedStyle.paddingRight).toString();
  documentQuerySelector(".padding-bottom").innerHTML = parseFloat(computedStyle.paddingBottom).toString();
  documentQuerySelector(".padding-left").innerHTML = parseFloat(computedStyle.paddingLeft).toString();

  // Optionally, remove the div from the document
  document.body.removeChild(div);

  function documentQuerySelector(selector: string): HTMLElement {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`No element found for selector: "${selector}"`);
    }
    return element as HTMLElement;
  }
}
