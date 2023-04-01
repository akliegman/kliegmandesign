import "./LegalContent.less";

export const LegalContent = ({ children }) => {
  return <div className="LegalContent">{children}</div>;
};

export const LegalContentItem = ({ item }) => {
  if (!item) return null;
  return (
    <>
      {item?.type === "heading-1" && <h1>{item?.content}</h1>}
      {item?.type === "heading-2" && <h2>{item?.content}</h2>}
      {item?.type === "heading-3" && <h3>{item?.content}</h3>}
      {item?.type === "heading-4" && <h4>{item?.content}</h4>}
      {item?.type === "paragraph" && (
        <p>
          <LegalContentItemText content={item?.content} />
        </p>
      )}
      {item?.type === "unordered-list" && (
        <ul>
          {item?.content?.map((listItem, i) => (
            <li key={i}>
              <p>
                <LegalContentItemText content={listItem?.content} />
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export const LegalContentItemText = ({ content }) => {
  return (
    <>
      {typeof content === "string" && <span>{content}</span>}
      {typeof content === "object" &&
        Array.isArray(content) &&
        content?.map((item, i) => (
          <span key={i}>
            {item.type === "text-strong" && <strong>{item?.content}</strong>}
            {item.type === "text-emphasis" && <em>{item?.content}</em>}
            {item.type === "text" && item?.content}
          </span>
        ))}
    </>
  );
};
