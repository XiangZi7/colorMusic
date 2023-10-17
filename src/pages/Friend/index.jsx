import {useDispatch, useSelector} from "react-redux";
// 获取
import {addCount, decreaseCount, addTonum} from "@/stores/modules/counterStore";
import {useState} from 'react'

export default function index() {
    const [msg, setMsg] = useState([{id: 1, name: "小米"}, {id: 2, name: "大门"}])
    // 得到 Redux 中的数据
    const {count} = useSelector((state) => state.counter);
    // 处理数据的函数
    const dispatch = useDispatch();

    function addnum() {
        dispatch(addCount())
        console.log(count)
    }

    return (
        <div>
            <div className="App">
                {msg.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))}
                <button onClick={() => dispatch(addTonum(10))}>+10</button>
                <button onClick={() => dispatch(addTonum(20))}>+20</button>
                <button onClick={addnum}>+</button>
                <p>{count}</p>
                <button onClick={() => dispatch(decreaseCount())}>-</button>
            </div>
        </div>
    )
}