import { ProjectSlider } from "./ProjectSlider/ProjectSlider";
import { TextBlock, TextBlockItem } from "../reusables";
import { HorizontalRule } from "../reusables";
import "./Project.less";

export const Project = ({ data }) => {
  return (
    <div className="Project">
      <div className="Project__description">
        <TextBlock>
          {data?.title && <h1 className="Project__title">{data?.title}</h1>}
          {data?.description &&
            data?.description?.map((item, index) => (
              <TextBlockItem item={item} key={index} />
            ))}
        </TextBlock>
        {data?.stack && (
          <>
            <HorizontalRule
              className="Project__hr"
              type="small"
              color="gray-500"
            />
            <p className="Project__stack">{data?.stack.join(", ")}</p>
          </>
        )}
      </div>
      {data?.slides && (
        <ProjectSlider data={data.slides} className="Project__slider" />
      )}
    </div>
  );
};
