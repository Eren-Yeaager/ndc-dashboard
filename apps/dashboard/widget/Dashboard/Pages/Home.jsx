const { ndcDAOs } = VM.require(`/*__@replace:widgetPath__*/.Config`);
const { API } = VM.require(`/*__@replace:widgetPath__*/.Api.pikespeak`);
const { Container } = VM.require(`/*__@replace:widgetPath__*/.Pages.styled`);

const PERIODS = ["daily", "weekly", "monthly"];
const allDAOs = ["All DAOs", ...ndcDAOs];

const [loading, setLoading] = useState(false);
const [totalTx, setTotalTx] = useState(0);
const [totalAccounts, setTotalAccounts] = useState(0);
const [uniqueAccounts, setUniqueAccounts] = useState(0);
const [period, setPeriod] = useState(PERIODS[0]);
const [selectedDAOs, setSelectedDAOs] = useState(ndcDAOs);
console.log(period);

const fetchData = () => {
  setLoading(true);
  let _totalTx = 0;
  let _totalAccounts = 0;
  let _uniqueAccounts = 0;

  selectedDAOs.map((accountId) => {
    API.get_total_tx(accountId).then((resp) => {
      _totalTx += parseInt(resp.body);
      setTotalTx(_totalTx);
    });
    API.get_accounts(accountId).then((resp) => {
      _totalAccounts += resp.body.length;
      setTotalAccounts(_totalAccounts);
    });
    API.get_unique_accounts_by_period(accountId).then((resp) => {
      _uniqueAccounts += parseInt(resp.body[period].count);
      setUniqueAccounts(_uniqueAccounts);
    });
  });
  setLoading(false);
};

useEffect(() => fetchData(), [selectedDAOs, period]);

return (
  <Container>
    <div className="section">
      <div className="d-flex w-100 gap-5 justify-content-between">
        <Widget
          src={`near/widget/Select`}
          props={{
            noLabel: true,
            placeholder: "Select a DAO",
            options: allDAOs.map((name) => {
              return { text: name, value: name };
            }),
            onChange: ({ value }) =>
              setSelectedDAOs(value === allDAOs[0] ? ndcDAOs : [value]),
          }}
        />
        <Widget
          src={`near/widget/Select`}
          props={{
            noLabel: true,
            value: { text: period, value: period },
            placeholder: "Select a period",
            options: PERIODS.map((name) => {
              return { text: name, value: name };
            }),
            onChange: ({ value }) => setPeriod(value),
          }}
        />
      </div>
    </div>
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
      <Widget
        src={`/*__@replace:widgetPath__*/.Components.MetricsDisplay.index`}
        props={{
          totalTx,
          totalAccounts,
          uniqueAccounts,
          loading,
        }}
      />
    </div>
    <div className="d-flex flex-wrap justify-content-between gap-2">
      <div className="section">Graph1</div>
      <div className="section">Graph2</div>
    </div>
    <div className="section">Table</div>
  </Container>
);
