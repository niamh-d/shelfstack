/* eslint-disable react/prop-types */

const Item = ({ item }) => {
  const { url } = item;
  const { title, image, description, siteName } = item.preview;
  return (
    <a href={url} target="_blank">
      <div className="shelf" id="resource">
        <div>
          <h3>{title}</h3>
          {image && <img src={image} alt={title} />}
          {description && <p>{description}</p>}
          {siteName && (
            <p>
              Source: <span>{siteName}</span>
            </p>
          )}
        </div>
      </div>
    </a>
  );
};

export default Item;
