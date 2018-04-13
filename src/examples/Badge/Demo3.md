#  可点击
##用 a 标签进行包裹即可。

````jsx
import Badge from '@/components/Badge'
export class <%=component%> extends Component {
    render() {
        return (
            <div>
                <a href="#">
                    <Badge badgeContent={10}>
                        <span style={{width:'40px',height:'40px',background:'#fff'}}></span>
                    </Badge>
               </a>
            </div>
        )
    }
}
````