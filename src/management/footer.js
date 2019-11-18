import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { styles } from "./style";
import moment from 'moment';

const {
  Header, Content, Footer, Sider,
} = Layout;

export default class StudentFooter extends Component {

    render() {
        return (
                <Footer style={styles.footer}>
                    Department of Cyber Security Science ©{moment().year()}
                </Footer>
    
        )
   }
}