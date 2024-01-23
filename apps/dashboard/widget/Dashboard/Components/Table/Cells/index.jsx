

const Cell = styled.div`
  width: 320px;
  height: 36px;
  background: #E8ECF0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1E1D22;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 350;
  line-height: 36px;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
`;

  const calculateWidth = (actual, max) => {
    return `${(actual / max) * 100}%`;
  }

  const { cells } = props;

  return (
    <Container>
      {cells.map((cell, index) => (
        <div key={index} className="d-flex align-items-center gap-2" style={{width: '100%'}}>
          <Cell>{cell.name}</Cell>
          <Cell>
            <div style={{background: '#68D895', width: calculateWidth(cell.userRetetntion.actual, cell.userRetetntion.max)}} className="h-100 position-absolute start-0"></div>
            <div className="position-relative">{cell.userRetetntion.actual}</div>
          </Cell>
          <Cell>{cell.DAPUsed}</Cell>
          <Cell>{cell.aquisitionCost}</Cell>
        </div>
      ))}
    </Container>
  );
