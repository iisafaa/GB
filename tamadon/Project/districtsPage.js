
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
    import { getDatabase, ref, get, set, child, update, remove } 
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
    
    const firebaseConfig = {

        apiKey: "AIzaSyBZCozeeUfIW4DNaa08FJMjoQSgWgotmbI",
    authDomain: "gradb-a7c23.firebaseapp.com",
    databaseURL: "https://gradb-a7c23-default-rtdb.firebaseio.com",
    projectId: "gradb-a7c23",
    storageBucket: "gradb-a7c23.appspot.com",
    messagingSenderId: "869500719030",
    appId: "1:869500719030:web:df7226ffd89be363e4bb17",
    measurementId: "G-CW1KF3Z7ZZ"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    
    
    const db = getDatabase();
    const dbref = ref(db);
    
    var tbody = document.getElementById('tbody1');
    const btn = document.querySelector('.Side-button2');
    
    export async function neighborhoodPage(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const neighborhood = urlParams.get('neighborhood');
        
        const dbref = ref(db);

        await get(child(dbref, "MAKKAH/" + neighborhood))
            .then((snapshot) => {
                if (snapshot.exists()) {
                            alert(snapshot.val().neighborhood + ' مكة');
                    document.getElementById('neigbour').innerHTML = snapshot.val().neighborhood + ' مكة';
                    document.getElementById('concrete').innerHTML = snapshot.val().ToatalOfConcreteBarrier ;
                    document.getElementById('potholes').innerHTML = snapshot.val().ToatalOfPothole;
                    document.getElementById('sand').innerHTML = snapshot.val().ToatalOfSandOnRoad;
                    album(neighborhood);
                } else {

                    alert('No data found');
                    return;
                }
            })
            .catch((error) => {
                alert(error);
            });
    }

    export async function genratePDF(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const neighborhood = urlParams.get('neighborhood');
        
        const dbref = ref(db);

        await get(child(dbref, "MAKKAH/" + neighborhood))
            .then((snapshot) => {
                if (snapshot.exists()) {
                           
                

                    const doc = new jsPDF({
                        orientation: "p", //set orientation
                        unit: "pt", //set unit for document
                        format: "letter" //set document standard
                      });
                      
                      var btn = document.getElementById("b");
                      //const input = document.querySelector("input");
                      const sand = 'Toatal of sand of road',
                            potholes = 'Toatal of potholes',
                            Barrier = 'Toatal of concrete barrier',
                            Dat  = 'Date added';
                            //date = new Date();
                      const sizes = {
                        xs: 10, 
                        sm : 14, 
                        p: 16, 
                        h3: 18, 
                        h2: 20, 
                        h1: 22
                      };
                      const fonts = {
                        times: 'Times', 
                        helvetica: 'Helvetica'
                      };
                      
                      
                      const margin = 0.5; // inches on a 8.5 x 11 inch sheet.
                      const verticalOffset = margin;
                      var columns = [
                          {title: "Neighborhood name", dataKey: "col1"},
                          {title: snapshot.val().neighborhood, dataKey: "col2"}, 
                          {title: "Pollution Rate", dataKey: "col3"},
                          {title: snapshot.val().PollutionRate, dataKey: "col4"}
                      ];
                      var rows = [
                        {
                          "col1": Barrier, 
                          "col2": snapshot.val().ToatalOfConcreteBarrier, 
                          "col3": potholes, 
                          "col4": snapshot.val().ToatalOfPothole
                        },
                          {
                          "col1": sand, 
                          "col2": snapshot.val().ToatalOfSandOnRoad, 
                          "col3": Dat, 
                          "col4": snapshot.val().DateAdded
                        }
                      ];
                      
                      
                      
                      //btn.addEventListener("click", () => {
                        //const name = input.value;
                        doc.autoTable(columns, rows, {
                            styles: {
                              fillColor: [146,220,135],
                              lineColor: 240, 
                              lineWidth: 1,
                            },
                            columnStyles: {
                              col1: {fillColor: false},
                              col2: {fillColor: false},
                              col3: {fillColor: false},
                              col4: {fillColor: false},
                              col5: {fillColor: false},
                              col6: {fillColor: false},        
                            },
                            margin: {top: 260},
                            addPageContent: function(data) {
                              doc.setTextColor(0,102,51);
                              doc.setFont("times");
                              doc.setFontSize(14);
                              doc.text("Visual pollution report for the neighborhood", 170, 110);
                              doc.text("of Makkah Al-Mukarramah", 210, 135);
                              doc.text("This report was issued by the Ministry of Municipality, Kingdom of Saudi Arabia", 70, 395);
                      
                              doc.text("Name:", 55, 700);
                              doc.text("_________________", 55, 715);
                      
                              doc.text("Signature:", 448, 700);
                              doc.text("_________________", 448, 715);
                      
                            }
                        });
                        
                        doc.save(`التلوث البصري.pdf`);
                        
                     // });  
                      
                      
                } else {

                    alert('No data found');
                    return;
                }
            })
            .catch((error) => {
                alert(error);
            });
    }



    function addItemToTable(dist, date, prcnt){
        let trow = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.innerHTML = dist;
        td2.innerHTML = date;
        td3.innerHTML = prcnt;
        
        trow.appendChild(td3);
        trow.appendChild(td2);
        trow.appendChild(td1);

        tbody.appendChild(trow);

        // event listener to the row
        trow.addEventListener('click', async function() {
            // Perform action based on the clicked row
            // Example: Log the neighborhood name to the console
            const url = 'neighborhood.html?neighborhood=' + encodeURIComponent(dist);
            // Redirect the user to the new page
            console.log('Clicked row:', dist);
            window.location.href = url;
            // Replace the above console.log statement with your desired action
        });
        
    }

    export async  function FindData() {
        tbody.innerHTML = "";
        const totalPollution = await totalData();

        try {
        const snapshot = await get(child(dbref, "MAKKAH/"));
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
            const concreteBarrier = childSnapshot.val().ToatalOfConcreteBarrier || 0;
            const pothole = childSnapshot.val().ToatalOfPothole || 0;
            const sandOnRoad = childSnapshot.val().ToatalOfSandOnRoad || 0;
            const percentage = ((concreteBarrier + pothole + sandOnRoad) / totalPollution) * 100;
    
            addItemToTable(
                childSnapshot.val().neighborhood,
                childSnapshot.val().DateAdded,
                percentage.toFixed(2) + '%'
            );
            });
        } else {
            alert('nothing found');
            return;
        }
        } catch (error) {
        alert(error);
        }
    }

    async function totalData() {
        try {
            const snapshot = await get(child(dbref, "MAKKAH/"));
            let totalPollution = 0;
            if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                totalPollution += childSnapshot.val().ToatalOfConcreteBarrier;
                totalPollution += childSnapshot.val().ToatalOfPothole;
                totalPollution += childSnapshot.val().ToatalOfSandOnRoad;
            });
            return totalPollution;
            } else {
            alert('nothing found');
            return 0;
            }
        } catch (error) {
            alert(error);
            return 0;
        }
    }

    export async function pollutionPercentage(){
        try {
            const snapshot = await get(child(dbref, "MAKKAH/"));
            let concrete = 0;
            let potholes = 0;
            let sand = 0;
            if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                concrete += childSnapshot.val().ToatalOfConcreteBarrier;
                potholes += childSnapshot.val().ToatalOfPothole;
                sand += childSnapshot.val().ToatalOfSandOnRoad;
            });

            // calculate the percentage of each pollution type
            // concrete = (concrete / await totalData() ) * 100 ;
            // potholes = (potholes / await totalData() ) * 100 ;
            // sand = (sand / await totalData() ) * 100 ;

            //assign values in the html page
            document.getElementById('statPotholes').innerHTML = potholes;//.toFixed(2)+ '%';
            document.getElementById('statSand').innerHTML = sand;//.toFixed(2)+ '%';
            document.getElementById('statConcrete').innerHTML = concrete;//.toFixed(2)+ '%';

            } else {
            alert('nothing found');
            return 0;
            }
        } catch (error) {
            alert(error);
            return 0;
        }
    }

    async function album(neighborhood) {

        try {
          const snapshot = await get(child(dbref, "MAKKAH/" + neighborhood + '/url'));
        
          if (snapshot.exists()) {
            snapshot.forEach((urlSnapshot) => {

                const data = urlSnapshot.val();
                const values = Object.values(data);

                const url = values[0];
                const location = values[1];

                const anchor= document.createElement("a");
                anchor.href= location;
                anchor.classList.add("anchor");

                const imgBox = document.createElement("div");
                imgBox.classList.add("Image-box")
        
                const image = document.createElement("img");
                image.src = url;
                image.alt = "Visual Pollution Image";
                image.classList.add("inner-image");
        
                anchor.appendChild(image);
                imgBox.appendChild(anchor);
                document.querySelector(".grid-container").appendChild(imgBox);
            
            });
          } else {
            alert("No data found");
          }
        } catch (error) {
          alert(error);
        }
      }
    
    
    

      export async function staticPage() {
        const dbRef = ref(db);
        
    
        try {
          /*   await get(child(dbRef, "MAKKAH"));
            var pollution = [];
    
            snapshot.forEach(childSnapshot => {
                pollution.push(childSnapshot.val());
            });
    */      const snapshot = await get(child(dbref, "MAKKAH/"));
             const pollution = [];
    
           snapshot.forEach(childSnapshot => {
           pollution.push(childSnapshot.val());
        
    });
    
    var labList1=[];
    var dataList1=[];
    var dataList2=[];
    var dataList3=[];
    var backgroundColorlist=['rgba(255, 99, 132, 0.2)', 
                     'rgba(54, 162, 235, 0.2)', 
                     'rgba(255, 206, 86, 0.2)', 
                     'rgba(75, 192, 192, 0.2)', 
                     'rgba(153, 102, 255, 0.2)' ];
    var borderColorlist=['rgba(255, 99, 132, 1)', 
                     'rgba(54, 162, 235, 1)', 
                     'rgba(255, 206, 86, 1)', 
                     'rgba(75, 192, 192, 1)', 
                     'rgba(153, 102, 255, 1)' ];
    
    
    for(var i=0; i<pollution.length; i++){
     labList1.push(pollution[i].neighborhood)
     dataList1.push(pollution[i].ToatalOfConcreteBarrier)
     dataList2.push(pollution[i].ToatalOfPothole)
     dataList2.push(pollution[i].ToatalOfSandOnRoad)
     }
    
    // Data for the chart (myChart1)
    var data1 = {
        labels: labList1,
        datasets: [{
            data: dataList1,
            backgroundColor: backgroundColorlist,
            borderColor: borderColorlist,
            borderWidth: 1
        }]
    };
    
    const config1 = {
        type: 'bar',
        data: data1,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    
    // Get the canvas element
    var ctx1 = document.getElementById('myChart1').getContext('2d');
    const chart1 = new Chart(ctx1, config1);
    
    console.log("Pollution data:", pollution);
    
    
    }
    
    catch (error) {
        console.error(error);
    }
           
    };