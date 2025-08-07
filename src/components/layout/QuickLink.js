import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  background-color: white;
  z-index: 999;
  padding: 10px;
`;
const Heading = styled.h4`
  font-weight: 600;
  color: #3a5c7d;
  margin-bottom: 16px;
  text-align: left;
  font-size: 16px;
`;

const LinkItemButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: none;
  padding: 8px 10px;
  text-align: left;
  width: 100%;
  border-radius: 6px;

  &:hover {
    background-color: #f0f4f8;
  }
`;

const SubLinkItemButton = styled(LinkItemButton)`
  padding-left: 30px;
  font-size: 0.95rem;
`;

const Number = styled.span`
  flex-shrink: 0;
  color: ${({ isActive, hasError }) => (hasError ? 'red' : isActive ? '#3a5c7d' : '#4b79a1')};
  font-weight: ${({ isActive }) => (isActive ? '700' : 'normal')};
  user-select: none;
  font-size: 14px;
`;

const LinkText = styled.span`
  font-weight: ${({ isActive }) => (isActive ? '700' : 'normal')};
  color: ${({ isActive, hasError }) => (hasError ? 'red' : isActive ? '#3a5c7d' : '#111827')};
  font-size: 14px;
  line-height: 20px;
`;

const QuickLink = ({ titles, activeCardIndex, activeSubIndex, onClick, errorMap }) => {
  return (
    <LinkContainer>
      <Heading>Quick Link</Heading>
      {titles.map((card, index) => {
        const cardError = errorMap[index];
        const hasError = cardError?.hasError;
        const subcardErrors = cardError?.subcardIndices || [];
        const isActive = activeCardIndex === index;

        return (
          <div key={index}>
            <LinkItemButton
              type="button"
              onClick={() => onClick(index, null)}
              aria-label={`Go to ${card.title}`}
              data-testid={`quicklink-card-${index}`}
            >
              <Number isActive={isActive} hasError={hasError}>
                {index + 1}.
              </Number>
              <LinkText isActive={isActive} hasError={hasError}>
                {card.title}
              </LinkText>
            </LinkItemButton>

            {card.subcards?.map((sub, subIndex) => {
              const isSubActive = activeCardIndex === index && activeSubIndex === subIndex;
              const subHasError = subcardErrors.includes(subIndex);

              return (
                <SubLinkItemButton
                  key={subIndex}
                  type="button"
                  onClick={() => onClick(index, subIndex)}
                  aria-label={`Go to ${card.title} - ${sub}`}
                  data-testid={`quicklink-subcard-${index}-${subIndex}`}
                >
                  <Number isActive={isSubActive} hasError={subHasError}>
                    {index + 1}.{subIndex + 1}
                  </Number>
                  <LinkText isActive={isSubActive} hasError={subHasError}>
                    {sub}
                  </LinkText>
                </SubLinkItemButton>
              );
            })}
          </div>
        );
      })}
    </LinkContainer>
  );
};

QuickLink.propTypes = {
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subcards: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  activeCardIndex: PropTypes.number.isRequired,
  activeSubIndex: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  errorMap: PropTypes.object,
};

QuickLink.defaultProps = {
  activeSubIndex: null,
  errorMap: {},
};

export default QuickLink;
