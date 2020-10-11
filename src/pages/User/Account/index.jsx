import React , {useState} from 'react';
import './styles.css';

import Card from './../../../components/Cards/index'

import { FaAddressCard, FaTrashAlt, FaThumbtack, } from 'react-icons/fa';
import { Button, Form, Input, } from 'antd';

function Account() {
  const [transactionListData, setTransactionListData] = useState([
    {
      no:'001',
      id:'GD10112020',
      time:'10/11/2020',
      money: '2000',
      title: 'Top Up to DSParking',
      balance:'4000'
    }
  ])

  const renderTransactionList = () => {
    return transactionListData.map((item, itemIndex) => {
      return (
        <tr key={itemIndex}>
          <td>{item.no}</td>
          <td>{item.id}</td>
          <td>{item.time}</td>
          <td>{item.money}</td>
          <td>{item.title}</td>
          <td>{item.balance}</td>
          <td><FaTrashAlt /> <FaThumbtack /></td>
        </tr>
      );
    });
  }

  return (
    <div className="dsp-account">
      <Card/>
      <div className="content-account">
        <div className="account-title">
          <p><span><FaAddressCard/></span>Tài Khoản Ngân Hàng/DSPay</p>
        </div>
        <div className="account-form">
            <Button>Liên kết Ngân Hàng</Button>
            <div className="account-info">
            <Form
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{display:'flex', justifyContent: 'space-between', marginTop:'13px'}}
            >
              <Form.Item label="Tên tài khoản: ">
                <Input />
              </Form.Item>
              <Form.Item label="Số thẻ: ">
                <Input />
              </Form.Item>
              <Form.Item label="Số dư hiện tại: ">
                <Input />
              </Form.Item>
            </Form>
            </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã giao dịch</th>
              <th>Thời gian</th>
              <th>Số tiền</th>
              <th>Mô tả</th>
              <th>Số dư còn lại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {renderTransactionList()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Account;