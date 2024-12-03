import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './List';
import ETFButtonList from './ETFButtonList';
import MyReport from './MyReport';
import { useParams } from 'react-router-dom';

export default function Tab({ ETFList, SubscriberList }) {
  const params = useParams();

  console.log("params" + JSON.stringify(params));
  const [activeTab, setActiveTab] = useState(params.activeTab || '분석 리포트');

  // 구독 항목 클릭 시 실행되는 함수
  const handleUserClick = (userId) => {
    navigate(`/ranking-detail/${userId}`); // 클릭된 userId로 이동
  };

  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between border-bottom">
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '분석 리포트' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('분석 리포트')}
          style={{
            color: '#666',
            fontSize: '17px',
            fontWeight: activeTab === '분석 리포트' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'wrap',
          }}
        >
          분석 리포트
          {activeTab === '분석 리포트' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '나의 ETF' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('나의 ETF')}
          style={{
            color: '#666',
            fontSize: '17px',
            fontWeight: activeTab === '나의 ETF' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          나의 ETF
          {activeTab === '나의 ETF' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '구독 목록' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('구독 목록')}
          style={{
            color: '#666',
            fontSize: '17px',
            fontWeight: activeTab === '구독 목록' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          구독 목록
          {activeTab === '구독 목록' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>
      </div>

      <div>
        {activeTab === '분석 리포트' && <MyReport />}
        {activeTab === '나의 ETF' && <ETFButtonList items={ETFList} />}
        {activeTab === '구독 목록' && (
          <List
            items={SubscriberList.map((subscriber) => ({
              userId: subscriber.id, // userId를 전달
              name: subscriber.name,
              rate: subscriber.revenue,
              isPositive: subscriber.revenue > 0, // 수익 여부
            }))}
            onItemClick={(item) => {
              handleUserClick(item.userId); // 클릭 시 userId를 전달
            }}
          />
        )}
      </div>
    </div>
  );
}
