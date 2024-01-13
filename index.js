
document.addEventListener("DOMContentLoaded", function(){
    const getReportEl = document.getElementById("get-report");
    
    getReportEl.addEventListener("click", function(event) {
        event.preventDefault();
        const searchInputEl = document.getElementById("search-input");
        const inputValue = searchInputEl.value;
        // construct the api url and Headers
        const apiurl = `https://api-public.nhvr.gov.au/vehicle/vehicleRegistrations/search?qs=${inputValue}&coordinate={\"longitude\": -35.135719, \"latitude\": 139.255014}`
        const headers = {
            "Content-Type": "application/json",
            // SUBSCRIPTION_KEY should be put below
            "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
        };
        // Make the api request using the fetch api
        fetch(apiurl, {headers})
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error("API Error:", error);
                displayError("Error fetching data from the api.");

            });
    });
});

function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""
    // Iterate over each item in the JSON array (assuming the data is an array)
    data.forEach(item => {
        // Creae a div element for each item
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("custom-data-item"); //optional: add a css class for styling

        //Create custom HTML elements to display specific data fields
        const makeElement = document.createElement("p");
        makeElement.innerText = `Make: ${item.vehicleMake}`;
        const modelElement = document.createElement("p");
        modelElement.innerText = `Model: ${item.vehicleModel}`;

        const vehicleYearManufacturedElement = document.createElement("p");
        vehicleYearManufacturedElement.innerText = `Year Manufactured: ${item.vehicleYearManufactured}`;

        const registrationJurisdictionElement = document.createElement("p");
        registrationJurisdictionElement.innerText = `Jurisdiction: ${item.registrationJurisdiction}`;

        const registrationEndDateElement = document.createElement("p");
        registrationEndDateElement.innerText = `Registration End Date: ${item.registrationEndDate}`;

        const registrationChargeCodeElement = document.createElement("p");
        registrationChargeCodeElement.innerText = `Charge Code: ${item.registrationChargeCode}`;

        const registrationStatusElement = document.createElement("p");
        registrationStatusElement.innerText = `Registration Status: ${item.registrationStatus}`;

        const isPbsVehicleApprovedElement = document.createElement("p");
        isPbsVehicleApprovedElement.innerText = `Pbs Vehicle Approved: ${item.isPbsVehicleApproved}`;

        const pbsRecordsElement = document.createElement("p");
        pbsRecordsElement.innerText = `pbs Records: ${item.pbsRecords}`;


        itemDiv.appendChild(makeElement);
        itemDiv.appendChild(modelElement);
        itemDiv.appendChild(vehicleYearManufacturedElement);
        itemDiv.appendChild(registrationJurisdictionElement);
        itemDiv.appendChild(registrationEndDateElement);
        itemDiv.appendChild(registrationChargeCodeElement);
        itemDiv.appendChild(registrationStatusElement);
        itemDiv.appendChild(isPbsVehicleApprovedElement);
        itemDiv.appendChild(pbsRecordsElement);
 

        resultsDiv.appendChild(itemDiv);
    });
}
function displayError(errorMessage) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerHTML = errorMessage;
}

