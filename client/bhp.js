document.addEventListener("DOMContentLoaded", () => {
    const selElem = document.querySelector('select')

    // Function to fetch data from the server
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/get_location_names'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            const locations =Array.from(data['locations'])
            setlocations(locations)
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    const setlocations = (arr)=>{
        arr.forEach(element => {
            const o = document.createElement('option')
            o.value=element
            o.innerText=element
            selElem.appendChild(o)
        });
    }
    
    fetchData();


    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const area_sqft = document.getElementById('area').value;
        const bhk = document.getElementById('bhk').value;
        const bath = document.getElementById('bath').value;
        const location = document.getElementById('location').value;
        
        const parameters = {
            area_sqft: area_sqft,
            bhk: bhk,
            bath: bath,
            location: location
        };

        try {
            const resp = await fetch('http://127.0.0.1:5000/predict_home_price', {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)
            });
            if (!resp.ok) {
                throw new Error('Network response was not ok ' + resp.statusText);
            }
            const responseData = await resp.json();
            document.querySelector('h2').textContent = `Price: ${responseData.estimated_price} Lakhs`;
            console.log(responseData);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }

        console.log(parameters);
    });
});


