import React, { Component } from 'react';
import LibraryBooks from './books';
import { Row, Col, Form, Input, Icon, Select } from 'antd';
import { Years } from '../services/generators';

class LibraryScreen extends Component {

    years() {
        return Years().map((r, i) => 
            <Select.Option key={i} value={r}>
                {r}
            </Select.Option>
        );
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="background">
        <div className='index-container'>
            <Row className='library-container' type='flex'>
                <Col xl={4} lg={4} md={6} sm={22} xs={22} className='sidebar'>
                <div className='sidebar-content'>
                    hi
                </div>
                </Col>
                <Col xl={20} lg={20} md={6} sm={22} xs={22}>
                    <Row className='library-header'>
                        <div className='search'>
                            <Form layout="inline" className='form' onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    {getFieldDecorator('title', {
                                        rules: [{ required: false }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                                    )}
                                </Form.Item>

                                <Form.Item>
                                    {getFieldDecorator('year', {
                                        rules: [{ required: false }],
                                        initialValue: Years()[0]
                                    })(
                                        <Select
                                            style={{ width: 120 }}
                                        >
                                            {this.years()}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('category', {
                                        rules: [{ required: false }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('Year', {
                                        rules: [{ required: false }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('Year', {
                                        rules: [{ required: false }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('Year', {
                                        rules: [{ required: false }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('Year', {
                                        rules: [{ required: false }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('Year', {
                                        rules: [{ required: false }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('Year', {
                                        rules: [{ required: false }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                        
                            <LibraryBooks />
                        
                    </Row>
                    <Row>
                    </Row>
                </Col>
                
            </Row>
            <div className='footer-bar'>
                Branding
            </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(LibraryScreen);
