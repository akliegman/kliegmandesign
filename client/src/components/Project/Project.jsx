export const Project = ({ data }) => {
  return (
    <div className="Project">
      <div className="Project__Description">
        <h1 className="Project__title">{data.name}</h1>
        <div className="Project__description">
          <p>{data.description}</p>
        </div>
        <div className="Project__image">
          <img src={data.image} alt={data.name} />
        </div>
      </div>
    </div>
  );
};
