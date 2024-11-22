import UserInfo from '~/components/Home/UserInfo';
import Tab from '~/components/Home/Tab';
import BigButton from '~/components/buttons/BigButton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function User() {
  const navigate = useNavigate();
  const [ETFList, setETFList] = useState([]); // ETF 상태 추가
  const [SubscriberList,setSubscriberList] = useState([]); //구독 리스트 추가 
  const userId = 2; // 고정된 userId

  const handleButtonClick = () => {
    navigate('/select-stock'); // 클릭 시 경로 이동
  };

  useEffect(() => {

    const fetchETFList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/userinfo/etf/list/${userId}`);
        const ETFList = response.data.portfolios.map((portfolio) => ({
          name: portfolio.title,
          revenue: portfolio.revenue,
        }));
        setETFList(ETFList); // 상태 업데이트
      } catch (error) {
        console.log('ETFList 목록 불러오기 오류', error);
      }
    };

    const fetchSubscriberList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/subscribe/list/${userId}`);
        const SubscriberList = response.data.map((subscriber) => ({
          id: subscriber.publisher_id,
          name: subscriber.nickname,
          revenue: subscriber.revenue,
        }));
        setSubscriberList(SubscriberList);
      } catch (error) {
        console.log('SubscriberList 목록 불러오기 오류', error);
      }
    };

    fetchETFList(); // 함수 호출
    fetchSubscriberList();
  }, []);

  return (
    <div>
      <UserInfo />
      <Tab ETFList={ETFList} SubscriberList={SubscriberList} />
      <BigButton text={'나만의 ETF 만들기'} onClick={handleButtonClick} />
    </div>
  );
}
