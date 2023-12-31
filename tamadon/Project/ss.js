
 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import Chart from "https://cdn.jsdelivr.net/npm/chart.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

import {getDatabase, ref, get,set, child, update, remove,query, limitToFirst, limitToLast, orderByChild,orderByValue, startAt, startAfter, endAt, endBefore , equalTo}
  from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

  const db =  getDatabase();
  const dbRef = ref(db);


  async function totalData() {
    try {
        const snapshot = await get(child(dbRef, "MAKKAH/"));
        const pollution = [];
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
        if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
             
            pollution.push(childSnapshot.val());          
        });
        
        console.log("Pollution data:", pollution);

        
        
        
        
        //return totalPollution;
        } else {
        alert('nothing found');
        return 0;
        }
    } catch (error) {
        alert(error);
        return 0;
    }
}

/*
 export async function getstdata() {
    const dbRef = ref(db, "MAKKAH");
  
    try {
      const snapshot = await get(child(dbRef, "/"));
      const pollution = [];
  
      snapshot.forEach(childSnapshot => {
        pollution.push(childSnapshot.val());
      });
  
      // Chart rendering code here...

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
                   borderColor:borderColorlist , 
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





    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the getstdata function to fetch data and render the chart
  getstdata();*/
    
   
 