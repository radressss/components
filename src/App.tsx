import React, {useState} from 'react'
import './App.css'

interface ButtonWithHoverProps {
    className?: string;
    customStyle?: React.CSSProperties;
}

function RecursiveHoverButton({className, customStyle}: ButtonWithHoverProps) {
    const [hoverDepth, setHoverDepth] = useState(0);

    const handleMouseEnter = (depth: number) => {
        setHoverDepth(depth);
    };

    const handleMouseLeave = () => {
        setHoverDepth(0);
    };
    return (
        <div className={`hovers`}>
            <button
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
                style={customStyle}
                className={className}
            >
                Hover
            </button>
            {Array(hoverDepth).fill(0).map((_, index) => <button
                className={"button slide-from-right border-top border-bottom"}
                onMouseEnter={() => handleMouseEnter(index + 2)}
                onMouseLeave={handleMouseLeave}>Hover</button>)}
        </div>
    );
}

function ButtonClickList() {
    const [showList, setShowList] = useState(false);
    const [showList2, setShowList2] = useState(false);

    const handleClick = () => {
        setShowList(!showList);
    };

    const closeList = () => {
        setShowList(false);
        setShowList2(false);
    }

    const handleMouseEnter = () => {
        setShowList2(true);
    };


    return (
        <div className={"click-buttons"}>
            <button style={{width: "100px", height: "50px", minWidth: "100px"}} onClick={handleClick}> Popover</button>
            {showList && <div className={"buttons"}>
                <button className={"button slide-from-left border-top"}>Hello
                </button>
                <button style={{borderRadius: "0", borderTop: "none", borderBottom: "none"}}
                        className={"button slide-from-right"} onClick={closeList}>Close
                </button>
                <div style={{display: "flex"}}>
                    <button className={"button border-bottom slide-from-left"} onMouseEnter={handleMouseEnter}> Hover
                    </button>
                    {showList2 && <div style={{display: "flex", flexDirection: "column"}}>
                        <button className={"button slide-from-left border-top"}>Hello
                        </button>
                        <button className={"button slide-from-right"}>Spacemaker
                        </button>
                        <button className={"button slide-from-left"}>World
                        </button>
                        <button className={"button slide-from-right"} onClick={closeList}>Close
                        </button>
                        <RecursiveHoverButton customStyle={{borderRadius: "0 0 5px 5px", borderTop: "none"}}
                                              className={"button slide-from-left border-bottom"}/>
                    </div>}
                </div>
            </div>}
        </div>
    )
}

interface RightClickListProps {
    setIsOpen: (isOpen: boolean) => void;
}
function RightClickList({setIsOpen}: RightClickListProps) {
    const [showList2, setShowList2] = useState(false);

    const closeList = () => {
        setIsOpen(false);
    }

    const handleMouseEnter = () => {
        setShowList2(true);
    };
    const handleMouseExit = () => {
        setShowList2(false);
    }

    return (
        <div className={"click-buttons"}>
            <div className={"buttons"}>
                <div style={{display: "flex"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <button className={"button border-top slide-from-left"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}> Hover
                        </button>
                        <button className={"button border-bottom slide-from-right"}> I do nothing</button>
                    </div>
                    {showList2 && <div style={{display: "flex", flexDirection: "column"}} onMouseEnter={()=>setShowList2(true)}>
                        <button className={"button slide-from-left border-top"}>Empty
                        </button>
                        <button className={"button slide-from-right border-bottom"} onClick={closeList}>Close
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}


function App() {

    const [showDiv, setShowDiv] = useState(false);
    const [divCoords, setDivCoords] = useState({x: 0, y: 0});

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowDiv(true);
        setDivCoords({x: e.clientX, y: e.clientY});
    };


    return (
        <div style={{display: "flex"}}>
            <div className={"red-background"}>
                <div>
                    <h1>Click on button</h1>
                    <ButtonClickList/>
                </div>
            </div>
            <div className={"right-click-background"} onContextMenu={handleRightClick}>
                <h1>Right click anywhere</h1>
            </div>
            {showDiv && (
                <div onContextMenu={handleRightClick}
                     style={{
                         position: "absolute",
                         left: divCoords.x,
                         top: divCoords.y,
                     }}
                >
                    <RightClickList setIsOpen={setShowDiv}/>
                </div>)}
        </div>
    );
}

export default App
