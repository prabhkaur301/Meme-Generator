import React from "react"
import memeData from "../Memedata"

export default function Meme(){
    const [memeImg,setMemeImg]=React.useState("");
    function getImage(){
        const dataArr=memeData.data.memes;
        const randomNo=Math.floor(Math.random()*dataArr.length);
        const imgUrl=dataArr[randomNo].url;
        setMemeImg(imgUrl);
        console.log(imgUrl);
    }
    return(
        <main>
            <div className="form">
                <input type="text" className="input input-1" placeholder="Enter top line"></input>
                <input type="text" className="input input-2" placeholder="Enter bottom line"></input>
                <button className="btn" onClick={getImage}>Get a new meme image  🖼</button>
                
                    <img src={memeImg} alt="" className="meme-img"></img>
               
            </div>
        </main>
    )
}