const Cell = styled.div`
  min-width: 270px;
  width: 100%;
  height: 36px;
  background: #e8ecf0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e1d22;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 350;
  line-height: 36px;
  position: relative;

  .dao-name {
    display: block;
    width: 90%;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    text-wrap: nowrap;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding-top: 1rem;
  -webkit-overflow-scrolling: touch;
`;

const calculateWidth = (actual, max) => {
  return `${(actual / max) * 100}%`;
};

const { datatable } = props;

return (
  <Container>
    {datatable.map((data, index) => (
      <div key={index} className="w-100 d-flex align-items-center gap-2">
        <Cell>
          <div className="dao-name">{data.daoId}</div>
        </Cell>
        <Cell>
          <div
            style={{
              background: data.userRetention.color,
              width: calculateWidth(
                data.userRetention.actual,
                data.userRetention.max,
              ),
            }}
            className="h-100 position-absolute start-0"
          ></div>
          <div className="position-relative">{data.userRetention.actual}</div>
        </Cell>
        <Cell>{data.DAPUsed}</Cell>
        <Cell>{data.aquisitionCost}</Cell>
      </div>
    ))}
  </Container>
);
