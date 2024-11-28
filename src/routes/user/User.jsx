import { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from '~/components/home/UserInfo';
import Tab from '~/components/home/Tab';
import BigButton from '~/components/buttons/BigButton';
import { useNavigate } from 'react-router-dom';
import api from '~/lib/apis/auth'

export default function User() {
  const navigate = useNavigate();
  const [ETFList, setETFList] = useState([]); // ETF 포트폴리오 상태
  const [SubscriberList, setSubscriberList] = useState([]); // 구독 리스트 상태
  // const userId = 3; // 고정된 userId (추후 필요 시 동적으로 변경 가능)
  const id = localStorage.getItem("id");

  // ETFList 초기 데이터 가져오기
  const fetchETFList = async () => {
    try {
      const response = await api.get(`/api/userinfo/etf/list/${id}`);
      console.log(response);
      const ETFList = response.data.portfolios.map((portfolio) => ({
        portfolioId: portfolio.portfolioId,
        name: portfolio.title,
        revenue: portfolio.revenue,
      }));
      setETFList(ETFList);
    } catch (error) {
      console.error('ETFList 목록 불러오기 오류:', error);
    }
  };

  // SubscriberList 초기 데이터 가져오기
  const fetchSubscriberList = async () => {
    try {
      const response = await api.get(`/api/subscribe/list/${id}`);
      const SubscriberList = response.data.map((subscriber) => ({
        id: subscriber.publisher_id,
        name: subscriber.nickname,
        revenue: subscriber.revenue,
      }));
      setSubscriberList(SubscriberList);
    } catch (error) {
      console.error('SubscriberList 목록 불러오기 오류:', error);
    }
  };

  // SSE 연결
  useEffect(() => {
    const eventSource = new EventSource(`/api/notifications/subscribe/${id}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // ETFList 업데이트
      setETFList((prevETFList) =>
        prevETFList.map((portfolio) =>
          portfolio.portfolioId === data.portfolioId
            ? { ...portfolio, revenue: data.revenue }
            : portfolio
        )
      );
    };

    eventSource.onerror = () => {
      console.error('SSE 연결 오류');
      eventSource.close();
    };

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      eventSource.close();
    };
  }, [id]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchETFList();
    fetchSubscriberList();
  }, []);

  const handleButtonClick = () => {
    navigate('/select-stock'); // '나만의 ETF 만들기' 버튼 클릭 시 경로 이동
  };

  return (
    <div>
      <UserInfo />
      <Tab ETFList={ETFList} SubscriberList={SubscriberList} />
      <BigButton text={'나만의 ETF 만들기'} onClick={handleButtonClick} />
    </div>
  );
}
