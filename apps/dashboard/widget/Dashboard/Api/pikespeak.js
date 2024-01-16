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

return { API };
