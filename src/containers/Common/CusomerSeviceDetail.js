import React from "react";
import HeaderComponent from "./HeaderComponent/HeaderComponent";

export const CustomerServiceDetail = ({ tabName, rowTitle }) => {
  const title = { id: "details", defaultMessage: "Details" }

  const breadCrumbs = {
    '/signup/': [
      { id: 'Signup', defaultMessage: 'Sign Up', to: '/signup/' }
    ],
  };
  return (
    <>
      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/signup/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div>
          <div className="contentsTitle">
            <div className="auto">
              <h3 className="colorSecondary">
                <span className="colorPrimary">Sign</span>
                up
              </h3>
            </div>
          </div>
          <div className="ptn">
            <div className="auto">

              sushma
            </div>
          </div>
        </div>
      </article>
    </>
  )
}