const init = () => {
  const firstElement = getAllElements()[0];
  firstElement.setAttribute("nav-selected", "true");
  firstElement.setAttribute("nav-index", "0");
  firstElement.focus();
};

const getAllElements = () =>
  document.querySelectorAll<HTMLElement>("[nav-selectable]");

const getCurrentElement = () =>
  document.querySelector<HTMLElement>("[nav-selected=true]");

const getTheIndexOfTheSelectedElement = (
  current: HTMLElement | null
): number => {
  const currentElement = current || getCurrentElement();
  return currentElement
    ? parseInt(currentElement.getAttribute("nav-index") || "0")
    : 0;
};

const getCurrentItem = () => {
  const item = getCurrentElement();
  const index = getTheIndexOfTheSelectedElement(item);
  return [item, index];
};

const selectElement = (selectElement: HTMLElement) => {
  [].forEach.call(getAllElements(), (element: HTMLElement, index) => {
    const selectThisElement = element === selectElement;
    element.setAttribute("nav-selected", selectThisElement ? "true" : "false");
    element.setAttribute("nav-index", `${index}`);
    if (element.nodeName === "INPUT") {
      selectThisElement ? element.focus() : element.blur();
    }
    if (selectThisElement) {
      element.scrollIntoView(true);
      if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
        window.scrollBy(0, -100);
      }
    }
  });
};

const Next = () => {
  const allElements = getAllElements();
  const currentIndex = getTheIndexOfTheSelectedElement(null);
  const goToFirstElement = currentIndex + 1 > allElements.length - 1;
  const setIndex = goToFirstElement ? 0 : currentIndex + 1;
  selectElement(allElements[setIndex] || allElements[0]);
};

const Previous = () => {
  const allElements = getAllElements();
  const currentIndex = getTheIndexOfTheSelectedElement(null);
  const goToLastElement = currentIndex === 0;
  const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
  selectElement(allElements[setIndex] || allElements[0]);
};

const Press = () => {
  getCurrentElement()?.click();
};

export default { init, Previous, Next, Press, getCurrentItem };
