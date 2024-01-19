const { Container } = VM.require(`/*__@replace:widgetPath__*/.Components.Chart.styled`);
const code = `
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="myChart" width="684" height="401"></canvas>

<script>
var ctx = document.getElementById('myChart').getContext('2d');

var gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0.7, '#A39ACD');
gradient.addColorStop(0, '#5398DD');

var formatNumber = (num)  => {
    if (num >= 1e9) { // For billions
        return (num % 1e9 === 0 ? (num / 1e9).toFixed(0) : (num / 1e9).toFixed(1)) + 'b';
    }
    if (num >= 1e6) { // For millions
        return (num % 1e6 === 0 ? (num / 1e6).toFixed(0) : (num / 1e6).toFixed(1)) + 'm';
    }
    if (num >= 1e3) { // For thousands
        return (num % 1e3 === 0 ? (num / 1e3).toFixed(0) : (num / 1e3).toFixed(1)) + 'k';
    }
    return num.toString(); // For numbers less than 1000
}

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["25.11.22", "13.11.22", "08.02.23", "22.08.21", "08.05.23", "13.07.21", "03.08.22", "21.07.23", "16.08.23", "07.11.21", "29.10.21", "13.10.21", "08.12.23", "04.04.22", "09.10.23", "23.03.21", "27.06.21", "04.09.21", "30.09.21", "13.11.20", "01.09.21", "11.07.22", "14.02.22", "02.03.23", "04.07.22", "16.06.21", "27.12.23", "21.06.21", "30.08.23", "11.07.20", "15.10.22", "16.09.20", "24.12.22", "29.08.23", "01.07.21"],
      datasets: [{
            data: [1211119,1,111111,1,1111111,1,11111,1,111111,1, 100, 566326, 559954, 110986, 83219, 650626, 190115, 351993, 633141, 565283, 930150, 668779, 935471, 50347, 738905, 131560, 304360, 628232, 197961, 259503, 830430, 679111, 908358, 806885, 780980, 420784, 940383, 323134, 393515, 893953, 553036, 805179, 479803, 491130, 88106, 100, 1100,  100, 100],
            backgroundColor: gradient,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            grid: {
                display: false
              }
            },
            y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value, index, values) {
                    return formatNumber(value);
                },
                  font: {
                      weight: '750',
                      size: '15px'
                  }
              },
                grid: {
                  display: false
              }
            }
        }
    }
});
</script>
`;

const { title } = props;

return (
  <div className="section">
    <Container>
      <span>{title}</span>
      <iframe style={{ width: "100%", height: "100%" }} srcDoc={code} />
    </Container>
  </div>
);