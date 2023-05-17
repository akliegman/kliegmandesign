import {
  ExclamationCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useApi } from "../../contexts/ApiContext";
import "./Errors.less";

export const Errors = () => {
  const { errors, clearErrorById } = useApi();

  if (!errors?.length) return null;

  return (
    <div className="Errors">
      {errors?.map((error, i) => (
        <div
          key={error.id}
          className="Errors__card"
          onClick={() => clearErrorById(error.id)}
        >
          <ExclamationCircleOutlined className="Errors__card__icon" />
          <div className="Errors__card__content">
            <span className="Errors__card__status">{error.status}</span>
            <span className="Errors__card__message">{error.message}</span>
          </div>
          <CloseCircleFilled className="Errors__card__close" />
        </div>
      ))}
    </div>
  );
};
