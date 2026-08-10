import { FeaturedItem } from "./FeaturedItem/FeaturedItem";
import styles from "./FeaturedList.module.less";

export const FeaturedList = ({ data }) => {
  return (
    <div className={styles.Container}>
      <h3 className={styles.Header}>Featured</h3>
      <div className={styles.FeaturedItems}>
        {data
          ?.sort((a, b) => a.order - b.order)
          ?.map((project, index) => (
            <FeaturedItem data={project} key={index} />
          ))}
      </div>
    </div>
  );
};
