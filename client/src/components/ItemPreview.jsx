import { useShelves } from "../contexts/ShelvesContext";

const ItemPreview = () => {
  const { usersShelvesItems } = useShelves();

  if (!usersShelvesItems || !usersShelvesItems.length) return <div>empty</div>;

  const examplePreview = usersShelvesItems[0].items[0];

  console.log(examplePreview);

  const { description, images, siteName, title } = examplePreview.preview;

  return (
    <div>
      <h3>{title}</h3>
      <img src={images[0]} />
      <p>{description}</p>
      <p>
        Source:<span>{siteName}</span>
      </p>
    </div>
  );
};

export default ItemPreview;
