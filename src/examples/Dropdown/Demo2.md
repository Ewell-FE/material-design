#  定义事件类型
## 最简单的下拉菜单


````jsx
import Dropdown from 'antd-material/core/Dropdown'
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from 'antd-material/core/Button'
import Icon from 'antd-material/core/Icon'

export class <%=component%> extends Component {
    render() {
        const menu = (
            <MenuList role="menu">
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
            </MenuList>
        );
        return (
            <div>
                <Dropdown overlay={menu} trigger={'hover'}>
                    <Button>Hover Me<Icon type="angle-down"/></Button>
                </Dropdown>
            </div>
        )
    }
}
````