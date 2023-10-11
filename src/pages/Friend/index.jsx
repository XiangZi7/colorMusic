import {useDispatch, useSelector} from "react-redux";
// 获取
import {addCount, decreaseCount,addTonum} from "@/stores/modules/counterStore";

export default function index() {
    // 得到 Redux 中的数据
    const {count} = useSelector((state) => state.counter);
    // 处理数据的函数
    const dispatch = useDispatch();
    return (
        <div>
            <div className="App">
                <button onClick={() => dispatch(addTonum(10))}>+10</button>
                <button onClick={() => dispatch(addTonum(20))}>+20</button>
                <button onClick={() => dispatch(addCount())}>+</button>
                <p>{count}</p>
                <button onClick={() => dispatch(decreaseCount())}>-</button>
            </div>
        </div>
    )
}