import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ResponsiveContainer, LineChart, Line, YAxis, XAxis, Tooltip
} from 'recharts';
import QRCode from 'qrcode.react';
import moment from 'moment';
import './styles.css'

import AvatarDefault from '../../../img/avatardefault.jpg'
import history from '../../../util/history'

import {
  Button,
  Tooltip as Tip,
  Table
} from 'antd';

import { FaMotorcycle } from 'react-icons/fa';

import { getHistoryList } from '../../../redux/actions/index';

import {
  firebaseApp,
} from '../../../configs/firebase';

import { WEEKDAY_FORMAT, CHECKIN_FORMAT } from '../../../constants/common';

function Home() {
  // const [userData, setUserData] = useState({});

  // const [checkInHistory, setCheckInHistory] = useState([]);
  // const [weekChartData, setWeekChartData] = useState([]);
  // const [monthChartData, setMonthChartData] = useState([]);

  // const [totalWeekCount, setTotalWeekCount] = useState('0');
  // const [totalMonthCount, setTotalMonthCount] = useState('0');

  // const user = JSON.parse(localStorage.getItem('user'));

  // const currentDay = moment();
  // const oneWeekAgo = moment().subtract(6, 'days');
  // const oneMonthAgo = moment().subtract(1, 'month').add(1, 'days');

  // const currentMonth = moment().format('MM');
  // const currentYear = moment().format('YYYY');

  // useEffect(() => {
  //   const currentWeekAgo = getDayList(oneWeekAgo, currentDay);
  //   const currentMonthAgo = getDayList(oneMonthAgo, currentDay);

  //   firebaseApp.database().ref(`/User/information/parkingMan/${user.id}`).on('value', (snapshot) => {
  //     setUserData({ ...snapshot.val() });
  //   })
  //   firebaseApp.database().ref(`/History/parkingMan/moneyOut/${user.id}`)
  //     .on('value', (snapshot) => {
  //       let snapshotValue = snapshot.val();
  //       let newTotalWeekCount = 0;
  //       const newWeekChartData = currentWeekAgo.map((item) => {
  //         const weekCount = ((snapshotValue || {})[item.month]?.day || {})[item.day]?.count || 0;
  //         newTotalWeekCount = newTotalWeekCount + weekCount;
  //         return {
  //           day: `${WEEKDAY_FORMAT[item.weekday]}`,
  //           count: weekCount,
  //         }
  //       })
  //       setTotalWeekCount(newTotalWeekCount);
  //       setWeekChartData([...newWeekChartData])
  //     })

  // firebaseApp.database().ref(`/users/${user.uid}/chartData/${currentYear}/month`)
  //   .on('value', (snapshot) => {
  //     let snapshotValue = snapshot.val();
  //     let newTotalMonthCount = 0;
  //     const newMonthChartData = currentMonthAgo.map((item) => {
  //       const monthCount = ((snapshotValue || {})[item.month]?.day || {})[item.day]?.count || 0;
  //       newTotalMonthCount = newTotalMonthCount + monthCount;
  //       return {
  //         day: `${item.day}/${item.month}`,
  //         count: monthCount,
  //       }
  //     })
  //     setTotalMonthCount(newTotalMonthCount);
  //     setMonthChartData([...newMonthChartData])
  //   })

  //   firebaseApp.database().ref(`/users/${user.uid}/parkingHistory`).on('value', (snapshot) => {
  //     let snapshotHistoryValue = snapshot.val();
  //     let newCheckInHistory = [];
  //     for (let checkInId in snapshotHistoryValue) {
  //       if (newCheckInHistory.length <= 3) {
  //         newCheckInHistory = [
  //           {
  //             type: CHECKIN_FORMAT[snapshotHistoryValue[checkInId].type],
  //             date: moment(snapshotHistoryValue[checkInId].dateTime, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
  //             timeIn: moment(snapshotHistoryValue[checkInId].dateTime, 'YYYYMMDDHHmm').format('HH:mm'),
  //             place: 'null',
  //           },
  //           ...newCheckInHistory,
  //         ]
  //       }
  //     }
  //     setCheckInHistory([...newCheckInHistory]);
  //   })
  // }, [])

  // const getDayList = (startDay, endDay) => {
  //   let days = [];
  //   for (let date = startDay; date <= endDay; date.add(1, 'days')) {
  //     days = [
  //       ...days,
  //       {
  //         day: date.format('DD'),
  //         month: date.format('MM'),
  //         weekday: date.weekday(),
  //       },
  //     ]
  //   }
  //   return days;
  // }

  // const columnsHistory = [
  //   {
  //     title: 'Loại', dataIndex: 'type', key: 'type',
  //   },
  //   {
  //     title: 'Ngày', dataIndex: 'date', key: 'date',
  //   },
  //   {
  //     title: 'Thời gian', dataIndex: 'timeIn', key: 'timeIn',
  //   },
  //   {
  //     title: 'Địa điểm', dataIndex: 'place', key: 'place',
  //   },
  // ];

  // return (
  //   <div className="home">
  //     <div className="home-left">
  //       <div className="home-statistic">

  //         <div className="home-statistic-items">
  // <div className="home-statistic-info">
  //   <div className="icon-title-statistics">
  //     <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffe7ba' }}>
  //       < FaMotorcycle style={{ fontSize: '25px', fill: '#db5c00', marginTop: '8px' }} />
  //     </div>
  //     <h5>Lượt gửi tuần</h5>
  //   </div>
  //   <h2>{totalWeekCount}</h2>
  // </div>
  // <div className="home-statistic-chart">
  //   <ResponsiveContainer>
  //     <LineChart
  //       data={weekChartData}
  //       margin={{ top: 10, right: 30, left: -30, bottom: -10 }}
  //     >
  //       <XAxis dataKey="day" />
  //       <YAxis dataKey="count" />
  //       <Tooltip />
  //       <Line type="monotone" dataKey="count" stroke="#db5c00" strokeWidth={2} />
  //     </LineChart>
  //   </ResponsiveContainer>
  // </div>
  //         </div>

  // <div className="home-statistic-items">
  //   <div className="home-statistic-info">
  //     <div className="icon-title-statistics">
  //       <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffe7ba' }}>
  //         < FaMotorcycle style={{ fontSize: '25px', fill: '#db5c00', marginTop: '8px' }} />
  //       </div>
  //       <h5>Lượt gửi tháng</h5>
  //     </div>
  //     <h2>{totalMonthCount}</h2>
  //   </div>
  //   <div className="home-statistic-chart">
  //     <ResponsiveContainer>
  //       <LineChart
  //         margin={{ top: 10, right: 30, left: -30, bottom: -10 }}
  //         data={monthChartData}
  //       >
  //         <Tooltip />
  //         <XAxis dataKey="day" />
  //         <YAxis dataKey="count" />
  //         <Line type="monotone" dataKey="count" stroke="#db5c00" strokeWidth={2} />
  //       </LineChart>
  //     </ResponsiveContainer>
  //   </div>
  // </div>

  //   <div className="home-history">
  //     <div className="home-history-detail">
  //       <div className="home-history-title">
  //         <h4>Lịch sử ra vào</h4>
  //       </div>
  //       <div className="home-history-table">
  //         <div className="div-table-history">
  //           <Table
  //             dataSource={checkInHistory}
  //             columns={columnsHistory}
  //             pagination={false}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>

  //     <div className="home-right">
  // <div className="home-user">
  //   <div className="home-user-detail">
  //     <div className="div-img">
  //       <img src={user.avatar ? user.avatar : AvatarDefault} alt="Avatar" />
  //     </div>
  //     <div className="home-user-info">
  //       <div className="information">
  //         <span className="name">{user.name}</span>
  //         <span>{user.studentCode}</span>
  //         <span>{user.birthday ? user.birthday : '-'}</span>
  //         <span>
  //           <Button onClick={() => history.push('/profile')} style={{marginTop:'30px'}}>Xem thông tin cá nhân</Button>
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // </div>

  //       <div className="home-qrcode">
  //         <p>Mã QrCode của bạn:</p>
  //         <div className="home-qrcode-img">
  //           <QRCode value={`${user.uid}${userData.qrPin}`} size={140} />
  //         </div>
  //       </div>

  //     </div>
  //   </div>
  // )
  const [userData, setUserData] = useState({});

  const user = JSON.parse(localStorage.getItem('user'));

  const [checkInHistory, setCheckInHistory] = useState([]);
  const [weekChartData, setWeekChartData] = useState([]);
  const [monthChartData, setMonthChartData] = useState([]);

  const [totalWeekCount, setTotalWeekCount] = useState('0');
  const [totalMonthCount, setTotalMonthCount] = useState('0');
  const currentDay = moment();
  const oneWeekAgo = moment().subtract(6, 'days');
  const oneMonthAgo = moment().subtract(1, 'month').add(1, 'days');

  const currentMonth = moment().format('MM');
  const currentYear = moment().format('YYYY');

  const getDayList = (startDay, endDay) => {
    let days = [];
    for (let date = startDay; date <= endDay; date.add(1, 'days')) {
      days = [
        ...days,
        {
          day: date.format('DD'),
          month: date.format('MM'),
          year: date.format('YYYY'),
          weekday: date.weekday(),
        },
      ]
    }
    return days;
  }

  const columnsHistory = [
    {
      title: 'Loại', dataIndex: 'type', key: 'type',
    },
    {
      title: 'Ngày', dataIndex: 'date', key: 'date',
    },
    {
      title: 'Thời gian', dataIndex: 'timeIn', key: 'timeIn',
    },
    {
      title: 'Địa điểm', dataIndex: 'place', key: 'place',
    },
  ];

  useEffect(() => {
    const currentWeekAgo = getDayList(oneWeekAgo, currentDay);
    const currentMonthAgo = getDayList(oneMonthAgo, currentDay);

    firebaseApp.database().ref(`/User/information/parkingMan/${user.id}`).on('value', (snapshot) => {
      setUserData({ ...snapshot.val() });
    })

    firebaseApp.database().ref(`/History/parkingMan/moneyOut/${user.id}`)
      .on('value', (snapshot) => {
        let snapshotValue = snapshot.val();
        let newTotalWeekCount = 0;
        let arr = [];

        for (let obj in snapshotValue) {
          //get child object
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }

        const newWeekChartData = currentWeekAgo.map((item) => {
          let weekCount = 0;
          arr.map((ob) => {
            let convertDay = ob.dateGet.split(/-| /, 3);
            // console.log(item.day)
            // console.log(convertDay[2])
            if (item.day == convertDay[2] && item.month == convertDay[1] && item.year == convertDay[0]) {
              weekCount++;
              console.log("check")
            }
          })
          newTotalWeekCount += weekCount;
          return {
            day: `${WEEKDAY_FORMAT[item.weekday]}`,
            count: weekCount,
          }
        })
        setTotalWeekCount(newTotalWeekCount);
        setWeekChartData([...newWeekChartData])
      })

    //Chart Month
    firebaseApp.database().ref(`/History/parkingMan/moneyOut/${user.id}`)
      .on('value', (snapshot) => {
        let snapshotValue = snapshot.val();
        let newTotalMonthCount = 0;
        let arr = [];

        for (let obj in snapshotValue) {
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }

        const newMonthChartData = currentMonthAgo.map((item) => {
          let monthCount = 0;
          arr.map((ob) => {
            let convertDay = ob.dateGet.split(/-| /, 3);
            // console.log(item.day)
            // console.log(convertDay[2])
            if (item.day == convertDay[2] && item.month == convertDay[1] && item.year == convertDay[0]) {
              monthCount++;
            }
          })
          newTotalMonthCount += monthCount;
          return {
            day: `${item.day}/${item.month}`,
            count: monthCount,
          }
        }) 
        setTotalMonthCount(newTotalMonthCount);
        setMonthChartData([...newMonthChartData])
      })
  }, [])

  return (
    <div className="home">
      <div className="home-left">
        <div className="home-statistic">
          <div className="home-statistic-items">
            <div className="home-statistic-info">
              <div className="icon-title-statistics">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffe7ba' }}>
                  < FaMotorcycle style={{ fontSize: '25px', fill: '#db5c00', marginTop: '8px' }} />
                </div>
                <h5>Lượt gửi tuần</h5>
              </div>
              <h2>{totalWeekCount}</h2>
            </div>
            <div className="home-statistic-chart">
              <ResponsiveContainer>
                <LineChart
                  data={weekChartData}
                  margin={{ top: 10, right: 30, left: -30, bottom: -10 }}
                >
                  <XAxis dataKey="day" />
                  <YAxis dataKey="count" />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#db5c00" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="home-statistic-items">
            <div className="home-statistic-info">
              <div className="icon-title-statistics">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffe7ba' }}>
                  < FaMotorcycle style={{ fontSize: '25px', fill: '#db5c00', marginTop: '8px' }} />
                </div>
                <h5>Lượt gửi tháng</h5>
              </div>
              <h2>{totalMonthCount}</h2>
            </div>
            <div className="home-statistic-chart">
              <ResponsiveContainer>
                <LineChart
                  margin={{ top: 10, right: 30, left: -30, bottom: -10 }}
                  data={monthChartData}
                >
                  <Tooltip />
                  <XAxis dataKey="day" />
                  <YAxis dataKey="count" />
                  <Line type="monotone" dataKey="count" stroke="#db5c00" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="home-history">
          <div className="home-history-detail">
            <div className="home-history-title">
              <h4>Lịch sử ra vào</h4>
            </div>
            <div className="home-his-table">
              <div className="div-history-table">
                <Table
                  dataSource={checkInHistory}
                  columns={columnsHistory}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-right">
        <div className="home-user">
          <div className="home-user-detail">
            <div className="user-img">
              <img src={userData.avatar ? userData.avatar : AvatarDefault} alt="Avatar" />
            </div>
            <div className="home-user-info">
              <div className="user-information">
                <span className="name">{userData.name}</span>
                <span>{userData.idStudent}</span>
                <span>{userData.birthday ? userData.birthday : '-'}</span>
                <span>
                  <Button onClick={() => history.push('/profile')} style={{ marginTop: '30px' }}>Xem thông tin cá nhân</Button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-qrcode">
          <p>Mã QrCode của bạn:</p>
          <div className="home-qrcode-img">
            <QRCode value={`${user.id}${userData.secretNum}`} size={140} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;