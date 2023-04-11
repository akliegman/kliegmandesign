import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useState, cloneElement, useRef, useCallback } from "react";
import { IconButton } from "../../reusables";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";

import "./ProjectSlider.less";

export const ProjectSlider = ({ data, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const slideRef = useRef(null);

  const scrollTopSlide = () => {
    setTimeout(() => {
      slideRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  };

  const handleNext = useCallback(() => {
    setSlideDirection("next");
    scrollTopSlide();

    if (activeIndex === data.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, data.length]);

  const handlePrev = useCallback(() => {
    setSlideDirection("prev");
    scrollTopSlide();
    if (activeIndex === 0) {
      setActiveIndex(data.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex, data.length]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 20000);
  //   return () => clearInterval(interval);
  // }, [activeIndex, handleNext]);

  const groupChildFactory = (child) => {
    return cloneElement(child, {
      classNames: `ProjectSliderSlideAnimation--${slideDirection}`,
    });
  };

  const groupChildFactoryCaption = (child) => {
    return cloneElement(child, {
      classNames: `ProjectSliderCaptionAnimation--${slideDirection}`,
    });
  };

  return (
    <div className={className}>
      <div className="ProjectSlider">
        <div className="ProjectSlider__topBar">
          <span />
          <span />
          <span />
        </div>
        <div className="ProjectSlider__browser">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div ref={slideRef} className="ProjectSlider__slides">
          <TransitionGroup childFactory={groupChildFactory} component={null}>
            <CSSTransition
              key={activeIndex}
              timeout={1000}
              classNames={`ProjectSliderSlideAnimation--${slideDirection}`}
            >
              <div className="ProjectSlider__slide">
                <div className="ProjectSlider__image">
                  <img
                    src={data[activeIndex]?.image}
                    alt={data[activeIndex]?.title}
                  />
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <IconButton
          className="ProjectSlider__button ProjectSlider__button--prev"
          onClick={handlePrev}
          icon={<CaretLeftFilled />}
          withShadow
          variant="primary"
          type="button"
        >
          Prev
        </IconButton>
        <IconButton
          className="ProjectSlider__button ProjectSlider__button--next"
          onClick={handleNext}
          icon={<CaretRightFilled />}
          withShadow
          variant="primary"
          type="button"
        >
          Next
        </IconButton>
      </div>
      <TransitionGroup
        component="div"
        className="ProjectSlider__captionWrapper"
        childFactory={groupChildFactoryCaption}
      >
        <CSSTransition
          key={activeIndex}
          timeout={1000}
          classNames={`ProjectSliderCaptionAnimation--${slideDirection}`}
        >
          <div className="ProjectSlider__caption">
            <p>{data[activeIndex]?.description}</p>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
