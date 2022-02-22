/* Global Variables */


let btn = document.querySelector('#generate');

// openWheather API
let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=ca10b037116bf27f6f1b4e8223325ae1';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//
btn.addEventListener('click',generate);

function generate(){
    let zipCode = document.querySelector('#zip').value ;
    let text = document.querySelector('#feelings').value;

    if(zipCode === "")
    {
        alert('please enter zip code');
    }
    else{
        //get data from api
        getWeatherDemo(baseUrl,zipCode,apiKey)
        //post data to server
        .then((data) => {
            postData('/postAll',{
                date : newDate , 
                temp : data.main.temp ,
                text })
        })
        //add data to UI
        .then((newData) => {
            UI_Post(text);

        })
    }
}


//function of get weather from api
const getWeatherDemo = async (baseurl, code, key) => {
    
    const res= await fetch(baseurl + code + key+"&units=metric")
    try{
        const data=await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log('error',error)

    }

}
//function of post data to server
const postData = async (url='', data={}) => {
    const response = await fetch(url,{
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        return newData;
    }
    catch(error){
        console.log('error',error);
    }

}

//function to update UI
const UI_Post = async (text) => {
    const request = await fetch('/getAll');
    try{
        const alldata = await request.json();
        document.getElementById('date').innerHTML ="date :" + alldata.date;
        document.getElementById('temp').innerHTML ="temp :" + alldata.temp;
        document.getElementById('content').innerHTML ="feeling :" +text;
    }
    catch(error){
        console.log('error',error);
    }


}
