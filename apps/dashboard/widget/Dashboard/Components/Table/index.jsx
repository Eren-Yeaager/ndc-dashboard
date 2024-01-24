const { ScrollableWrapper } = VM.require(
  `/*__@replace:widgetPath__*/.Components.Table.styled`,
);

const { ndcDAOs, API } = props;
const Loading = () => <Widget src="flashui.near/widget/Loading" />;

if (!ScrollableWrapper) return <Loading />;

const defaultDAOOption = "All DAOs";
const CURRENCIES = ["NEAR"];
const RETENTIONS = ["1 month", "2 months", "3 months", "4 months"];
const DAPPS_USED_PERIOD = ["All Time"];

const [dataSet, setDataState] = useState({});
const [loading, setLoading] = useState(false);

const [selectedDAOs, setSelectedDAOs] = useState([]);
const [selectedRetention, setSelectedRetention] = useState(0);
const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

const FILTERS = [
  {
    text: "DAO",
    hintText: "NDC grassroots DAOs",
    options: [defaultDAOOption, ...ndcDAOs],
    values: selectedDAOs,
    defaultValue: defaultDAOOption,
    multiple: true,
    onChange: (value) => filterDAO(value),
    onClear: () => {
      setSelectedDAOs([]);
    },
  },
  {
    text: "User Retention",
    hintText: "Text TBD",
    options: RETENTIONS,
    values: [RETENTIONS[selectedRetention]],
    onChange: (value) => setSelectedRetention(RETENTIONS.indexOf(value)),
  },
  {
    text: "DAP's Used",
    hintText: "Text TBD",
    options: DAPPS_USED_PERIOD,
    values: [DAPPS_USED_PERIOD[0]],
    onChange: (value) => {},
  },
  {
    text: "Aquisition Cost",
    hintText: "Text TBD",
    options: CURRENCIES,
    values: [CURRENCIES[0]],
    onChange: (value) => setSelectedCurrency(value),
  },
];

const sortByDAOName = (keys) =>
  Object.keys(keys)
    .sort()
    .reduce((obj, key) => {
      obj[key] = keys[key];
      return obj;
    }, {});

const filterDAO = (value) => {
  setSelectedDAOs(
    value === defaultDAOOption
      ? []
      : selectedDAOs.includes(value)
      ? selectedDAOs.filter(
          (daoId) => daoId !== value && daoId !== defaultDAOOption,
        )
      : [...selectedDAOs, value],
  );
};

const fetchData = () => {
  setLoading(true);
  const filtredDAOs = selectedDAOs.length ? selectedDAOs : ndcDAOs;
  let newState = {};

  const promises = filtredDAOs.flatMap((daoId) => {
    newState[daoId] = {};

    return [
      API.get_retentions(daoId).then((resp) => {
        const data = resp.body;

        if (data) {
          const retentionIndex =
            selectedRetention > data.length - 1
              ? data.length - 1
              : selectedRetention;
          newState[daoId].retention = {
            start: parseInt(data[retentionIndex].unique_users_start),
            end: parseInt(data[retentionIndex].unique_users_end),
          };
        }
      }),
      API.get_dapps_spends(daoId).then((resp) => {
        const data = resp.body;
        if (data) newState[daoId].DAPUsed = data.length;
      }),
      API.get_aquisition_cost(daoId).then((resp) => {
        const data = resp.body;
        if (data) {
          const incomes = data
            .map((metric) =>
              parseFloat(metric.amounts_in[selectedCurrency] ?? 0),
            )
            .reduce((a, b) => a + b, 0);

          const outcomes = data
            .map((metric) =>
              parseFloat(metric.amounts_out[selectedCurrency] ?? 0),
            )
            .reduce((a, b) => a + b, 0);

          newState[daoId].aquisitionCost = {
            incomes: parseFloat(incomes.toFixed(1)),
            outcomes: parseFloat(outcomes.toFixed(1)),
          };
        }
      }),
    ];
  });

  Promise.all(promises).then(() => {
    const orderedByDAOState = sortByDAOName(newState);
    setDataState(orderedByDAOState);
    setLoading(false);
  });
};

useEffect(() => {
  fetchData();
}, [selectedDAOs, selectedRetention]);

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
    {loading ? (
      <Loading />
    ) : (
      <Widget
        src={`/*__@replace:widgetPath__*/.Components.Table.Cells.index`}
        props={{ dataSet }}
      />
    )}
  </ScrollableWrapper>
);
