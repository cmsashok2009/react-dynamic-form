import React, { useRef } from "react";
import styled from "@emotion/styled";
import ContentArea from "./ContentArea";
import QuickLink from "./QuickLink";
import useCardObserver from "./Hooks/useCardObserver";
import useScrollToCard from "./Hooks/useScrollToCard"; // Import the custom hook
import { cards } from "../mock/mockData";

// Global Styles
const GlobalStyle = styled.div`
  * {
    box-sizing: border-box;
  }
`;

// Layout Styling
const Container = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  gap: 20px;
`;

const ContentAreaContainer = styled.div`
  flex: 0 1 80%;
`;

const QuickLinkContainer = styled.div`
  flex: 0 1 20%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  height: fit-content;
  position: sticky;
  top: 170px;
  background-color: white;
  z-index: 999;
`;

const MainContentAreaComp = () => {
  const titleRefs = useRef([]);
  titleRefs.current = []; // Reset to avoid stale references

  const { scrollToCard, scrollLock } = useScrollToCard(titleRefs, 170);

  const activeCard = useCardObserver(titleRefs, {
    threshold: 0.5,
    scrollLock,
  });

  return (
    <GlobalStyle>
      <Container>
        <ContentAreaContainer>
          <ContentArea
            cards={cards}
            activeCard={activeCard}
            onCardClick={scrollToCard}
            titleRefs={titleRefs}
          />
        </ContentAreaContainer>

        <QuickLinkContainer>
          <QuickLink
            titles={cards.map((card) => card.title)}
            activeIndex={activeCard}
            onClick={scrollToCard}
          />
        </QuickLinkContainer>
      </Container>
    </GlobalStyle>
  );
};

export default MainContentAreaComp;
