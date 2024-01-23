const Cell = styled.div`
  min-width: 270px;
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

const { cells } = props;

return (
  <Container>
    {cells.map((cell, index) => (
      <div key={index} className="w-100 d-flex align-items-center gap-2">
        <Cell>{cell.name}</Cell>
        <Cell>
          <div
            style={{
              background: cell.userRetetntion.color,
              width: calculateWidth(
                cell.userRetetntion.actual,
                cell.userRetetntion.max,
              ),
            }}
            className="h-100 position-absolute start-0"
          ></div>
          <div className="position-relative">{cell.userRetetntion.actual}</div>
        </Cell>
        <Cell>{cell.DAPUsed}</Cell>
        <Cell>{cell.aquisitionCost}</Cell>
      </div>
    ))}
  </Container>
);
