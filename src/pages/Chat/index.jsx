import React, { useEffect, useRef, useState } from 'react';

const Equalizer = () => {
    const audioRef = useRef(null);
    const [eqValues, setEqValues] = useState({
        bass: 0,
        mid: 0,
        treble: 0,
    });

    useEffect(() => {
        const audioElement = audioRef.current;

        // 加载音频文件
        audioElement.src = 'http://music.163.com/song/media/outer/url?id=27591651.mp3';

        // 播放音频
        audioElement.play();

        // 应用均衡器值
        audioElement.bass = eqValues.bass;
        audioElement.mid = eqValues.mid;
        audioElement.treble = eqValues.treble;

        return () => {
            // 在组件卸载时停止音频播放
            audioElement.pause();
        };
    }, [eqValues]);

    const handleEqChange = (event) => {
        const { name, value } = event.target;

        // 更新均衡器值
        setEqValues((prevValues) => ({
            ...prevValues,
            [name]: parseInt(value),
        }));
        console.log(audioRef.current.bass)
        console.log(eqValues)
    };

    return (
        <div>
            <audio ref={audioRef} />
            <div>
                <label htmlFor="bass">Bass:</label>
                <input
                    type="range"
                    id="bass"
                    name="bass"
                    min="-10"
                    max="10"
                    value={eqValues.bass}
                    onChange={handleEqChange}
                />
            </div>
            <div>
                <label htmlFor="mid">Mid:</label>
                <input
                    type="range"
                    id="mid"
                    name="mid"
                    min="-10"
                    max="10"
                    value={eqValues.mid}
                    onChange={handleEqChange}
                />
            </div>
            <div>
                <label htmlFor="treble">Treble:</label>
                <input
                    type="range"
                    id="treble"
                    name="treble"
                    min="-10"
                    max="10"
                    value={eqValues.treble}
                    onChange={handleEqChange}
                />
            </div>
            <button onClick={()=>audioRef.current.play()}>播放</button>
        </div>
    );
};

export default Equalizer;
