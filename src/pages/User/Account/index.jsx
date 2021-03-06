import React, { useState, useEffect } from 'react';
import './styles.css';
import moment from 'moment';

import { Form, Table, Tabs, List } from 'antd';

import {
  firebaseApp,
} from '../../../configs/firebase';

import { LOCATION } from '../../../constants/common';

function Account({
  transactionsList,
}) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [checkInHistory, setCheckInHistory] = useState([]);


  useEffect(() => {
    firebaseApp.database().ref(`/History/parkingMan/moneyIn/${user.id}`).on('value', (snapshot) => {
      firebaseApp.database().ref(`/User/information/parkingMan/${user.id}`).on('value', (snapshotUser) => {
        let snapshotUserInformation = snapshotUser.val();
        let snapshotTransactionValue = snapshot.val();
        let newTransactionHistory = [];

        for (let obj in snapshotTransactionValue) {
          Array.prototype.push.apply(newTransactionHistory, [snapshotTransactionValue[obj]]);
        }

        for (let topUpId in snapshotTransactionValue) {
          newTransactionHistory = [
            {
              id: snapshotTransactionValue[topUpId].idPay,
              date: moment(snapshotTransactionValue[topUpId].dateSend, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
              money: snapshotTransactionValue[topUpId].payMoney,
              content: "-",
              balance: snapshotUserInformation.money
            },
            ...newTransactionHistory,
          ]
        }
        setTransactionHistory([...newTransactionHistory]);
      })
    })

    firebaseApp.database().ref(`/History/parkingMan/moneyOut/${user.id}`).on('value', (snapshot) => {
      let snapshotHistoryValue = snapshot.val();
      let newCheckInHistory = [];
      // for (let obj in snapshotHistoryValue) {
      //   Array.prototype.push.apply(newCheckInHistory, [snapshotHistoryValue[obj]]);
      // }
      for (let checkInId in snapshotHistoryValue) {
          newCheckInHistory = [
            {
              place: `${LOCATION[snapshotHistoryValue[checkInId].place]}`,
              plateLicense: snapshotHistoryValue[checkInId].plateLicense,
              dateGet: moment(snapshotHistoryValue[checkInId].dateGet, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
              dateSend: moment(snapshotHistoryValue[checkInId].dateSend, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
            },
            ...newCheckInHistory,
          ]
      }
      setCheckInHistory([...newCheckInHistory]);
    })
  }, [])

  const columns = [
    {
      title: 'Trading code',
      dataIndex: 'id',
      key: 'idPay',
    },
    {
      title: 'Time',
      dataIndex: 'date',
      key: 'dateSend',
    },
    {
      title: 'Amount of money',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];
  const { TabPane } = Tabs;

  const renderHistoryList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={checkInHistory}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.place}
              description={item.plateLicense}
            />
            <div>
              <p>Date Send: {item.dateSend}</p>
              <p>Date Get: {item.dateGet}</p>
            </div>
          </List.Item>
        )}
      />
    )
  }

  return (
    <div className="dsp-account">
      <div className="content-account">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Transaction History" key="1">
            <div className="div-table">
              <Table columns={columns} dataSource={transactionHistory} pagination={{ pageSize: 7 }} />
            </div>
          </TabPane>
          <TabPane tab="Parking History" key="2">
            <div className="history-parking">
              {renderHistoryList()}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default Account;