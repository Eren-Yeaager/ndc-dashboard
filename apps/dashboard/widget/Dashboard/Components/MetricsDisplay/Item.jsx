const { circle } = VM.require(`/*__@replace:widgetPath__*/.Components.MetricsDisplay.styled`);
const Circle = styled.div`${circle}`

const { value, text, color } = props;

return (
  <div className="item">
    <div className="inner">{value}</div>
    <div className="d-flex justify-content-center align-items-center gap-2">
      <Circle color={color} /> <span>{text}</span>
    </div>
  </div>
)