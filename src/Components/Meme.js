import React from "react"
export default function Meme() {

    // state for managing meme
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "https://i.imgflip.com/30b1gx.jpg"
    })
    // state for managing img data
    const [memeImgData, setMemeImgData] = React.useState([]);

    const [slider, setSlider] = React.useState({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontSize: 16
    })
    const labels=["Top: ","Left: ","Right: ","Bottom: ","Font-Size: "]

    // useEffect for getting data from Api

    React.useEffect(() => {
        fetch(" https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(apiData => setMemeImgData(apiData.data.memes))
    }, [])



    function getImage() {
        const dataArr = memeImgData
        const randomNo = Math.floor(Math.random() * dataArr.length);
        const imgUrl = dataArr[randomNo].url;
        setMeme((prev) => {
            return ({ ...prev, randomImg: imgUrl })
        })
    }
    function handleSliderChange(e) {
        const { name, value } = e.target
        setSlider((prevData) => {
            return ({ ...prevData, [name]: value })
        })
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setMeme((prevData) => {
            return ({
                ...prevData, [name]: value
            })
        })
    }



    const topTextStyles = {
        
            top: `${slider.top}%`,
            fontSize: `${slider.fontSize}px`,
            left: `${slider.left}%`,
            right: `${slider.right}%`

        
    }
    const bottomTextStyles = 
        {
            bottom: `${slider.bottom}%`,
            fontSize: `${slider.fontSize}px`,
            left: `${slider.left}%`,
            right: `${slider.right}%`
        }

    return (
        <main>
            <div className="form">
                <input type="text"
                    className="input input-1"
                    placeholder="Enter top line"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input type="text"
                    className="input input-2"
                    placeholder="Enter bottom line"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="btn" onClick={getImage}>Get a new meme image 🖼️</button>
            </div>



            <div className="sys-container">

                <div className="meme-img-container">
                    <h2 className="top-text meme-text" style={topTextStyles}>{meme.topText}</h2>
                    <h2 className="bottom-text meme-text" style={bottomTextStyles}>{meme.bottomText}</h2>
                    <img src={meme.randomImg} alt="" className="meme-img" />
                </div>
                <div className="slider-container">
                    <label htmlFor="top">{labels[0]}</label>
                    <input className="top range-slider"
                        type="range"
                        name="top"
                        value={slider.top}
                        onChange={handleSliderChange}
                    />
                     <label htmlFor="left">{labels[1]}</label>
                    <input className="left range-slider"
                        type="range"
                        name="left"
                        value={slider.left}
                        onChange={handleSliderChange}
                    />
                   <label htmlFor="bottom">{labels[3]}</label>
                    <input className="bottom range-slider"
                        type="range"
                        name="bottom"
                        value={slider.bottom}
                        onChange={handleSliderChange}
                    />
                    <label htmlFor="right">{labels[2]}</label>
                    <input className="right range-slider"
                        type="range"
                        name="right"
                        value={slider.right}
                        onChange={handleSliderChange}
                    />
                    <label htmlFor="font-size">{labels[4]}</label>
                    <input className="font-size range-slider"
                        type="range"
                        name="fontSize"
                        value={slider.fontSize}
                        onChange={handleSliderChange}
                    />
                </div>

            </div>
        </main>
    )
}