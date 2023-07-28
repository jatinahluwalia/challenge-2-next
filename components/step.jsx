import React from 'react'

const Step = ({ activeIndex, number, detail }) => {
    return (
        <div className="step">
            <div className={`step-icon ${activeIndex === number && "active-icon"}`}> <span>{number}</span> </div>
            <div className="step-info">
                <div className="step-number">
                    STEP {number}
                </div>
                <div className="step-name">
                    {detail}
                </div>
            </div>
        </div>
    )
}

export default Step