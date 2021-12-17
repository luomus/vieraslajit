
export function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
      if (node == parent) {
          return true;
      }
      node = node.parentNode;
  }
  return false;
}

export const removeHTMLTagFragments = (s: string): string => s.replace(/<.*?(>|$)/g, '');