#  基本
## 最简单的用法，浮层的大小由内容区域决定。


````jsx
import Popover from 'antd-material/core/Popover'
import Button from 'antd-material/core/Button'
import ReactDOM from 'react-dom';

class Test extends Component{
    componentDidMount() {
        this.props.withRef && this.props.withRef(ReactDOM.findDOMNode(this.dom))
    }
    render(){
        return(
            <button
                onClick={this.props.onClick}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                ref={ref=>this.dom =ref}>组件Hover me</button>
        )
    }
}
const MyButton = React.forwardRef((props, ref) => (
  <button ref={ref}
  onClick={props.onClick}
  onMouseEnter={props.onMouseEnter}
  onMouseLeave={props.onMouseLeave}>
    {props.children}
  </button>
));
export class <%=component%> extends Component {
    constructor(props){
        super(props);
        this.realButton = React.createRef();
    }
    componentDidMount(){
        //直接拿到 inner element ref
        console.log(this.realButton);
    }
    render() {
        return (
        <div>
            <div style={{display:'inline-block',marginLeft:'10px'}}>
                <Popover
                   placement='top'
                   title={<div>this is title</div>}
                   content={<div>this is content</div>}
                   >
                   <Button type="Primary">hover me</Button>
                </Popover>
            </div>
            <div style={{display:'inline-block',marginLeft:'10px'}}>
                <Popover
                  placement='top'
                  title={<div>this is title</div>}
                  content={<div>原生元素无需withRef属性</div>}
                  >
                  <button type="Primary">原生 hover me</button>
                </Popover>
            </div>
            <div style={{display:'inline-block',marginLeft:'10px'}}>
                <Popover
                  placement='top'
                  title={<div>this is title</div>}
                  content={<div>自定义组件需要withRef属性</div>}
                  >
                    <Test>test hover me</Test>
                </Popover>
            </div>
            <div style={{display:'inline-block',marginLeft:'10px'}}>
                <Popover
                  placement='top'
                  title={<div>this is title</div>}
                  content={<div>组件使用forwardRef配合createRef,穿透获取ref</div>}
                  >
                  <MyButton ref={this.realButton}>组件使用forwardRef hover me</MyButton>
                </Popover>
            </div>
        </div>
        )
    }
}
````