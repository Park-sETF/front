import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './List';
import ETFButtonList from './ETFButtonList';
import MyReport from './MyReport';

export default function Tab({ ETFList, SubscriberList }) {
  const [activeTab, setActiveTab] = useState('구독 목록');

  return (
    <div style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}>
      <div
        className="d-flex justify-content-between border-bottom"
        style={{ margin: '23px', marginTop: 0, marginBottom: 0 }}
      >
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '분석 리포트' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('분석 리포트')}
          style={{
            color: '#666',
            fontSize: '17px',
            fontWeight: activeTab === '분석 리포트' ? '600' : '400',
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
        {activeTab === '분석 리포트' && <MyReport/>}
        {activeTab === '나의 ETF' && <ETFButtonList items={ETFList} />}
        {activeTab === '구독 목록' && <List items={SubscriberList} />}
      </div>
    </div>
  );
}
