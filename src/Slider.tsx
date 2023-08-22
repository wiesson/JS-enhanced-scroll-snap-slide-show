import { useState } from "react";
import "./Slider.css";

const slides = [
  "https://lh3.googleusercontent.com/Rgf7x6KCunNGtVnkOpgsb3TYm2ULNOqsa4xcmo2Peg2toa7sgcBjAzSBIlpYdwbk_XfS3qqSKcyOYgfFW10XpvcG_eIffkJbktv02wb6eb4Dz-lJ",
  "https://lh3.googleusercontent.com/mEPPoM3otCHsv8eRFcVnaUskYSkM05DxvS43gH2380-cnRIi0OJczERx9I9ax6MOw9MnsZTd-rX8jOQm5YmgsQxOqyqadQLdNOlnmpDiVF8bVzHySQ",
  "https://lh3.googleusercontent.com/AxdR1Ok2iU6z4eJIlmBepsTAaTZqTitFvYvao4HxpWgMW31m1gXnBo7ABXQhPwUzz3AuCQdacG1DVpFjQVFCWgz6W9oUklpR5FPguR_ySfHY2_vP",
  "https://lh3.googleusercontent.com/TEtRuAdxaBrmo9gwKMUWtpcjJTZEHTvTNjBN7B_ZIuBdt5sdoGndEBrU_Ira1PqnSyuJ77Z5iMI6A173_jRbstt729Gf0-qEKt0",
  "https://lh3.googleusercontent.com/VR09gp2eOldwaYE16yyjUbblNMC5q517njGS3hJXFid8AADhUTRaVRcH_y0ZvakxpPiRL_9-WJ4GburzkhbLlAv2SKL-jMT5LmfNyuaDRSaaq6YI",
  "https://lh3.googleusercontent.com/sy6fqzY_vnGZNc5o46hoWM5WxpvXevM7GdNILQK7LcGRF1RcRhaeyyIVJibjW3jYU_Cg0fryJ9u8MquM3CyvzjLoA-FrkfM3yZMbfsIhQeOE4gM",
  "https://lh3.googleusercontent.com/VDD5Rt3cNoxxS4CWwmzseiuMiq-DOSJozoT5IZdiEB2blMlxMhPuiZlw1hO0fcx8-IIm2i284mj1dhAcXpppFDWIiyk92kD58DHFUF7FNAkkBzW4",
  "https://lh3.googleusercontent.com/SK8b2jk_wT2Yht0gK3G7CsfO9h9g2sEYEayv26dWVHhEQRTURLLwdPthLMhT3-Hy9sxMfgGgXUX6gujPWwa-46s0cVB4BGbl4RELldq7C1v_zGCM_w",
  "https://lh3.googleusercontent.com/fVdq-UD9M3XYG8EQ2R6obWw8czrUhqO-D8Vun42pervZjfgZ_WcMWGSZd6K8LzdO7w-pPeto26YFffHlznvPPaDZPsS_iwwMKtM",
  "https://lh3.googleusercontent.com/UAiWi77v0mPSfieYvLXQ6Ava7Ln4rZMmGLOvbgmD9zycjxxU64yD8JhQpA712Eb2sWBdu5XNd0hIe9_jkgJNAs0tqSaGSNG3Yswe5Y-GsfzZegai",
  "https://lh3.googleusercontent.com/w1FnQgmEEmbDKde03EmWy_iJaS-3OivFoJclmR8aLHjFmy410rYXlFF01VEtwrMgk7whPW51qRQy7OZngkKPT9JkbQG6wWnYdJ9TCwWxt3CFYZqB",
  "https://lh3.googleusercontent.com/Wbajq_WNJx5jj7pmMWnBa4gzesZrqDyCEd451hlvuCCueYz2xosF-TSYjRg57fAsFVmtgoq2lXZSXSbRa1O7pGcjCMWaalDN6YMUKvg83DdbrH1z",
  "https://lh3.googleusercontent.com/uwb3fVehbB8mI2zGB4AIDV3AsTBuNyzaTWfiioRnOWl5QCOqboJbcIIuj1m-jBaoQw8Rok8Cb0VCR7ydbRztScEgtSQ42fTERHni9YMBLrt8b5xIHQ",
  "https://lh3.googleusercontent.com/P79qssLzN_Mc9OXNhsHksn1YQkP7Gfwsq_Cufpm3N1n8w5kx70sI03cJS5sw2syoPc8UIG4s5qW_IV-BlFanF04n2EwlotuBrUqoX_7VIq8m4zy6",
  "https://lh3.googleusercontent.com/ZGr5eRnIer8c64lSX1T1X4tHT4e6DuhWkR9qYjaUARK2L7_KtV7Rn3oAbhqHsv2JppaIqgdEzkJ7sElCdg5frOl9nR1XuRtNWz4z-XO8Rbl5mvMBqA",
  "https://lh3.googleusercontent.com/8uaq5NJSsOc7BYtYWk-bTE-EaGNyJOmU_U3uh-lLFiRnX3yLzMW8nhzDQXLn-6Zch84tD1cGOn8-AJHqLLk6w0WJX3gfpAAE93sb5iccHLjWQTUo",
  "https://lh3.googleusercontent.com/unfyksYYi-HWQGlqlfuI8rcOtj_weNmU3hVVX9iHlbQ99w4mxFmy8kNsBUo9LrQ42iCxYs9v0ZjY4xCUFQfS24Fx3fqwJskdkW96rIE03CrjFJxA",
  "https://lh3.googleusercontent.com/EIoNQDACJQtzSa6lL1EvjbRaSAw_WsQjGq9PYq4JiWrlC0HA8zplh94ynww1STiQTkyIGnFi_ady2Zr5Qy-StqXhV3RRowtWp96DD8_laRrFyIrB",
  "https://lh3.googleusercontent.com/xHsRoVWLxevZnzPn0bWPmNJvGI3ivtadgtvhSgge5Sfrcbt5hfVvX-9zswkHr1nLNcrE9YMoT1yHI9GBDblCSx73UPVzriBoJSagrfi9xXPlERY",
  "https://lh3.googleusercontent.com/nCyG-n-Lf3qSyO-NZImjvxSzx05ax_a6-LQMm0SNqA9vIx8MCUPPiFF4Pfj9nQTi69YgRzOXmbEdKVsHjtwNBeHJ4qNHwESsKH-6RGu9Ab3sG3DE",
  "https://lh3.googleusercontent.com/xs_z6NyiYsRfHlg3Bg__ABOpzYHN1x9x264Njztk3jlaEPU-ACTQQHpkbzBM6y_3qdSdj3x_v3MdquFUgkhR0g-LGcrB-LyS_KKNu9rPfgpu41rE",
];

