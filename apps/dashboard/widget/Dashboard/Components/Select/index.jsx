const { Select, Check } = VM.require(
  `/*__@replace:widgetPath__*/.Components.Select.styled`,
);

if (!Select || !Check) return <Widget src="flashui.near/widget/Loading" />;

const {
  values,
  multiple,
  options,
  onChange,
  defaultValue,
  isOpen,
  onClear,
  containerClass,
  text,
} = props;
const [open, setOpen] = useState(false);
const selectOptions = defaultValue ? [defaultValue, ...options] : options;

const setTitle = () => {
  if (text) return text;

  if (Array.isArray(values)) {
    return values.length ? `${values.length} Selected` : defaultValue;
  } else {
    return values;
  }
};

const handleOpen = () => setOpen(!open);

return (
  <Select onClick={() => !multiple && handleOpen()}>
    <div className={containerClass}>
      <div className="selected" onClick={handleOpen}>
        {setTitle()}
      </div>
      <div className="d-flex gap-2">
        {multiple && values.length > 0 && (
          <i
            className="bi bi-x fs-5 mt-1 mr-1"
            onClick={() => onClear() && setOpen(false)}
          />
        )}
        <i onClick={handleOpen} className="bi bi-chevron-down fs-5 mt-1" />
      </div>
    </div>
    {open && (
      <ul>
        {selectOptions.map((option) => (
          <li onClick={() => onChange(option)}>
            {multiple && (
              <Check selected={values.includes(option)}>
                {values.includes(option) && (
                  <i className="mt-1 bi bi-check-lg" />
                )}
              </Check>
            )}
            <div className="truncate">{option}</div>
          </li>
        ))}
      </ul>
    )}
  </Select>
);
