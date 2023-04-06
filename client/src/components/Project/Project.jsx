import { ProjectSlider } from "./ProjectSlider/ProjectSlider";
import { TextBlock, TextBlockItem } from "../reusables";
import "./Project.less";

export const Project = ({ data }) => {
  return (
    <div className="Project">
      <TextBlock>
        <h1 className="Project__title">{data?.title}</h1>
        {data?.description?.map((item, index) => (
          <TextBlockItem item={item} key={index} />
        ))}
      </TextBlock>

      {data?.slides && <ProjectSlider data={data.slides} />}
    </div>
  );
};
