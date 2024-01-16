return {
  Theme: styled.div`
    position: fixed;
    inset: 107px 0px 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
    font-weight: 600;
    font-family: "Avenir LT Pro", sans-serif;
    font-style: normal;
    background: #e8ecf0 !important;
    ${(props) => props.font};
  `,
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

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
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 90%;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  `,
};
