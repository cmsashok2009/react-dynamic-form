import React from "react";
import styled from "@emotion/styled";

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  position: sticky;
  top: 150px;
  background-color: white;
  z-index: 999;
  padding: 10px;
`;

const Heading = styled.h4`
  font-weight: 600;
  color: #3a5c7d;
  margin-bottom: 15px;
  text-align: center;
`;

const LinkItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const SubLinkItem = styled(LinkItem)`
  padding-left: 20px;
  font-size: 0.95rem;
`;

const Number = styled.span`
  flex-shrink: 0;
  color: ${({ isActive, hasError }) =>
    hasError ? "red" : isActive ? "#3a5c7d" : "#4b79a1"};
  font-weight: ${({ isActive }) => (isActive ? "600" : "normal")};
  user-select: none;
`;

const LinkText = styled.span`
  font-weight: ${({ isActive }) => (isActive ? "600" : "normal")};
  color: ${({ isActive, hasError }) =>
    hasError ? "red" : isActive ? "#3a5c7d" : "black"};
  text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
  text-decoration-color: #3a5c7d;
`;

const QuickLink = ({
  titles,
  activeCardIndex,
  activeSubIndex,
  onClick,
  errorMap = {},
}) => {
  return (
    <LinkContainer>
      <Heading>Quick Link</Heading>
      {titles.map((card, index) => {
        const cardError = errorMap[index];
        const hasError = cardError?.hasError;
        const subcardErrors = cardError?.subcardIndices || [];

        // ✅ Mark parent active if it or any of its subcards is active
        const isActive =
          activeCardIndex === index &&
          (activeSubIndex === null ||
            card.subcards?.includes(card.subcards[activeSubIndex]));

        return (
          <div key={index}>
            <LinkItem onClick={() => onClick(index)}>
              <Number isActive={isActive} hasError={hasError}>
                {index + 1}.
              </Number>
              <LinkText isActive={isActive} hasError={hasError}>
                {card.title}
              </LinkText>
            </LinkItem>

            {card.subcards?.map((sub, subIndex) => {
              const isSubActive =
                activeCardIndex === index && activeSubIndex === subIndex;
              const subHasError = subcardErrors.includes(subIndex);

              return (
                <SubLinkItem
                  key={subIndex}
                  onClick={() => onClick(index, subIndex)}
                >
                  <Number isActive={isSubActive} hasError={subHasError}>
                    {index + 1}.{subIndex + 1}
                  </Number>
                  <LinkText isActive={isSubActive} hasError={subHasError}>
                    {sub}
                  </LinkText>
                </SubLinkItem>
              );
            })}
          </div>
        );
      })}
    </LinkContainer>
  );
};

export default QuickLink;
