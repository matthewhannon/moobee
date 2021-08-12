import React from 'react';

const IconBackground = () => {
    // const icon = <img alt="camera" src="https://img.icons8.com/wired/64/000000/documentary.png"/>

    const createBackground = () => {
        const icons = [];
        for(let i = 0; i < 80; i++) {
            const randomNum = Math.floor(Math.random() * 1000);
            const icon = <img
                key={i}
                alt="camera"
                className="camera"
                src="https://img.icons8.com/wired/64/000000/documentary.png"
                style={{transform: `rotate(${randomNum}deg)`}}
            />
            icons.push(icon);
        }
        return icons;
    }
    return (
        <div className="icon-background">
            {createBackground()}
        </div>
    )
}

export default IconBackground;