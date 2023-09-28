
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
                    document.getElementById('concrete').innerHTML = snapshot.val().ToatalOfConcreteBarrier + ' صبة';
                    document.getElementById('potholes').innerHTML = snapshot.val().ToatalOfPothole + ' حفرة';
                    document.getElementById('sand').innerHTML = snapshot.val().ToatalOfSandOnRoad + ' رمل على الطريق';
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
        console.log("Function called on page load");

        tbody.innerHTML = "";
        const totalPollution = await totalData();
        // alert(typeof totalPollution, totalPollution);
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


    // async function album(neighborhood){
    //     const dbref = ref(db);
    //     var index = 0;
    //     await get(child(dbref, "MAKKAH/" + neighborhood + '/url')).then((snapshot) => {
    //       if (snapshot.exists()) {
    //         snapshot.forEach((childSnapshot) => {
    //           crd.style.Display = "felx"; //to show the content of card class

    //           const url = childSnapshot.val();

    //           const box = document.createElement("div"); //create div element 
    //           box.classList.add("box"); //adding class to div element

    //           const imgBox = document.createElement("div"); //create div element 
            
    //           const Image = document.createElement("img"); //create img element
    //           Image.src = url.index;
    //           index++;
    //           Image.alt = "Visual Pollution Image";
              
    //           imgBox.appendChild(box);
    //           box.appendChild(Image); //the img child under the div element
    //           imgBox.classList.add("Image-box"); //adding class to div element
    //           document.querySelector(".images").appendChild(imgBox);
    //         });
    //       } else {
    //         alert("No data found");
    //       }
    //     }).catch((error) => {
    //       alert(error);
    //     });
    // }


    async function album(neighborhood) {
        const dbref = ref(db);
        var index = 0;
      
        try {
          const snapshot = await get(child(dbref, "MAKKAH/" + neighborhood + '/url'));
        
          if (snapshot.exists()) {
            snapshot.forEach((urlSnapshot) => {
              
        
                const url = urlSnapshot.val();
        
                const imgBox = document.createElement("div");
                imgBox.classList.add("Image-box")
        
                const image = document.createElement("img");
                image.src = url;
                image.alt = "Visual Pollution Image";
                image.classList.add("inner-image");
        
                imgBox.appendChild(image);
                document.querySelector(".grid-container").appendChild(imgBox);
             
            });
          } else {
            alert("No data found");
          }
        } catch (error) {
          alert(error);
        }
      }
    
    
    

