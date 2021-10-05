let submitForm = document.querySelector('.my-form')
let FirstGivenName = document.getElementById("FirstGivenName");
let FirstSurName = document.getElementById("FirstSurName");
let DayOfBirth = document.getElementById("DayOfBirth");
let MonthOfBirth = document.getElementById("MonthOfBirth");
let YearOfBirth = document.getElementById("YearOfBirth");
let BuildingNumber = document.getElementById("BuildingNumber");
let StreetName = document.getElementById("StreetName");
let StreetType = document.getElementById("StreetType");
let City = document.getElementById("City");
let Province = document.getElementById("Province");
let PostalCode = document.getElementById("PostalCode");
let Telephone = document.getElementById("Telephone");
let socialservice = document.getElementById("socialservice");
let error_message = document.getElementById("error_message");

function validation() {
    let text;
    error_message.style.padding = "10px";

    if (FirstGivenName.length < 2) {
        text = "Please Enter Valid First Name";
        error_message.innerHTML = text;
        return false;
    }
    if (FirstSurName.length < 2) {
        text = "Please Enter Valid Last Name";
        error_message.innerHTML = text;
        return false;
    }
    if (DayOfBirth.length >=3 || DayOfBirth.length < 1) {
        text = "Please Enter Valid Day Of Birth (e.g. 25)";
        error_message.innerHTML = text;
        return false;
    }
    if (MonthOfBirth >=3 || MonthOfBirth.length < 1) {
        text = "Please Enter Valid Month Of Birth (e.g. 11)";
        error_message.innerHTML = text;
        return false;
    }
    if (YearOfBirth.length !=4) {
        text = "Please Enter Valid Year Of Birth (e.g. 1985)";
        error_message.innerHTML = text;
        return false;
    }
    if (BuildingNumber.length < 1) {
        text = "Please Enter Valid Building Number (e.g. 1415)";
        error_message.innerHTML = text;
        return false;
    }
    if (StreetName.length < 1) {
        text = "Please Enter Valid Street Name (e.g. East 3rd)";
        error_message.innerHTML = text;
        return false;
    }
    if (StreetType.length < 1) {
        text = "Please Enter Valid Street Type (e.g. St/Ave/Dr/Rd)";
        error_message.innerHTML = text;
        return false;
    }
    if (City.length < 3) {
        text = "Please Enter Valid City (e.g. Vancouver)";
        error_message.innerHTML = text;
        return false;
    }
    if (Province.length != 2) {
        text = "Please Enter Valid Province Code (e.g. QC for Quebec)";
        error_message.innerHTML = text;
        return false;
    }
    if (PostalCode.length != 5) {
        text = "Please Enter Valid Postal Code (e.g. V2Y4U9)";
        error_message.innerHTML = text;
        return false;
    }
    if (Telephone.length != 9) {
        text = "Please Enter Valid Phone Number (e.g. 123456789)";
        error_message.innerHTML = text;
        return false;
    }
    if (socialservice.length != 9) {
        text = "Please Enter Valid Social Insurance Number (e.g. 123456789)";
        error_message.innerHTML = text;
        return false;
    }
    alert("Form Submitted Successfully! Please wait while we retrive your results...")
    return true;
}


let IdentityVerification = {
    fetchIdentityVerification: function (
        firstName,
        lastName,
        dateOfBirth,
        monthOfBirth,
        yearOfBirth,
        buildingNumber,
        streetName,
        streetType,
        city,
        province,
        postalCode,
        telephone,
        ssn,
    ) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic amFja3lfaWR2X2FwaTpUZXN0ITEyMzQh'
            },
            body: {
                "AcceptTruliooTermsAndConditions": true,
                "CleansedAddress": false,
                "ConfigurationName": "Identity Verification",
                "ConsentForDataSources": [],
                "CountryCode": "CA",
                "DataFields": {
                    "PersonInfo": {
                        "FirstGivenName": firstName,
                        "FirstSurName": lastName,
                        "DayOfBirth": dateOfBirth,
                        "MonthOfBirth": monthOfBirth,
                        "YearOfBirth": yearOfBirth
                    },
                    "Location": {
                        "BuildingNumber": buildingNumber,
                        "PostalCode": postalCode,
                        "StateProvinceCode": province,
                        "StreetName": streetName,
                        "StreetType": streetType,
                        "City": city,
                    },
                    "Communication": {
                        "Telephone": telephone
                    },
                    "NationalIds": [
                        {
                            "Number": ssn,
                            "Type": "socialservice"
                        }
                    ]
                }
            }
        }
        fetch("https://api.globaldatacompany.com/verifications/v1/verify", options)
        //    .then((res) => {
        //        status = res.status;
        //       return res.json()
        //    })
        //    .then((jsonData) => {
        //        console.log(jsonData);
        //        console.log(status);
        //    })
        //    .catch((err) => {
        //        handle error
        //        console.error(err);
        //    })
            .then(response => response.json())
            .then(data => this.displayIdentityVerification(data))
            .catch(err => console.error(err));
    },
    displayIdentityVerification: function (data) {
        const {RecordStatus} = data;
        console.log(RecordStatus)
        document.querySelector(".RecordStatus").innerText = "Status:" + RecordStatus;
    },
    submit: function () {
        this.fetchIdentityVerification(
            document.querySelector(".my-form #FirstGivenName").value,
            document.querySelector(".my-form #FirstSurName").value,
            document.querySelector(".my-form #DayOfBirth").value,
            document.querySelector(".my-form #MonthOfBirth").value,
            document.querySelector(".my-form #YearOfBirth").value,
            document.querySelector(".my-form #BuildingNumber").value,
            document.querySelector(".my-form #StreetName").value,
            document.querySelector(".my-form #StreetType").value,
            document.querySelector(".my-form #City").value,
            document.querySelector(".my-form #Province").value,
            document.querySelector(".my-form #PostalCode").value,
            document.querySelector(".my-form #Telephone").value,
            document.querySelector(".my-form #socialservice").value
        )
    }
}

submitForm.addEventListener("submit", function () {
    IdentityVerification.submit()
})
