const { value, text, color } = props;
const { Circle } = VM.require(
  `/*__@replace:widgetPath__*/.Components.MetricsDisplay.styled`,
);

const formatValue = (val) =>
  val >= 1000000000
    ? `${parseFloat(val / 1000000000).toFixed(2)}B`
    : val >= 1000000
    ? `${parseFloat(val / 1000000).toFixed(2)}M`
    : val >= 1000
    ? `${parseFloat(val / 1000).toFixed(2)}K`
    : val;

return (
  <div className="item">
    <div className="inner">{formatValue(value)}</div>
    <div className="d-flex justify-content-center align-items-center gap-2">
      <Circle color={color} /> <span>{text}</span>
    </div>
  </div>
);