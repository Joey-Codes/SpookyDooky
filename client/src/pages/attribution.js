import { useEffect } from "react";

export const Attribution = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div style={{height: "1000px", textAlign: "center", marginTop: "50px"}}>
            <h1 className="readexpro rp2">Attribution</h1>
            <br />
            <div>
                <h3 className="readexpro">Ghost Vectors used from Vecteezy: </h3>
                <a style={{color: "black"}} href="https://www.vecteezy.com/free-vector/ghost">Link</a>
            </div>
            <br />
            <div>
                <h3 className="readexpro">Loading-red-spot.gif used from Wikimedia Commons:</h3>
                <a style={{color: "black"}} href="https://commons.wikimedia.org/wiki/File:Loading-red-spot.gif#">Link</a>
            </div>
        </div>
    );
};