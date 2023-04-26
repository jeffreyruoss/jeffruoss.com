document.addEventListener('DOMContentLoaded', function () {
    const labels = ['acmeprints.com - with old theme', 'jeff.acmeprints.com - with old theme', 'jeff.acmeprints.com - without Old Theme'];

    const scoreData = {
        labels: labels,
        datasets: [
            {
                label: 'Google Mobile Score',
                data: [27, 34, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Google Desktop Score',
                data: [44, 60, 64],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    };

    const loadTimeData = {
        labels: labels,
        datasets: [
            {
                label: 'DOM Load Time',
                data: [4.59, 3.32, 0.618],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
            {
                label: 'Load Time',
                data: [10.02, 5.40, 2.23],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                // text: 'Website Speed Comparison',
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    font: {
                        size: 18
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 14
                    }
                }
            }
        },
        datalabels: {
            color: '#000',
            formatter: function(value, context) {
                return value.toFixed(2);
            },
            font: {
                size: 14
            }
        },
    };

    const loadTimeCtx = document.getElementById('loadTimeChart').getContext('2d');
    const loadTimeChart = new Chart(loadTimeCtx, {
        type: 'bar',
        data: loadTimeData,
        options: options
    });
    

    const scoreCtx = document.getElementById('scoreChart').getContext('2d');
    const scoreChart = new Chart(scoreCtx, {
        type: 'bar',
        data: scoreData,
        options: options
    });
});
