import React from "react"
import Header from "./Components/Header"
import Meme from "./Components/Meme"
 export default function App(){
    return(
        <div className="container">
        <Header />
        <div className="main">
        <Meme />
        </div>
        </div>
    )
}