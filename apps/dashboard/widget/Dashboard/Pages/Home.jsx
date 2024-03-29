const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem 4.5rem;

  @media screen and (max-width: 768px) {
    padding: 3rem 2rem;
  }

  h3 {
    font-size: 2rem;
    font-weight: 400;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 300;
  }

  .select-dao {
    width: 50%;
    @media screen and (max-width: 768px) {
      width: 100%;
      min-width: 150px;
    }
  }
  .select-period {
    width: 150px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;

const ChartContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  @media screen and (max-width: 1188px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }
`;

const { ndcDAOs } = VM.require(`/*__@replace:widgetPath__*/.Config`);

if (!ndcDAOs) return <Widget src="flashui.near/widget/Loading" />;

const PERIODS = ["daily", "weekly", "monthly"];
const defaultDAOOption = "All DAOs";
const dailyTotal = { labels: [], data: [] };
const dailyTotalUsers = { labels: [], data: [] };

const [loading, setLoading] = useState(false);
const [period, setPeriod] = useState(PERIODS[0]);
const [selectedDAOs, setSelectedDAOs] = useState([]);
const [dataState, setDataState] = useState({
  totalTx: 0,
  totalAccounts: 0,
  uniqueAccounts: 0,
  dailyTotalTx: [],
  uniqueActiveUsers: [],
});

const baseUrl = "https://api.pikespeak.ai";

const get = async (url) => {
  try {
    return asyncFetch(`${baseUrl}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "/*__@replace:apiKey__*/",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const API = {
  get_accounts: (accountId) =>
    get(`event-historic/account/relationships/${accountId}?search=${accountId}
  `),
  get_unique_accounts_by_period: (accountId) =>
    get(`contract-analysis/unique-users-by-period/${accountId}`),
  get_activity_by_period: (accountId) =>
    get(`contract-analysis/metrics/${accountId}`),
  get_retentions: (accountId) =>
    get(`contract-analysis/retention/${accountId}`),
  get_dapps_spends: (accountId) =>
    get(`/contract-analysis/crossdapp-near-spending/${accountId}`),
  get_aquisition_cost: (accountId) =>
    get(`/contract-analysis/metrics/${accountId}`),
  get_contract_relations: (accountId) =>
    get(
      `/event-historic/account/relationships/${accountId}?search=${accountId}`,
    ),
  get_balance: (accountId) => get(`/account/balance/${accountId}`),
  get_dapps: () => get(`/contract-analysis/classification?isDapp=true`),
  // get_dapps_categories: () => get(`/contract-analysis/classification-categories`),
};

const fetchData = () => {
  setLoading(true);
  let newState = {
    totalTx: 0,
    totalAccounts: 0,
    uniqueAccounts: 0,
    dailyTotalTx: [],
    uniqueActiveUsers: [],
  };

  const daos = selectedDAOs.length ? selectedDAOs : ndcDAOs;

  const promises = daos.flatMap((accountId) => [
    API.get_accounts(accountId).then((resp) => {
      if (!resp.body) return;

      newState.totalAccounts += resp.body.length;
    }),
    API.get_unique_accounts_by_period(accountId).then((resp) => {
      if (!resp.body) return;

      newState.uniqueAccounts += parseInt(resp.body[period].data.length);
      newState.uniqueActiveUsers.push(...resp.body[period].data);
      newState.totalTx += resp.body[period].data.reduce(
        (memo, current) => memo + parseInt(current.tx_count),
        0,
      );
      newState.dailyTotalTx.push(
        ...resp.body[period].data.map((item) => ({
          date: item.day,
          count: parseInt(item.tx_count),
        })),
      );
    }),
  ]);

  Promise.all(promises).then(() => {
    setDataState(newState);
    setLoading(false);
  });
};

useEffect(() => {
  fetchData();
}, [selectedDAOs, period]);

dataState.dailyTotalTx
  .sort((a, b) => new Date(a.date) - new Date(b.date))
  .forEach((element) => {
    dailyTotal.labels.push(element.date);
    dailyTotal.data.push(element.count);
  });

dataState.uniqueActiveUsers
  .sort((a, b) => new Date(a.day) - new Date(b.day))
  .forEach((element) => {
    dailyTotalUsers.labels.push(element.day);
    dailyTotalUsers.data.push(element.unique_users);
  });

const onSelectChange = (value) => {
  const isDefaultOption = value === defaultDAOOption;

  const updateSelectedDAOs = () => {
    if (isDefaultOption) {
      const all = [...ndcDAOs, defaultDAOOption];
      if (selectedDAOs.length === all.length) {
        return [];
      }
      return all;
    } else if (selectedDAOs.includes(value)) {
      return selectedDAOs.filter(
        (dao) => dao !== value && dao !== defaultDAOOption,
      );
    } else {
      return [...selectedDAOs, value];
    }
  };

  setSelectedDAOs(updateSelectedDAOs());
};

const SelectContainer = styled.div`
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

return (
  <Container>
    <div className="section">
      <SelectContainer className="d-flex w-100 gap-3 justify-content-between">
        <div className="select-dao">
          <Widget
            src={`/*__@replace:widgetPath__*/.Components.Select`}
            props={{
              options: ndcDAOs,
              defaultValue: defaultDAOOption,
              multiple: true,
              values: selectedDAOs,
              containerClass: "selected-container",
              onClear: () => setSelectedDAOs([]),
              onChange: onSelectChange,
            }}
          />
        </div>
        <div className="select-period">
          <Widget
            src={`/*__@replace:widgetPath__*/.Components.Select`}
            props={{
              options: PERIODS.map((v) => capitalizeFirstLetter(v)),
              isOpen: selectOpen,
              values: period,
              onChange: (v) => setPeriod(v.toLowerCase()),
              containerClass: "selected-container",
            }}
          />
        </div>
      </SelectContainer>
    </div>
    <Widget
      src={`/*__@replace:widgetPath__*/.Components.Aggregators`}
      props={{
        totalTx: dataState.totalTx,
        totalAccounts: dataState.totalAccounts,
        uniqueAccounts: dataState.uniqueAccounts,
        loading,
      }}
    />
    <ChartContainer>
      <Widget
        src={`/*__@replace:widgetPath__*/.Components.Chart`}
        props={{
          title: "DAILY NUMBER OF TRANSACTIONS",
          data: dailyTotal,
          loading,
        }}
      />
      <Widget
        src={`/*__@replace:widgetPath__*/.Components.Chart`}
        props={{
          title: "UNIQUE ACTIVE USERS",
          data: dailyTotalUsers,
          loading,
        }}
      />
    </ChartContainer>
    <div className="section py-5 flex-column">
      <Widget
        src={`/*__@replace:widgetPath__*/.Components.Table`}
        props={{ ndcDAOs, API }}
      />
    </div>
  </Container>
);
