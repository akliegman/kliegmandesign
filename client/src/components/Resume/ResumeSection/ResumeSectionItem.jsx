import styles from "./ResumeSectionItem.module.less";

export const ResumeSectionItem = ({ type, data }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {(type === "experience" || type === "education") && (
          <>
            <div className={styles.Image}>
              <img src={data?.logo} alt={data?.name} height="34" width="34" />
            </div>
            <div className={styles.Title}>
              <h3 className={styles.Name}>
                <a href={data?.website} target="_blank" rel="noreferrer">
                  {data?.name}
                </a>
              </h3>
              {type === "experience" && (
                <p className={styles.Types}>
                  <span>{data?.type}</span>
                  {data?.transaction_type && (
                    <>
                      <span>&bull;</span>
                      <span>{data?.transaction_type}</span>
                    </>
                  )}
                </p>
              )}
            </div>
          </>
        )}
      </div>
      <div className={styles.Content}>
        {data?.items?.map((item, index) => (
          <div className={styles.Item} key={index}>
            <div className={styles.ItemHeader}>
              <h4 className={styles.ItemTitle}>{item?.title}</h4>
              <h5 className={styles.ItemDivider}>&bull;</h5>
              <h5 className={styles.ItemDate}>
                {item?.start_date} to {item?.end_date}
              </h5>
            </div>
            <div className={styles.Body}>
              <p className={styles.Text}>
                {item?.description.map((text, index) => (
                  <span key={index}>
                    {text.type === "text" && text.value}
                    {text.type === "highlight" && <strong>{text.value}</strong>}
                    {text.type === "emphasis" && <em>{text.value}</em>}
                  </span>
                ))}
              </p>
              {item?.tech_stack && item?.tech_stack.length > 0 && (
                <p className={styles.Stack}>
                  {item?.tech_stack.map((tech, index) => (
                    <span key={index} className={styles.StackItem}>
                      {tech}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
