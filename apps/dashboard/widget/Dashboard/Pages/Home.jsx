const { ndcDAOs } = VM.require(`/*__@replace:widgetPath__*/.Config`);
const { API } = VM.require(`/*__@replace:widgetPath__*/.Api.pikespeak`);
const { Container } = VM.require(`/*__@replace:widgetPath__*/.Pages.styled`);

const PERIODS = ["daily", "weekly", "monthly"];
const defaultDAOOption = "All DAOs";

const [loading, setLoading] = useState(false);
const [totalTx, setTotalTx] = useState(0);
const [totalAccounts, setTotalAccounts] = useState(0);
const [uniqueAccounts, setUniqueAccounts] = useState(0);
const [period, setPeriod] = useState(PERIODS[0]);
const [selectedDAOs, setSelectedDAOs] = useState([]);

const fetchData = () => {
  setLoading(true);
  let _totalTx = 0;
  let _totalAccounts = 0;
  let _uniqueAccounts = 0;
  const daos = selectedDAOs.length ? selectedDAOs : ndcDAOs;

  daos.map((accountId) => {
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
      <div className="d-flex w-100 gap-3 justify-content-between">
        <div className="select-dao">
          <Widget
            src={`/*__@replace:widgetPath__*/.Components.Select.index`}
            props={{
              options: ndcDAOs,
              defaultValue: defaultDAOOption,
              isOpen: selectOpen,
              multiple: true,
              values: selectedDAOs,
              onClear: () => setSelectedDAOs([]),
              onChange: (value) => {
                setSelectedDAOs(
                  value === defaultDAOOption
                    ? []
                    : selectedDAOs.includes(value)
                    ? selectedDAOs.filter(
                        (dao) => dao !== value && dao !== defaultDAOOption,
                      )
                    : [...selectedDAOs, value],
                );
              },
            }}
          />
        </div>
        <div className="select-period">
          <Widget
            src={`/*__@replace:widgetPath__*/.Components.Select.index`}
            props={{
              options: PERIODS,
              isOpen: selectOpen,
              values: period,
              onChange: setPeriod,
            }}
          />
        </div>
      </div>
    </div>
    <Widget
      src={`/*__@replace:widgetPath__*/.Components.MetricsDisplay.index`}
      props={{
        totalTx,
        totalAccounts,
        uniqueAccounts,
        loading,
      }}
    />
    <div className="d-flex flex-wrap justify-content-between gap-2">
      <div className="section">Graph1</div>
      <div className="section">Graph2</div>
    </div>
    <div className="section">Table</div>
  </Container>
);
