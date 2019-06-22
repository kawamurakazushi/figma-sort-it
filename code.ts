figma.showUI(__html__, { height: 136 });

figma.ui.onmessage = msg => {
  if (msg.type === "sort") {
    // Some Big number
    let startingIndex = 100000;

    const sorted = figma.currentPage.selection
      .map(node => {
        const parent = node.parent;
        startingIndex = Math.min(startingIndex, parent.children.indexOf(node));

        const clone = node.clone();
        return {
          node: clone,
          parent
        };
      })
      .sort((a, b) => {
        if (msg.order === "desc") {
          return a.node.name.localeCompare(b.node.name, undefined, {
            numeric: true
          });
        }
        return b.node.name.localeCompare(a.node.name, undefined, {
          numeric: true
        });
      });

    // Insert sorted nodes
    sorted.forEach((obj, i) => {
      obj.parent.insertChild(startingIndex + i, obj.node);
    });

    // Remove old nodes
    figma.currentPage.selection.forEach(node => {
      node.remove();
    });
  }

  figma.closePlugin();
};
