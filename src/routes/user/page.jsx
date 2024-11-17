import UserInfo from "~/components/Home/UserInfo"
import Tab from "~/components/Home/Tab"
import Footer from "~/components/MyFooter"
import BigButton from "~/components/buttons/BigButton"

export default function User() {
  
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <UserInfo></UserInfo>
      <Tab></Tab>
      <BigButton></BigButton>
      <Footer></Footer>

    </div>
  )
}
