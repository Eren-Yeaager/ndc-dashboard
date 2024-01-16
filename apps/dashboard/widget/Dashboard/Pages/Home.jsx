const { ndcAccounts } = VM.require(`/*__@replace:widgetPath__*/.Config`);
const { API } = VM.require(`/*__@replace:widgetPath__*/.Api.pikespeak`);

const { home } = VM.require(`/*__@replace:widgetPath__*/.Pages.styled`);
const Container = styled.div`${home}`;

const PERIODS = ["daily", "weekly", "monthly"];

const [loading, setLoading] = useState(false);
const [totalTx, setTotalTx] = useState(0);
const [totalAccounts, setTotalAccounts] = useState(0);
const [uniqueAccounts, setUniqueAccounts] = useState(0);
const [period, setPeriod] = useState(PERIODS[0]);

const fetchData = () => {
  setLoading(true);

  ndcAccounts.map((accountId) => {
    API.get_total_tx(accountId).then((resp) => {
      setTotalTx(totalTx + resp.body);
    });
    API.get_accounts(accountId).then((resp) => {
      setTotalAccounts(resp.body.length);
    });
    API.get_unique_accounts_by_period(accountId).then((resp) => {
      setUniqueAccounts(resp.body[period].count);
    });
  });
  setLoading(false);
};

useEffect(() => fetchData(), []);

return (
  <Container>
    <div className="section"></div>
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
    <Widget src={`/*__@replace:widgetPath__*/.Components.MetricsDisplay.index`} props={{
      totalTx,
      totalAccounts,
      uniqueAccounts,
      loading
    }}/>
    </div>
    <div className="d-flex w-100 flex-wrap gap-2">
      <div className="section w-100">Graph1</div>
      <div className="section w-100">Graph2</div>
    </div>
    <div className="section">Table</div>
  </Container>
);
