const { Row } = VM.require(
  `/*__@replace:widgetPath__*/.Components.Table.styled`,
);

const { ndcDAOs } = props;

return (
  <Widget
    src={`/*__@replace:widgetPath__*/.Components.Table.Filters.index`}
    props={{ ndcDAOs }}
  />
);
