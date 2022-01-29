import image from "../images/troll-face.svg"
export default function Header(){
    return(
        <header className="header">
            <img src={image} alt=""></img>
            <h1>Meme Generator</h1>
            <p className="right">React Course Project-3</p>
            
        </header>
    )
}