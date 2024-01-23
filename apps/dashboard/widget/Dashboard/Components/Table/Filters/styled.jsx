return {
  FilterItem: styled.div`
    border-radius: 10px;
    background: #1e1d22;
    padding: 5px 10px;
    color: #fff;
    text-align: center;
    font-weight: 350;
    width: 100%;
    min-width: 270px;
  `,

  SubFilterItem: styled.div`
    border-radius: 10px;
    background: #a39acd;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 350;
    width: 100%;
    height: 50px;

    div {
      text-align: center;
      text-overflow: ellipsis;
      text-wrap: nowrap;
      overflow: hidden;
      width: 200px;
    }

    @media screen and (max-width: 868px) {
      width: 100%;
    }
  `,
};
