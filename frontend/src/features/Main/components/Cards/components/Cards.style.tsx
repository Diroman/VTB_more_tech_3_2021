import styled from "styled-components";

export const FlexDiv = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  
  > div {
    box-sizing: border-box;
    margin: 30px 30px 0 0;

  }
  > div:nth-child(3n) {
    margin-right: 0;

  }
  ::after {
    content: '';
    flex: auto;
  }
  
  > div:nth-child(-n+3) {
    margin-top: 0;
  }
  
`;
