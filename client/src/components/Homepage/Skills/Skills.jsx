import { Button } from "../../reusables";

import styles from "./Skills.module.less";

export const Skills = ({ data }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Main}>
        <div className={styles.Content}>
          <h2 className={styles.Header}>{data.header}</h2>
          <p className={styles.Description}>{data.description}</p>
          <div className={styles.Buttons}>
            {data.ctas.map((button) => (
              <Button
                type="link"
                key={button.name}
                to={button.link}
                size="md"
                variant="primaryInverted"
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.Categories}>
          {data.categories.map((category) => (
            <div key={category.name} className={styles.Category}>
              <h3 className={styles.CategoryName}>{category.name}</h3>

              <p className={styles.Skills}>
                {category.skills.map((skill) => (
                  <span key={skill} className={styles.Skill}>
                    {skill}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
