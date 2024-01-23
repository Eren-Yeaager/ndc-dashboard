const { Table, ScrollableWrapper } = VM.require(
  `/*__@replace:widgetPath__*/.Components.Table.styled`,
);

if (!Table || !ScrollableWrapper)
  return <Widget src="flashui.near/widget/Loading" />;

const { ndcDAOs, cells } = props;

return (
  <ScrollableWrapper>
    <Widget
      src={`/*__@replace:widgetPath__*/.Components.Table.Filters.index`}
      props={{ ndcDAOs }}
    />
    <Widget
      src={`/*__@replace:widgetPath__*/.Components.Table.Cells.index`}
      props={{ cells }}
    />
  </ScrollableWrapper>
);
