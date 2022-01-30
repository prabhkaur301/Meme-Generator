import image from "../images/troll-face.svg"
export default function Header() {
    return (
        <header className="header">
            <img src={image} alt=""></img>
            <h1>Memely</h1>
        </header>
    )
}