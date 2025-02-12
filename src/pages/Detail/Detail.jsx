import Banner from "./Banner";
import Content from "./Content";
import Credits from "./Credits";
import Review from "./Review";
import Collection from "./Collection";
import Comment from "./Comment";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
// import ReviewModal from "./ReviewModal";

import "./detail.css";

function Detail() {

  return (
    <div className="root-div">
      {/* <Header /> */}
      <section className="section-1">
        <div>
          <div className="base-div">
            <div className="top-container">
              <div>
                <Banner />
                <Content />
              </div>
            </div>
            <section className="content-credits-wrap">
              <Credits />
              <Review />
              <Collection />
            </section>
          </div>
          <Comment />
          {/* <ReviewModal /> */}
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
}

export default Detail;
