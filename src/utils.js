export function createCustoms(evt, list) {
  const mode = getMode(evt);
  const parentElement = { parentElement: evt.from };
  let custom = [];
  switch (mode) {
    case "normal":
      const item = {
        element: evt.item,
        newIndex: evt.newIndex,
        oldIndex: evt.oldIndex,
        parentElement: evt.from,
      };
      custom = [item];
      break;
    case "swap":
      const drag = {
        element: evt.item,
        oldIndex: evt.oldIndex,
        newIndex: evt.newIndex,
        ...parentElement,
      };
      const swap = {
        element: evt.swapItem,
        oldIndex: evt.newIndex,
        newIndex: evt.oldIndex,
        ...parentElement,
      };
      custom = [drag, swap];
      break;
    case "multidrag":
      custom = evt.oldIndicies.map((curr, index) => ({
        element: curr.multiDragElement,
        oldIndex: curr.index,
        newIndex: evt.newIndicies[index].index,
        ...parentElement,
      }));
      break;
  }
  const customs = createNormalized(custom, list);
  return customs;
}

export function createNormalized(inputs, list) {
  const normalized = inputs
    .map(curr => ({ ...curr, item: list[curr.oldIndex] }))
    .sort((a, b) => a.oldIndex - b.oldIndex);
  return normalized;
}

export function insertNodes(customs) {
  customs.forEach(curr => {
    insertNodeAt(curr.parentElement, curr.element, curr.oldIndex);
  });
}

export function removeNodes(customs) {
  customs.forEach(curr => removeNode(curr.element));
}

export function removeNode(node) {
  if (node.parentElement !== null) node.parentElement.removeChild(node);
}

export function insertNodeAt(parent, newChild, index) {
  const refChild = parent.children[index] || null;
  parent.insertBefore(newChild, refChild);
}

export function handleStateChanges(normalized, list) {
  const a = handleStateRemove(normalized, list);
  const b = handleStateAdd(normalized, a);
  return b;
}

export function handleStateRemove(normalized, list) {
  const newList = [...list];
  normalized
    .concat()
    .reverse()
    .forEach(curr => newList.splice(curr.oldIndex, 1));
  return newList;
}

export function handleStateAdd(normalized, list) {
  const newList = [...list];
  normalized.forEach(curr => newList.splice(curr.newIndex, 0, curr.item));
  return newList;
}

export function getMode(evt) {
  if (evt.oldIndicies && evt.oldIndicies.length > 0) return "multidrag";
  if (evt.swapItem) return "swap";
  return "normal";
}

export function ID() {
  return (
    "clone" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}
