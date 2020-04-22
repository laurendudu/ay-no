const quizUI = document.querySelector('.dashboard');

var datapoints = [];



window.onload = function () {
    auth.onAuthStateChanged((user) => {

        db.collection("users").doc(user.uid).collection('xp').get().then(data => {

                    data.forEach(doc => {
                        
                            var sameDateFound = false;
            
                            if (datapoints.length != 0) {
                                datapoints.forEach(e => {
                                    if (e.x.getDate() == doc.data().date.toDate().getDate()) {
                                            e.y += doc.data().level;
                                            sameDateFound = true;        
                                    };
                                });
                            };
            
                            if (!sameDateFound) {
                                datapoints.push(
                                    {x: doc.data().date.toDate(),
                                    y: doc.data().level}
                                );
                            }
        
                    }
                    );
            

                        

            var options = {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Your progress"
                },
                axisX:{
                    valueFormatString: "DD MMM"
                },
                axisY: {
                    title: "XP",
                    suffix: "",
                    minimum: 0
                },
                toolTip:{
                    shared:true
                },  
                legend:{
                    cursor:"pointer",
                    verticalAlign: "bottom",
                    horizontalAlign: "left",
                    dockInsidePlotArea: true,
                    itemclick: toogleDataSeries
                },
                data: [{
                    type: "line",
                    showInLegend: true,
                    name: "gained xp",
                    markerType: "circle",
                    xValueFormatString: "DD MMM, YYYY",
                    color: "#F08080",
                    yValueFormatString: "#,##0",
                    dataPoints:
                        datapoints,
                }]
                
            };
            $("#graphContainer").CanvasJSChart(options);
            
        });
    });
    
    
    function toogleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else{
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
    auth.onAuthStateChanged((user) => {

        db.collection("users").doc(user.uid).get().then(doc => {
            var options2 = {
                animationEnabled: true,
                title: {
                    text: "Question Log"
                },
                data: [{
                    type: "doughnut",
                    innerRadius: "40%",
                    showInLegend: true,
                    legendText: "{label}",
                    indexLabel: "{label}: #percent%",
                    dataPoints: [
                        { label: "Correct", y: doc.data().q_correct },
                        { label: "Incorrect", y: doc.data().q_incorrect },
                    ]
                }]
            };
            $("#chartContainer").CanvasJSChart(options2);
        })
        
        
        
    });

};

    




