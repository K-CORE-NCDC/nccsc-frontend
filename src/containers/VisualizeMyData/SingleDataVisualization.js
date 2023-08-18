import React from "react";
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";
export const SingleDataVisualization = () => {
  return (
    <div>
      <HeaderComponent
        title="회원가입"
        breadCrumbs={{
          key1: 'value1',
          key2: 'value2',
          key3: 'value3'
        }}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="section ptn">
          <div className="auto">

          </div>
        </div>
      </article>
    </div>
  )

}