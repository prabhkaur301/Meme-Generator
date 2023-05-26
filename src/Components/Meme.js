import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import icon from "../images/download-solid.svg";

export default function Meme() {
  const [meme, setMeme] = useState({
    top: {
      text: "",
      styles: {},
    },
    bottom: {
      text: "",
      styles: {},
    },
    randomImg: "https://i.imgflip.com/30b1gx.jpg",
  });
  const [activeStyle, setActiveStyle] = useState("");
  const [memeImgData, setMemeImgData] = useState([]);
  const [slider, setSlider] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 16,
  });
  const sliderData = [
    { label: "Top: ", value: "top" },
    { label: "Left: ", value: "left" },
    { label: "Right: ", value: "right" },
    { label: "Bottom: ", value: "bottom" },
    { label: "Font Size: ", value: "fontSize" },
  ];

  function handleSliderChange(e) {
    const { name, value } = e.target;
    setSlider((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        text: value,
      },
    }));
  }

  useEffect(() => {
    const textStyles = {
      top: `${slider.top}%`,
      right: `${slider.right}%`,
      fontSize: `${slider.fontSize}px`,
      left: `${slider.left}%`,
      bottom: `${slider.bottom}%`,
    };

    setMeme((prevData) => ({
      ...prevData,
      [activeStyle]: {
        ...prevData[activeStyle],
        styles: textStyles,
      },
    }));
  }, [slider, activeStyle]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((apiData) => setMemeImgData(apiData.data.memes));
  }, []);

  function getImage() {
    const randomNo = Math.floor(Math.random() * memeImgData.length);
    const imgUrl = memeImgData[randomNo].url;
    setMeme((prev) => ({ ...prev, randomImg: imgUrl }));
  }

  function downloadImg() {
    domtoimage
      .toJpeg(document.getElementById("image"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "Meme.jpeg";
        link.href = dataUrl;
        link.click();
      });
  }

  console.log(activeStyle)
  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="input input-1"
          placeholder="Enter top line"
          name="top"
          value={meme.top.text}
          onChange={handleChange}
        />
        <input
          type="text"
          className="input input-2"
          placeholder="Enter bottom line"
          name="bottom"
          value={meme.bottom.text}
          onChange={handleChange}
        />
        <button className="btn" onClick={getImage}>
          Get a new meme image 🖼️
        </button>
      </div>

      <div className="sys-container">
        <div className="meme-img-container" id="image">
          <h2 className="top-text meme-text" style={meme.top.styles}>
            {meme.top.text}
          </h2>
          <h2 className="bottom-text meme-text" style={meme.bottom.styles}>
            {meme.bottom.text}
          </h2>
          <img src={meme.randomImg} alt="" className="meme-img" />
        </div>

        <div className="slider-container">
          <div className="radio-container">
            <p>Styles: </p>
            <div className="radio-container-items">
            <label>
              Top
              <input
                type="radio"
                name="style-type"
                value="top"
                checked={activeStyle === "top"}
                onChange={() => setActiveStyle("top")}
                className="radio-input"
              />
            </label>
            <label>
              Bottom
              <input
                type="radio"
                name="style-type"
                value="bottom"
                checked={activeStyle === "bottom"}
                onChange={() => setActiveStyle("bottom")}
                className="radio-input"
              />
            </label>
            </div>
          </div>
          {sliderData.map((item) => (
            <React.Fragment key={item.value}>
              <label htmlFor={item.value}>{item.label}</label>
              <input
                className={`${item.value} range-slider`}
                type="range"
                name={item.value}
                value={slider[item.value]}
                onChange={handleSliderChange}
              />
            </React.Fragment>
          ))}

          <button id="download-btn" onClick={downloadImg}>
            Download Meme
            <img src={icon} id="icon" alt="icon" />
          </button>
        </div>
      </div>
    </main>
  );
}
