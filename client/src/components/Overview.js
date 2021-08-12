import React, { useState } from 'react';

const Overview = ({ overviewText }) => {

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(!showModal);
    }

    const overviewModal = () => {
        const overviewTextArray = [...overviewText];
        if(overviewText.length > 140) {
            const text = overviewTextArray.map((char, i) => {
                if(i < 150) {
                    return char
                } else if (i === 151) {
                    return ' ... [read more]'
                } else {
                    return null;
                }
            })
            return <p>{text}</p>;
        } else {
            return <p>{overviewText}</p>
        }
    }

    return (
        <div className="overview" onClick={() => handleClick()}>
            {!showModal && <p className="overview-text">{overviewModal()}</p>}
            {showModal && 
                <div className="modal">
                    <div className="overview-modal-container">
                        <p className="overview-modal-text">{overviewText}</p>
                    </div>
                </div>}
        </div>
    )
}

export default Overview;
