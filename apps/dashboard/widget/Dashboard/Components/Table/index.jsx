const { Row } = VM.require(
  `/*__@replace:widgetPath__*/.Components.Table.styled`,
);

if (!Row) return <Widget src="flashui.near/widget/Loading" />;

const { ndcDAOs } = props;

return (
  <Widget
    src={`/*__@replace:widgetPath__*/.Components.Table.Filters.index`}
    props={{ ndcDAOs }}
  />
);
