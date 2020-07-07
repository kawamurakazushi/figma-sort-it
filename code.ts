let startingIndex = 100000;

const sorted = figma.currentPage.selection
  .map(node => {
    const parent = node.parent;
    startingIndex = Math.min(startingIndex, parent.children.indexOf(node));
    return {
      node,
      parent
    };
  })
  .sort((a, b) =>
    figma.command === "desc"
      ? a.node.name.toLocaleLowerCase().localeCompare(b.node.name.toLocaleLowerCase(), undefined, {
          numeric: true
        })
      : b.node.name.toLocaleLowerCase().localeCompare(a.node.name.toLocaleLowerCase(), undefined, {
          numeric: true
        })
  )
  .forEach((obj, i) => {
    obj.parent.insertChild(startingIndex + i, obj.node);
  });

figma.closePlugin("Successfully sorted!");
