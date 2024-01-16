const Loading = () => <Widget src="flashui.near/widget/Loading" />;

const Item = ({ value, text, color }) => {
   return <Widget src={`/*__@replace:widgetPath__*/.Components.MetricsDisplay.Item`} props={{ value, text, color }}/>
}

const { totalTx, totalAccounts,  uniqueAccounts, loading } = props;

return (
  <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
    <Item value= { loading ? <Loading /> : totalTx }  text= "Total Number of Transactions" color= "#A39ACD" />
    <Item value= { loading ? <Loading /> :  totalAccounts }  text= "Total Number of Accounts" color= "#5398DD" />
    <Item value= { loading ? <Loading /> :  uniqueAccounts } text= "Today Unique Active Users" color= "#E89DBB" />
  </div>
)