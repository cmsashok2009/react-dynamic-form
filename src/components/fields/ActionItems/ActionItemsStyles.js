import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center; /* Align items vertically */
  padding: 10px; /* Adjust as needed */
  position: sticky; /* Makes the action items sticky */
  top: 85px; /* Adjust based on header height */
  background-color: white; /* Ensure it has a background */
  z-index: 999; /* Stays below the header */
  border-bottom: 1px solid #ccc;
  margin-top: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Space between buttons */
`;

export const RightButtonGroup = styled(ButtonGroup)`
  margin-left: auto; /* Push this group to the right */
`;

export const HorizontalLine = styled.hr`
  border: 1px solid #ccc; /* Light grey color */
  margin-top: 10px; /* Space above the line */
`;
