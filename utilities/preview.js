const { getLinkPreview } = require("link-preview-js");

module.exports = async function loopAndGetPreviewObjects(itemsArray) {
  try {
    const itemsArrayWithPreviews = new Array();

    for (let item of itemsArray) {
      const preview = await getLinkPreview(item.url);
      itemsArrayWithPreviews.push({
        ...item,
        preview,
      });
    }

    return itemsArrayWithPreviews;
  } catch (error) {
    console.debug(error);
  }
};
