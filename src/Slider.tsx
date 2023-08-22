import { useEffect, useRef, useState } from "react";
import "./Slider.css";
import { clsx } from "clsx";

function* chunks(arr: string[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

type SliderProps = {
  perView?: number;
  grouped?: boolean;
  data: string[];
};

export default function Slider({ perView = 1, data = [] }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [clientWidth, setClientWidth] = useState(375);

  useEffect(() => {
    setClientWidth(containerRef.current?.clientWidth || 375);
  }, []);

  const controlsVisible = data.length > perView;

  function onPrevSlide() {
    onChangeSlide(currentSlideIndex - 1);
  }

  function onNextSlide() {
    onChangeSlide(currentSlideIndex + 1);
  }

  function onChangeSlide(index: number, jumpTo?: boolean) {
    const nextSlide = containerRef.current?.querySelector(
      `[data-index="${index}"]`,
    );

    const direction = index > currentSlideIndex ? 1 : -1;

    if (!nextSlide) {
      return;
    }

    if (!containerRef.current) {
      return;
    }

    const { scrollLeft } = containerRef.current;
    const itemWidth = nextSlide.clientWidth;
    const itemsToScroll = jumpTo ? Math.abs(index - currentSlideIndex) : 1; // index - currentSlideIndex; //itemWidth * 2.5 < document.documentElement.offsetWidth ? 2 : 1;

    const nextPos =
      direction === 1
        ? Math.floor(scrollLeft / itemWidth) * itemWidth +
          itemWidth * itemsToScroll
        : Math.ceil(scrollLeft / itemWidth) * itemWidth -
          itemWidth * itemsToScroll;

    containerRef.current.scrollTo({
      left: nextPos,
      behavior: "smooth",
    });
  }

  return (
    <div className="space-y-4 -mx-4">
      <div className="relative">
        <div
          ref={containerRef}
          className="slider"
          onScroll={(e) => {
            setCurrentSlideIndex(
              Math.round(
                (e.currentTarget.scrollLeft / e.currentTarget.clientWidth) *
                  perView,
              ),
            );
          }}
        >
          {data.map((src, index) => {
            return (
              <div
                key={src}
                data-index={index}
                className={clsx("slide px-2", {
                  "w-full": perView === 1,
                  "lg:w-1/2": perView === 2,
                  "w-64 md:w-1/3": perView === 3,
                  "w-64 lg:w-1/4": perView === 4,
                  "w-64 lg:w-1/5": perView === 5,
                  "w-64 lg:w-1/6": perView === 6,
                  // "pr-4": perView > 1,
                })}
              >
                <img
                  alt=""
                  className="h-full w-full object-cover rounded-lg"
                  src={src + "=w800-h400-c"}
                />
              </div>
            );
          })}
        </div>

        {controlsVisible && (
          <SliderControlsPrev handleSlideChange={onPrevSlide} />
        )}

        {controlsVisible && (
          <SliderControlsNext handleSlideChange={onNextSlide} />
        )}
      </div>

      {controlsVisible && (
        <SliderDots
          handleSlideChange={onChangeSlide}
          activeIndex={currentSlideIndex}
          length={data.length - perView + 1}
        />
      )}
    </div>
  );
}

type SliderDotsProps = {
  activeIndex: number;
  length: number;
  startIndex?: number;
  handleSlideChange: (index: number, jumpTo?: boolean) => void;
};

function SliderDots({
  handleSlideChange,
  activeIndex,
  length,
}: SliderDotsProps) {
  return (
    <div className="hidden lg:block">
      <div className="flex gap-3 justify-center">
        {Array.from({ length: length }, (_, i) => (
          <button
            key={i}
            onClick={() => handleSlideChange(i, true)}
            className={`w-2 h-2 rounded-full hover:bg-yellow-400 ${
              activeIndex === i ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            <span className="sr-only">Go to slide {activeIndex}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

type SliderControlsProps = {
  handleSlideChange: () => void;
};

function SliderControlsPrev({ handleSlideChange }: SliderControlsProps) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pl-2 hidden lg:block">
      <button
        className="p-2 bg-white rounded-md text-gray-900"
        onClick={handleSlideChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          focusable="false"
          className="h-4 w-4 rotate-90"
        >
          <path d="M15 4.76263L14.353 4.00056 7.499 9.70114 0.646 4.00056 0 4.76263 7.499 10.99944z"></path>
        </svg>
      </button>
    </div>
  );
}

function SliderControlsNext({ handleSlideChange }: SliderControlsProps) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pr-2 hidden lg:block">
      <button
        className="p-2 bg-white rounded-md text-gray-900"
        onClick={handleSlideChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          focusable="false"
          className="h-4 w-4 -rotate-90"
        >
          <path d="M15 4.76263L14.353 4.00056 7.499 9.70114 0.646 4.00056 0 4.76263 7.499 10.99944z"></path>
        </svg>
      </button>
    </div>
  );
}

/*{false &&
            slides.map((chunk, index) => {
              return (
                <div
                  key={index}
                  data-index={index}
                  className={clsx("slide w-full grid", {
                    "grid-cols-1": perView === 1,
                    "grid-cols-2": perView === 2,
                    "grid-cols-3": perView === 3,
                    "grid-cols-4": perView === 4,
                    "grid-cols-5": perView === 5,
                    "gap-4": perView > 1,
                  })}
                >
                  {chunk.map((src) => (
                    <div key={src}>
                      <img
                        alt=""
                        className="h-full w-full object-cover rounded-lg"
                        src={src + "=w800-h400-c"}
                      />
                    </div>
                  ))}
                </div>
              );
            })} */
