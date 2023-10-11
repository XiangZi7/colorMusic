// 出口文件
import {configureStore} from "@reduxjs/toolkit";
// 导入子模块
import counterStore from "./modules/counterStore";
import channelStore from "./modules/channelStore";
import playerStore from "./modules/playerStore";

const store = configureStore({
    reducer: {
        counter: counterStore,
        channel: channelStore,
        player: playerStore
    },
});

// 导出
export default store;

