import React from "react";
import Header from "../components/Header";
import ActionItems from "../components/ActionItems";
import MainContentAreaComp from "../components/MainContentAreaComp";

const MainPage = () => {
  const actions = [
    {
      label: "Submit",
      onClick: () => console.log("Action 1"),
      priority: 1,
      buttonPosition: "right",
    },
    {
      label: "Back",
      onClick: () => console.log("Action 2"),
      priority: 1,
      buttonPosition: "left",
    },
    {
      label: "ErrorList",
      onClick: () => console.log("Action 3"),
      priority: 2,
      buttonPosition: "left",
    },
  ];

  return (
    <>
      <Header title="Modern UI Playground" />
      <ActionItems actions={actions} />
      <MainContentAreaComp />
    </>
  );
};

export default MainPage;
// Request to CodeGPT: Generate test cases for Button component
