#  自定义提示
## 使用 tipFormatter 可以格式化 Tooltip 的内容，设置 tipFormatter={null}，则隐藏 Tooltip。

````jsx
import Slider from '@/components/Slider'
import { Switch } from 'antd';
function formatter(value) {
let valueAfter=value+'%'
  return valueAfter;
}

export class Demo5md extends Component {
        constructor(props) {
            super(props);
            this.state = {
              
            };
        }
 

    render() {
                   return (
                     <div>
                         <Slider tipFormatter={formatter} />
                         <Slider tipFormatter={null} />
                       </div>
                   );
                 }
}
````