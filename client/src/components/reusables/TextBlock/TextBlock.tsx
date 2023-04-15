// @ts-nocheck
import "./TextBlock.less";

export const TextBlock = ({ children }) => {
  return (
    <div className="TextBlock" data-testid="text-block">
      {children}
    </div>
  );
};
