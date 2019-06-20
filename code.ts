figma.showUI(__html__, { height: 136 });

figma.ui.onmessage = msg => {
  if (msg.type === "sort") {
    figma.currentPage.selection
      .map(node => {
        const parent = node.parent;
        const clone = node.clone();
        node.remove();
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
      })
      .forEach((obj, i) => {
        obj.parent.insertChild(i, obj.node);
      });
  }

  figma.closePlugin();
};
