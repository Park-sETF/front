import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './List';
import ETFButtonList from './ETFButtonList';
import MyReport from './MyReport';

export default function Tab({ ETFList, SubscriberList }) {
  const [activeTab, setActiveTab] = useState('분석 리포트');

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
            whiteSpace: 'nowrap',
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
              portfolioId: subscriber.id, 
              name: subscriber.name,
              rate: subscriber.revenue,
              isPositive: subscriber.revenue > 0, 
            }))}
            onItemClick={(item) => {
              console.log('구독 항목 클릭:', item);
            }}
          />
        )}
      </div>
    </div>
  );
}
