import React from "react"
import memeData from "../Memedata"

export default function Meme(){
    const [meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        randomImg:"https://i.imgflip.com/30b1gx.jpg"
    })

    const [memeImgData,setMemeImgData]= React.useState(memeData);
    
    function getImage(){
        const dataArr=memeImgData.data.memes;
        const randomNo=Math.floor(Math.random()*dataArr.length);
        const imgUrl=dataArr[randomNo].url;
        setMeme((prev)=>{
            return({...prev,randomImg:imgUrl})
        })
        }

    function handleChange(event){
        const {name,type,value}=event.target;
        setMeme((prevData)=>{
            return({
                ...prevData,[name]:value
            })
        })
    }
    return(
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
                <button className="btn" onClick={getImage}>Get a new meme image 🖼</button>
                
                <div className="meme-img">
                    <h2 className="top-text">{meme.topText}</h2>
                    <h2 className="bottom-text">{meme.bottomText}</h2>
                    <img src={meme.randomImg} alt="" className="meme-img"/>
                </div>
               
            </div>
        </main>
    )
}