return {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 3rem 4.5rem;

    @media screen and (max-width: 768px) {
      padding: 3rem 2rem;
    }

    h3 {
      font-size: 2rem;
      font-weight: 400;
    }

    h4 {
      font-size: 1.5rem;
      font-weight: 300;
    }

    div[role="combobox"] {
      color: white !important;
      border: 0;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      text-transform: capitalize;
      letter-spacing: 0.12px;
      border-radius: 10px;
      background: #a39acd;

      span {
        color: white;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden;
        text-wrap: nowrap;
      }
    }

    .select-dao {
      width: 50%;
      @media screen and (max-width: 768px) {
        width: 75%;
        min-width: 150px;
      }
    }
    .select-period {
      width: 150px;
    }
  `,
};
