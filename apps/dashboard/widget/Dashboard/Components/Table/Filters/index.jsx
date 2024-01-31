const { SubFilterItem } = VM.require(
  `/*__@replace:widgetPath__*/.Components.Table.Filters.styled`,
);

if (!SubFilterItem) return <Widget src="flashui.near/widget/Loading" />;

const {
  text,
  options,
  multiple,
  onChange,
  onClear,
  values,
  hintText,
  defaultValue,
  onFilterClick,
  id,
  filterIsOpen
} = props;

return (
  <div className="d-flex flex-column gap-1 w-100">
    <Widget
      src={`/*__@replace:widgetPath__*/.Components.Select.index`}
      props={{
        containerClass: "selected-container black",
        text,
        options,
        multiple,
        onClear,
        values,
        onChange,
        onFilterClick,
        id,
        filterIsOpen,
        isTooltipVisible: true
      }}
    />

    <SubFilterItem>
      <div>
        {values.length > 1
          ? `${values.length} Selected`
          : defaultValue ?? values[0]}
      </div>
    </SubFilterItem>
  </div>
);
