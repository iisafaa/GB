
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

export async function staticPage() {
    const dbref = ref(db);


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

        var labList1 = [];
        var dataList1 = [];
        var dataList2 = [];
        var dataList3 = [];
        var backgroundColorlist = ['rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'];
        var borderColorlist = ['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'];


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

        //------------------------chart#2--------------------------------------------->



  
        // Data for the chart (myChart2)
        var data2 = {
            labels: labList1,
            datasets: [{ 
                data: dataList2, 
                backgroundColor: backgroundColorlist,                                      
                borderColor:borderColorlist, 
                borderWidth: 1 
            }] 
        }; 
 
        const config2 = {
            type: 'bar',
            data: data2,
            options: {
            scales: {
                y: {
                beginAtZero: true
            }
        }
    }
};
 
        // Get the canvas element 
        var ctx2 = document.getElementById('myChart2').getContext('2d'); 
        const chart2 = new Chart(ctx2, config2);
       

// Data for the chart (myChart2)
var data3 = {
            labels: labList1,
            datasets: [{ 
                data: dataList3, 
                backgroundColor: backgroundColorlist,                                      
                borderColor:borderColorlist, 
                borderWidth: 1 
            }] 
        }; 
 
        const config3 = {
            type: 'bar',
            data: data3,
            options: {
            scales: {
                y: {
                beginAtZero: true
            }
        }
    }
};
 
        // Get the canvas element 
        var ctx3 = document.getElementById('myChart3').getContext('2d'); 
        const chart3 = new Chart(ctx3, config3);


    }

    catch (error) {
        console.error(error);
    }

};

export async function totalData() {
    try {
        const snapshot = await get(child(dbref, "MAKKAH/"));
        let totalConcrete = 0;
        let totalSand = 0;
        let totalPotholes = 0;

        if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {

            totalConcrete += childSnapshot.val().ToatalOfConcreteBarrier;
            totalPotholes += childSnapshot.val().ToatalOfPothole;
            totalSand += childSnapshot.val().ToatalOfSandOnRoad;

        });
        document.getElementById('statConcrete').innerHTML= totalConcrete;
        document.getElementById('statSand').innerHTML= totalSand;
        document.getElementById('statPotholes').innerHTML= totalPotholes;
        } else {
        alert('nothing found');
        return 0;
        }
    } catch (error) {
        alert(error);
        return 0;
    }
}






// Call the staticPage function to execute the code
staticPage();
