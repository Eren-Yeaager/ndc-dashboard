const { ndcDAOs } = VM.require(`/*__@replace:widgetPath__*/.Config`);
const { Container, ChartContainer } = VM.require(
  `/*__@replace:widgetPath__*/.Pages.styled`,
);

if (!ndcDAOs || !Container || !ChartContainer)
  return <Widget src="flashui.near/widget/Loading" />;

const PERIODS = ["daily", "weekly", "monthly"];
const defaultDAOOption = "All DAOs";

const dailyTotal = {
  labels: [],
  data: [],
};

const dailyTotalUsers = {
  labels: [],
  data: [],
};

const [loading, setLoading] = useState(false);
const [totalTx, setTotalTx] = useState(0);
const [totalAccounts, setTotalAccounts] = useState(0);
const [uniqueAccounts, setUniqueAccounts] = useState(0);
const [period, setPeriod] = useState(PERIODS[0]);
const [selectedDAOs, setSelectedDAOs] = useState([]);
const [dailyTotalTx, setdailyTotalTx] = useState([]);
const [uniqueActiveUsers, setUniqueActiveUsers] = useState([]);

const baseUrl = "https://api.pikespeak.ai";

const get = async (url) =>
  asyncFetch(`${baseUrl}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "/*__@replace:apiKey__*/",
    },
  });

const API = {
  get_total_tx: (accountId) => get(`account/tx-count/${accountId}`),
  get_daily_total_tx: (accountId) => get(`account/daily-tx-count/${accountId}`),
  get_accounts: (accountId) =>
    get(`event-historic/account/relationships/${accountId}?search=${accountId}
  `),
  get_unique_accounts_by_period: (accountId) =>
    get(`contract-analysis/unique-users-by-period/${accountId}`),
  get_activity_by_period: (accountId) =>
    get(`contract-analysis/metrics/${accountId}`),
  get_retentions: (accountId) =>
    get(`contract-analysis/retention/${accountId}`),
};

const fetchData = () => {
  setLoading(true);
  let _totalTx = 0;
  let _totalAccounts = 0;
  let _uniqueAccounts = 0;
  let _uniqueActiveUsers = [];
  let _dailyTotalTx = [];
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
      _uniqueAccounts += parseInt(resp.body[period].data.length);
      _uniqueActiveUsers.push(...resp.body[period].data);
      setUniqueAccounts(_uniqueAccounts);
      setUniqueActiveUsers(_uniqueActiveUsers);
    });
    API.get_daily_total_tx(accountId).then((res) => {
      _dailyTotalTx.push(...res.body);
      setdailyTotalTx(_dailyTotalTx);
    });
  });

  setLoading(false);
};

useEffect(() => fetchData(), [selectedDAOs, period]);

dailyTotalTx
  .sort((a, b) => new Date(a.date) - new Date(b.date))
  .forEach((element) => {
    dailyTotal.labels.push(element.date);
    dailyTotal.data.push(element.count);
  });

uniqueActiveUsers
  .sort((a, b) => new Date(a.day) - new Date(b.day))
  .forEach((element) => {
    dailyTotalUsers.labels.push(element.day);
    dailyTotalUsers.data.push(element.unique_users);
  });

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
              containerClass: "selected-container",
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
              containerClass: "selected-container",
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
    <ChartContainer>
      <Widget
        src={`/*__@replace:widgetPath__*/.Components.Chart.index`}
        props={{ title: "DAILY NUMBER OF TRANSACTIONS", data: dailyTotal }}
      />
      <Widget
        src={`/*__@replace:widgetPath__*/.Components.Chart.index`}
        props={{ title: "UNIQUE ACTIVE USERS", data: dailyTotalUsers }}
      />
    </ChartContainer>
    <div style={{flexDirection: 'column'}} className="section py-5">
      <Widget
        src={`/*__@replace:widgetPath__*/.Components.Table.index`}
        props={{ ndcDAOs, 
          cells: [
          { name: 'Degen DAO', userRetetntion: { actual: 712, max: 1000 }, DAPUsed:  4, aquisitionCost: 7 },
          { name: 'NFT DAO', userRetetntion: { actual: 612, max: 1000 }, DAPUsed:  4, aquisitionCost: 7 },
          { name: 'Global DAO', userRetetntion: { actual: 612, max: 1000 }, DAPUsed:  4, aquisitionCost: 7 },
          { name: 'Onboard DAO', userRetetntion: { actual: 512, max: 1000 }, DAPUsed:  4, aquisitionCost: 7 },
          { name: 'Aurora Community DAO', userRetetntion: { actual: 512, max: 1000 }, DAPUsed:  4, aquisitionCost: 7 },
          { name: 'Marketing DAO', userRetetntion: { actual: 412, max: 1000 }, DAPUsed:  4, aquisitionCost: 7 },
          { name: 'Degen DAO', userRetetntion: { actual: 412, max: 1000 }, DAPUsed:  4, aquisitionCost: 7 },
          { name: 'Degen DAO', userRetetntion: { actual: 312, max: 1000 }, DAPUsed:  4, aquisitionCost: 7 }]}}
      />
    </div>
  </Container>
);
