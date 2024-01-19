const { value, text, color } = props;
const { Circle } = VM.require(
  `/*__@replace:widgetPath__*/.Components.MetricsDisplay.styled`,
);
const { formatValue }  = VM.require(
  `/*__@replace:widgetPath__*/.utils`,
);

return (
  <div className="item">
    <div className="inner">{formatValue(value)}</div>
    <div className="d-flex justify-content-center align-items-center gap-2">
      <Circle color={color} /> <span>{text}</span>
    </div>
  </div>
);
