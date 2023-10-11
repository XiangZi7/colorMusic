import {createSlice} from "@reduxjs/toolkit";

const playerStore = createSlice({
    name: "player",
    // 初始化 state
    initialState: {
        count: 0,
        // 歌曲
        songs: [{
            id: "27591651",
            title: 'Intro AE 86',
            singer: "陈光荣",
            album: "頭文字[イニシャル]D THE MOVIE SOUND TUNE",
            cover: "http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg",
            src: 'http://music.163.com/song/media/outer/url?id=27591651.mp3',
            time: 149000,
            mv: "",
            Lyric: ""
        },
            {
                id: "409872504",
                title: 'Ninelie',
                singer: "Aimer",
                album: "ninelie EP",
                cover: "http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg",
                src: 'http://music.163.com/song/media/outer/url?id=409872504.mp3',
                time: 260675,
                mv: "",
                Lyric: ""
            },
        ],
        // 历史搜索
        historcontent: [],
        // 当前播放的歌曲位置
        currentIndex: 0,
        // 播放状态
        isPlaying: false,
        // 封面动画状态
        animationPlayState: "paused",
        // 当前高亮显示的歌词索引
        currentLyricIndex: -1,
    },
    // 修改状态的方法 同步方法，可以直接修改值
    reducers: {
        updateSongs(state, param) {
            state.songs[state.currentIndex] = Object.assign(state.songs[state.currentIndex], {...param})
        },
        setCurrentIndex(state, idx) {
            state.currentIndex = idx.payload
        }
    },
});

// 解构出来 actionCreater函数
const {updateSongs,setCurrentIndex} = playerStore.actions;
// 获取 reducer
// 用于定义如何更新应用的状态。它接收两个参数：当前的状态（state）和即将执行的 action，并返回一个新的状态。
const reducer = playerStore.reducer;

// 按需导出
export {updateSongs,setCurrentIndex};
// 默认导出
export default reducer;

