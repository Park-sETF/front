import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { House, Clipboard, Bell } from 'react-bootstrap-icons';

export default function Footer() {
  const [activeTab, setActiveTab] = useState('홈');

  return (
    <div
      className="position-sticky bg-white border-top"
      style={{
        maxWidth: '430px',
        margin: '0 auto',
      }}
    >
      <div className="d-flex justify-content-around py-2">
        <button
          onClick={() => setActiveTab('홈')}
          className="btn btn-link text-decoration-none d-flex flex-column align-items-center"
          style={{
            color: activeTab === '홈' ? '#000' : '#999',
            transition: 'color 0.2s ease',
          }}
        >
          <House size={24} />
          <span style={{ fontSize: '12px', marginTop: '4px' }}>홈</span>
        </button>

        <button
          onClick={() => setActiveTab('포트폴리오')}
          className="btn btn-link text-decoration-none d-flex flex-column align-items-center"
          style={{
            color: activeTab === '포트폴리오' ? '#000' : '#999',
            transition: 'color 0.2s ease',
          }}
        >
          <Clipboard size={24} />
          <span style={{ fontSize: '12px', marginTop: '4px' }}>포트폴리오</span>
        </button>

        <button
          onClick={() => setActiveTab('알림')}
          className="btn btn-link text-decoration-none d-flex flex-column align-items-center"
          style={{
            color: activeTab === '알림' ? '#000' : '#999',
            transition: 'color 0.2s ease',
          }}
        >
          <Bell size={24} />
          <span style={{ fontSize: '12px', marginTop: '4px' }}>알림</span>
        </button>
      </div>

      <style>{`
        .btn-link:focus {
          box-shadow: none;
        }
      `}</style>

      {/* <style>{`
        .btn-link:focus {
          box-shadow: none;
        }
        @media (min-width: 375px) and (max-width: 430px) {
          .btn-link {
            padding: 8px 16px;
          }
        }
      `}</style> */}
    </div>
  );
}
