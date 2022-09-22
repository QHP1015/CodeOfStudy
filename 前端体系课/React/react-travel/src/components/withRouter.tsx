import { useNavigate, useParams, useLocation } from 'react-router-dom';



export default function withRouter(Component) {
    // 高阶函数高阶组件  接收一个组件
    // return出一个组件，这里return了一个函数组件function(props){}
    // Nowplaying所有属性传到这了
    return function (props) {
        const push = useNavigate();
        const params = useParams();
        const location = useLocation()
        // history里传个对象{push:push,params:params}
        return <Component {...props} history={{ push, params, location }} />;
    }
}