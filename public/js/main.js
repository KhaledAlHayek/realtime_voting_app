const form = document.forms["vote-form"];

// form submit
form.addEventListener("submit", e => {
  e.preventDefault();

  const choice = document.querySelector("input[name='os']:checked").value;
  const data = {os: choice};

  fetch("http://localhost:3000/poll", {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
}); 

fetch("http://localhost:3000/poll")
  .then(res => res.json())
  .then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    // count votes
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc), {});
    let dataPoints = [
      {label: "Windows", y: voteCounts.Windows},
      {label: "MacOS", y: voteCounts.MacOS},
      {label: "Linux", y: voteCounts.Linux},
      {label: "Other", y: voteCounts.Other}
    ];
    const chartContainer = document.getElementById("chartContainer");
    if(chartContainer){
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme1",
        title: {
          text: `OS Total Votes ${totalVotes}`
        },
        data: [
          {
            type: "column",
            dataPoints: dataPoints
          }
        ]
      });
      chart.render();
      Pusher.logToConsole = true;
      var pusher = new Pusher('1f914df2577c7dc784d2', {
        cluster: 'eu'
      });
      var channel = pusher.subscribe("os-poll");
      channel.bind("os-vote", data => {
        dataPoints.map(x => {
          if(x.label == data.os){
            x.y += data.points;
            return x;
          }
          else{
            return x;
          }
        });
        chart.render();
      });
    }
    chart.render();
  })
  .catch(err => console.log(err));
