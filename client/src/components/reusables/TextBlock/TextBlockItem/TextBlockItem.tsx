// @ts-nocheck
export const TextBlockItem = ({ item }) => {
  if (!item) return null;
  return (
    <>
      {item?.type === "heading-1" && (
        <h1 data-testid="text-block-item">{item?.content}</h1>
      )}
      {item?.type === "heading-2" && (
        <h2 data-testid="text-block-item">{item?.content}</h2>
      )}
      {item?.type === "heading-3" && (
        <h3 data-testid="text-block-item">{item?.content}</h3>
      )}
      {item?.type === "heading-4" && (
        <h4 data-testid="text-block-item">{item?.content}</h4>
      )}
      {item?.type === "paragraph" && (
        <p data-testid="text-block-item">
          <TextBlockInnerText data={item?.content} />
        </p>
      )}
      {item?.type === "unordered-list" && (
        <ul data-testid="text-block-item">
          {item?.content?.map((listItem, index) => (
            <li key={index}>
              <p>
                <TextBlockInnerText data={listItem?.content} />
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const TextBlockInnerText = ({ data }) => {
  return (
    <>
      {typeof data === "string" && <span>{data}</span>}
      {typeof data === "object" &&
        Array.isArray(data) &&
        data?.map((item, index) => (
          <span key={index}>
            {item.type === "text-strong" && <strong>{item?.content}</strong>}
            {item.type === "text-emphasis" && <em>{item?.content}</em>}
            {item.type === "text" && item?.content}
          </span>
        ))}
    </>
  );
};
