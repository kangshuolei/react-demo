import Deom1 from "./demo1"  //该实例为canvans的使用实例
import Demo2 from "./demo2"  //该实例为useContext和antd的Tree实例的应用（用途不大，用来测试的）
import Demo3 from "./demo3"  //该实例是修改antd的table自定义样式（scss使用）
import Demo4 from "./demo4"  //该实例为antd Tree组件的过滤检索功能（用途也不大）
import Demo5 from "./demo5"  //该实例为使用 Mock 来实现table的增删改查功能
import Demo6 from "./demo6"  //该实例是高阶组件的实现方法
import Demo7 from "./demo7"   //该实例为父组件重新渲染，子组件也跟着重新渲染
import DemoMemo from "./demo7/memo/memo"   //该实例为memo的解决方法
import UseCallback from "./demo7/useCallback/useCallback"  //该实例为useCallback 的解决办法
import UseMemo from "./demo7/useMemo/useMemo"  //该实例为useCallback 的解决办法
import Demo8 from "./demo8"  //该实例是验证useState的实时更新方法（不是很完善）
import Demo9 from "./demo9"  //该实例是实现用useContext实现跨组件传值
import Demo10 from "./demo10"  //该实例是利用回调函数来实现子组件向父组件传值
import Demo11 from "./demo11"  //该实例是实现一个自定义Hooks
import Debounce from "./demo12/debounce"  //该实例是实现防抖函数的自定义Hooks
import Throttle from "./demo12/throttle"  //该实例是实现节流函数的自定义Hooks
import Demo13 from "./demo13"   //容器水平垂直居中的方法
import Demo14 from "./demo14"   //演示redux的使用
import Demo15 from "./demo15"    //该实例是熟悉ES5的继承
import Demo16 from "./demo16/useImperativeHandle"  //测试 useImperativeHandle
import Demo16Com from "./demo16/index"    //测试兄弟组件之间的如何传值
import './App.css';
 
function App() {
  return (
    <div>
      <Demo16Com />
    </div>
  );
}

export default App;
