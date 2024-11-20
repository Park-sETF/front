import BigButton from '~/components/buttons/BigButton';
import Footer from '~/components/MyFooter';
import MobileHeader from '~/components/Header/MobileHeader';

export default function ETFPocket() {
  return (
    <div>
      <MobileHeader text={'나만의 ETF 만들기'}></MobileHeader>
      <BigButton text={'투자하기'} />
      <Footer />
    </div>
  );
}