const groupBy = (arr, key) =>
  arr.reduce(
    (acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc),
    {}
  );

export default function Slider() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <div className="relative">
      <div
        className="slider"
        onScroll={(e) => {
          console.log(
            e.currentTarget.scrollLeft,
            e.currentTarget.clientWidth,
            Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth)
          );
          setCurrentSlideIndex(
            Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth)
          );
        }}
      >
        {slides.map((src, index) => {
          return (
            <div className="slide w-full" key={src} data-index={index}>
              <img
                className="h-full w-full object-cover rounded-lg"
                src={src + "=w800-h400-c"}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <SliderControlsPrev activeIndex={currentSlideIndex} />
        <SliderControlsNext activeIndex={currentSlideIndex} />
      </div>

      <SliderDots activeIndex={currentSlideIndex} length={slides.length} />
    </div>
  );
}

function SliderDots({ activeIndex, length }) {
  function onClick(slideIndex: number) {
    document
      .querySelector(`.slider [data-index="${slideIndex}"]`)
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      {activeIndex}
      <div className="flex gap-3 justify-center">
        {Array.from({ length }, (_, i) => (
          <button
            key={i}
            onClick={() => onClick(i)}
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

function SliderControlsPrev({ activeIndex }) {
  // todo: update to ref
  function onClick() {
    document
      .querySelector(`.slider [data-index="${activeIndex - 1}"]`)
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-2">
      <button
        className="p-2 bg-white rounded-md text-gray-900"
        onClick={onClick}
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

function SliderControlsNext({ activeIndex }) {
  function onClick() {
    // todo: update to ref
    document
      .querySelector(`.slider [data-index="${activeIndex + 1}"]`)
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
      <button
        className="p-2 bg-white rounded-md text-gray-900"
        onClick={onClick}
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
