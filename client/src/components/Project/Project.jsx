import clsx from "clsx";
import { TextBlock, TextBlockItem } from "../reusables";
import { ImageWrapper } from "./ImageWrapper/ImageWrapper";

import styles from "./Project.module.less";

export const Project = ({ data, projectRef }) => {
  return (
    <>
      <div
        ref={projectRef}
        className={clsx(styles.Container, styles.Description)}
      >
        <div className={styles.Main}>
          <div className={styles.Content}>
            <h2 className={styles.Header}>About</h2>
            <TextBlock>
              {data?.description.map((item) => (
                <TextBlockItem key={item} item={item} />
              ))}
            </TextBlock>
          </div>
          <div className={styles.Categories}>
            {Object.entries(data?.stack).map(([category, items]) => (
              <div key={category} className={styles.Category}>
                <h3 className={styles.CategoryName}>{category}</h3>
                <p className={styles.Skills}>
                  {items.map((item) => (
                    <span key={item} className={styles.Skill}>
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {data?.sections.map((section, index) => (
        <div
          key={section.index}
          className={clsx(
            styles.Container,
            styles.Section,
            index % 2 === 0 && styles.Reverse
          )}
        >
          <div className={styles.Main}>
            <div className={styles.Content}>
              <h2 className={styles.Header}>{section?.heading}</h2>
              <TextBlock>
                {section?.description?.map((item) => (
                  <TextBlockItem key={item} item={item} />
                ))}
              </TextBlock>
            </div>
            <ImageWrapper className={styles.Image}>
              <img src={section.image} alt={section?.header} />
            </ImageWrapper>
          </div>
        </div>
      ))}
    </>
  );
};
