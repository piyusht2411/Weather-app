
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton")
let error = document.querySelector(".error");


const getModifiedDate = () => {
	const d = new Date();
	let date = document.getElementById('date');

	const days = [
		"SUN",
		"MON",
		"TUE",
		"WED",
		"THU",
		"FRI",
		"SAT"
	];

	const months = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JULY",
		"AUG",
		"SEPT",
		"OCT",
		"NOV",
		"DEC"
	];
	
	let minute = d.getMinutes();
	let hour = d.getHours();

	let period = "AM";

	if(minute < 10){
		minute = "0" + minute;
	}
	if(hour > 11){
		hour = hour - 12;
		period = "PM";
	}

	let day = days[d.getDay()];
	let month = months[d.getMonth()];
	let date_ = d.getDate();

	date.innerHTML = `${day} | ${month} ${date_} | ${hour} : ${minute} ${period}`;
}

const getData = async (e) => {
	e.preventDefault();

	let cityName = searchInput.value;
	let content = document.getElementById('content');



	if(cityName == ""){
		error.innerText = " ** Please enter city Name ";
	}
	else{
		try{
			const url = `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${cityName}`;
			content.innerHTML= "<button class='spinner-border'></button>"
			const fetchData = await fetch(url);
			const jsonData = await fetchData.json();

			content.innerHTML = `
				<div class="top_layer">
					<h2 class="title">${jsonData.location.name},${jsonData.location.country} </h2>
					<span class="lead" id="date"></span>

					<div class="temprature">
						<h1>${jsonData.current.temp_c}&deg; C</h1>
						<img src="${jsonData.current.condition.icon}" width="50" height="50">
					</div>
				</div>
				<hr style="background-color:lightgray;">
				<div class="bottom_layer">
					<div class="row">
						<div class="col-md-6 col-12 ">
							<h4>Humidity : ${jsonData.current.humidity}</h4>
								<h4>Wind Kph : ${jsonData.current.wind_kph}</h4>
									<h4>Last Updated : ${jsonData.current.last_updated}</h4>
										<h4>Pressure : ${jsonData.current.pressure_in}</h4>
						</div>
						<div class="col-md-6 col-12 text-left">
							<h4>Feels : ${jsonData.current.feelslike_c}</h4>
								<h4>Region : ${jsonData.location.region}</h4>
									<h4>Cloud : ${jsonData.current.cloud}</h4>
										
						</div>
					</div>
				</div>
			`;

			error.innerText = "";

			getModifiedDate();

		}catch{
			error.innerText = " ** Please Enter Valid City Name ";
			content.innerHTML = "";
		}
	}
}

searchButton.addEventListener("click",getData);
