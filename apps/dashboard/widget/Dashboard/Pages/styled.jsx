return {
  home: `position: relative;
  width: 100%;
  height: max-content;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    font-size: 2rem;
    font-weight: 400;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 300;
  }

  .item {
    color: #fcf8ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 200px;
    gap: 1rem;
    border-radius: 30px;
    background: #1e1d22;
    box-shadow: 0px 30px 40px 0px rgba(0, 0, 0, 0.3);
    font-size: 20px;
    font-weight: 750;
    text-align: center;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    .inner {
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      padding: 10px 20px;
      font-size: 60px;
    }
  }`
}