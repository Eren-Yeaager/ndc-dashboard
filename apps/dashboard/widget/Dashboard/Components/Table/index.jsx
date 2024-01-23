const { Table, ScrollableWrapper } = VM.require(
  `/*__@replace:widgetPath__*/.Components.Table.styled`,
);

const { ndcDAOs } = props;

if (!Table || !ScrollableWrapper)
  return <Widget src="flashui.near/widget/Loading" />;

const PERIODS = ["daily", "weekly", "monthly"];
const defaultDAOOption = "All DAOs";
const CURRENCIES = ["near", "stable"];

const [datatable, setDatatable] = useState([]);
const [selectedDAOs, setSelectedDAOs] = useState([]);
const FILTERS = [
  {
    text: "DAO",
    hintText: "NDC grassroots DAOs",
    options: [defaultDAOOption, ...ndcDAOs],
    values: selectedDAOs,
    multiple: true,
    onChange: (value) => filterDAO(value),
    onClear: () => {
      setSelectedDAOs([]);
    },
  },
  {
    text: "User Retention",
    hintText: "Text TBD",
    options: PERIODS,
    values: [PERIODS[0]],
    onChange: (value) => filterDAO(value),
  },
  {
    text: "DAP's Used",
    hintText: "Text TBD",
    options: PERIODS,
    values: [PERIODS[0]],
    onChange: (value) => filterDAO(value),
  },
  {
    text: "Aquisition Cost",
    hintText: "Text TBD",
    options: CURRENCIES,
    values: [CURRENCIES[0]],
    onChange: (value) => filterDAO(value),
  },
];

const filterDAO = (value) => {
  setSelectedDAOs(
    value === defaultDAOOption
      ? []
      : selectedDAOs.includes(value)
      ? selectedDAOs.filter((dao) => dao !== value && dao !== defaultDAOOption)
      : [...selectedDAOs, value],
  );
};

const fetchData = () => {
  const daos = selectedDAOs?.length ? selectedDAOs : ndcDAOs;
  const dataset = daos.map((daoId) => {
    return {
      daoId,
      userRetention: { actual: 312, max: 1000, color: "#68D895" },
      DAPUsed: 4,
      aquisitionCost: 7,
    };
  });
  setDatatable(dataset);
};

useEffect(() => {
  fetchData();
}, [selectedDAOs]);

return (
  <ScrollableWrapper>
    <div className="d-flex gap-2 w-100">
      {FILTERS.map((filter) => (
        <Widget
          src={`/*__@replace:widgetPath__*/.Components.Table.Filters.index`}
          props={{ ...filter }}
        />
      ))}
    </div>
    <Widget
      src={`/*__@replace:widgetPath__*/.Components.Table.Cells.index`}
      props={{ datatable }}
    />
  </ScrollableWrapper>
);
