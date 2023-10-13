import React, {useState, useRef} from 'react';
import './slider.scss'

const Slider = ({value, duration, onSliderChange}) => {

    const handleSliderChange = (e) => {
        const newValue = parseInt(e.target.value);
        onSliderChange(newValue)
    };

    return (
        <div className="grid">
            <div className="slider">
                <div className="slider__box">
                    <span className="slider__btn" id="find"></span>
                    <span className="slider__color"></span>
                    <span className="slider__tooltip">50%</span>
                </div>
            </div>
        </div>

    );
};

export default Slider;