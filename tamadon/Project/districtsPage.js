
    //alert("script enterd");
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
    
    //const storage = firebase.storage();
    //const storageRef = storage.ref();
    
    var tbody = document.getElementById('tbody1');
    const btn = document.querySelector('.Side-button2');
    
    function addItemToTable(dist, date, prcnt, state){
        let trow = document.createElement('trow');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

        td1.innerHTML = dist;
        td2.innerHTML = date;
        td3.innerHTML = prcnt;
        td4.innerHTML = state;
        
        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);

        tbody.appendChild(trow);
        
    }

    function FindData() {
        //alert('find entered');
        tbody.innerHTML="";
        const dbref = ref(db);
        alert(dbref);
        get(child(dbref, "MAKKAH/")).then((snapshot) => {
                if(snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                   // alert(childSnapshot.val().neighborhood);
                    addItemToTable( childSnapshot.val().neighborhood,
                                    childSnapshot.val().DateAdded,
                                    'prcnt',
                                    'state');
                    });    
                } else {
                    
                    // bookCard.style.display = 'none';
                    // notFound.style.display = 'flex';
                    alert('nothin found');
                    return;
                    //alert('No data found');
                }
            })
            .catch((error) => {
                alert(error);
            });
    }

    FindData();

//     btn.addEventListener('click', function (e) {
    //     alert("gigigig");
    //     FindData();
    // });
