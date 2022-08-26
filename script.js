const form = document.getElementById("submit-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const msg = document.getElementById("message");

var emailflag=0,nameflag=0,messageflag=0;

form.addEventListener("submit", (e) => {
	e.preventDefault();
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
    
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	if (usernameValue === "") {
		setErrorFor(username, "Username cannot be blank");
        nameflag = 0;
	} else {
		setSuccessFor(username);
        nameflag = 1;
	}

	if (emailValue === "") {
		setErrorFor(email, "Email cannot be blank");
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, "Not a valid email");
        emailflag = 0;
	} else {
		setSuccessFor(email);
        emailflag = 1;
	}

    if (msg.value.length == 0) {
		setErrorFor(msg, "Message cannot be blank");
        messageflag = 0;
	} else {
		setSuccessFor(msg);
        messageflag = 1;
	}

	if(emailflag == 1 && nameflag == 1 && messageflag == 1){
        $.ajax({
            url:"https://script.google.com/macros/s/AKfycbxxYNql2MdK5eWe-Y4YfrqpsC-OBatRomJ9cVEpYEvtBOGaXMZBFqcin8DFMe9wNtfw/exec",
            data:$("#submit-form").serialize(),
            method:"post",
            success:function (response){
                alert("Thank you for contacting me")
                window.location.reload()
                //window.location.href="https://google.com"
            },
            error:function (err){
                alert("Something Error")
            }
        })
    }
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector("small");
	small.innerText = message;
    small.style.color = "red";
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	const small = formControl.querySelector("small");
	small.innerText = "";
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
}


