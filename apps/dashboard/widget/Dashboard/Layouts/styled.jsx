return {
  Wrapper: styled.div`
    flex: 1,
    display: flex,
    "flex-direction": column,
    "align-items": center,
    width: "100%",
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;

    .section {
      border-radius: 20px;
      display: flex;
      padding: 1rem 2rem;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      background: #f9fcff;
      box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.05);
    }
  `,
  Theme: styled.div`
    font-weight: 600;
    font-family: "Avenir LT Pro", sans-serif;
    font-style: normal;
    background: #e8ecf0 !important;
    ${(props) => props.font};
  `,
};
