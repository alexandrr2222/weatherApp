export function manipulateClass(
  clickedElement,
  affectedElement,
  className,
  action,
) {
  clickedElement.addEventListener("click", () => {
    if (Array.isArray(affectedElement)) {
      affectedElement.forEach((el) => {
        el.classList[action](className);
      });
    } else affectedElement.classList[action](className);
  });
}
