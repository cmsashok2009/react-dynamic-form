import React, { useRef, useMemo } from "react";
import styled from "@emotion/styled";
import ContentArea from "./ContentArea";
import QuickLink from "./QuickLink";
import PropTypes from "prop-types";
import useCardObserver from "../../hooks/useCardObserver";
import useScrollToCard from "../../hooks/useScrollToCard";
import { generateErrorMapFromErrors } from "../../utils/generateErrorMapFromErrors";

const Container = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  gap: 5px;
`;

const ContentAreaContainer = styled.div`
  flex: 0 1 85%;
`;

const QuickLinkContainer = styled.div`
  flex: 0 1 15%;
  padding: 2px;
  height: fit-content;
  position: sticky;
  top: 170px;
  background-color: white;
  z-index: 999;
`;

const MainContentLayout = ({
  cards,
  fieldRefs,
  getFieldId,
  formValues,
  formErrors,
  handleInputChange,
}) => {
  const titleRefs = useRef([]);
  titleRefs.current = [];

  const subcardRefs = useRef([]);
  subcardRefs.current = [];

  const { scrollToCard, scrollLock } = useScrollToCard(titleRefs, 170);
  const {
    activeCardIndex,
    activeSubIndex,
    visibleSubcards,
    setActiveCardIndex,
    setActiveSubIndex,
  } = useCardObserver(titleRefs, subcardRefs, {
    threshold: 0.5,
    scrollLock,
  });

  const quickLinkTitles = useMemo(
    () =>
      cards.map((card) => ({
        title: card.title,
        subcards: card.subcards?.map((s) => s.title) || [],
      })),
    [cards]
  );

  const errorCardErrorMap = generateErrorMapFromErrors(
    cards,
    formErrors,
    getFieldId
  );

  const handleQuickLinkClick = (cardIndex, subIndex = null) => {
    setActiveCardIndex(cardIndex);
    setActiveSubIndex(subIndex);

    if (subIndex === null) {
      scrollToCard(cardIndex);
    } else {
      const subRefObj = subcardRefs.current.find(
        (r) => r.cardIndex === cardIndex && r.subIndex === subIndex
      );
      if (subRefObj?.el) {
        const offsetTop =
          subRefObj.el.getBoundingClientRect().top + window.scrollY;
        requestAnimationFrame(() => {
          window.scrollTo({ top: offsetTop - 170, behavior: "smooth" });
        });
      }
    }
  };

  return (
    <Container data-testid="main-content-layout">
      <ContentAreaContainer>
        <ContentArea
          cards={cards}
          activeCardIndex={activeCardIndex}
          visibleSubcards={visibleSubcards}
          cardRefs={titleRefs}
          subcardRefs={subcardRefs}
          fieldRefs={fieldRefs}
          getFieldId={getFieldId}
          formValues={formValues}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
          errorCardErrorMap={errorCardErrorMap}
        />
      </ContentAreaContainer>
      <QuickLinkContainer data-testid="quick-link-container">
        <QuickLink
          titles={quickLinkTitles}
          activeCardIndex={activeCardIndex}
          visibleSubcards={visibleSubcards}
          onClick={handleQuickLinkClick}
          errorMap={errorCardErrorMap}
          activeSubIndex={activeSubIndex}
        />
      </QuickLinkContainer>
    </Container>
  );
};

MainContentLayout.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      inputs: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          required: PropTypes.bool,
          validation: PropTypes.shape({
            pattern: PropTypes.string,
            message: PropTypes.string,
          }),
        })
      ),
      subcards: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          inputs: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              required: PropTypes.bool,
              validation: PropTypes.shape({
                pattern: PropTypes.string,
                message: PropTypes.string,
              }),
            })
          ),
        })
      ),
    })
  ).isRequired,

  fieldRefs: PropTypes.object.isRequired,
  getFieldId: PropTypes.func.isRequired,
  formValues: PropTypes.objectOf(PropTypes.any).isRequired,
  formErrors: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default MainContentLayout;
