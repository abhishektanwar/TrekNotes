import React from "react";
import Button from "../../components/Header/Button";
import utils from "../../utils";
import { contentData } from "./data";
const LandingPage: React.FC = () => {
  return (
    <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
      <div className="grid-2-column-layout margin-top-60">
        <div className="horizontal-card flex-align-item-center flex-justify-content-center">
          <div className="text-container">
            <h1>Tame your work,</h1>
            <h1>organize your life</h1>
            <h4>
              {" "}
              Remember everything and tackle any project with your notes, tasks,
              and schedule all in one place.
            </h4>
            <Button buttonText={"Join Now"} buttonStyle={"typo-sm"} />
            <Button
              buttonText={"Already have an account ?"}
              buttonStyle={"typo-sm secondary-button primary-color"}
            />
          </div>
        </div>
        <div className="flex-row flex-justify-content-center">
          <img
            loading="lazy"
            className="responsive-img"
            src={utils.getImg("landing-page-banner-image.svg")}
            style={{ maxWidth: "340px" }}
          />
        </div>
      </div>
      <div
        className="flex-row margin-top-60"
        style={{ justifyContent: "space-between" }}
      >
        {contentData.map((data) => {
          return (
            <div style={{ margin: "20px",maxWidth:'400px' }}>
              <h3 className="text-medium-weight">{data.heading}</h3>
              <p className="typo-sm" style={{color:'black'}}>{data.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
