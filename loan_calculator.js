let user_info = askInformation();

setUsername(user_info.username);

document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "Escape") {
        let new_user_info = askInformation();

        user_info = new_user_info;
        setUsername(user_info.username);

        setLoan();
    }
});

/*
FUNCTIONS START HERE
*/

function initializeConstants() {
    /*
    Initialize the constants used to show loan amount, interest rate and months to pay.
    */
    const amount = document.querySelector("#amount").value;
    const interest_rate = document.querySelector("#interest_rate").value;
    const months = document.querySelector("#months").value;

    return [amount, interest_rate, months];
}

function askInformation() {
    const username = prompt("Enter your name: ");
    const annual_income = parseInt(
        prompt("Enter your annual income (after taxes):")
    );

    // Create "user object" based on the information given.
    const user = {
        username: username,
        annual_income: annual_income,
        monthly_income: annual_income / 12,
    };

    // Show an alert with the information given.
    alert(`Welcome ${user.username}, your information is:
Annual Income: $${user.annual_income}
Monthly Income: $${user.monthly_income}`);

    return user;
}

function setPayment(text) {
    document.querySelector("#payment").innerHTML = text;
}

function setPercentage(text) {
    document.querySelector("#percentage").innerHTML = text;
}

function setUsername(text) {
    document.querySelector("#name").innerHTML = `Welcome ${text}`;
}

function calculateMonthlyPayment(amount, interest_rate, months) {
    const interest = (amount * (interest_rate * 0.01)) / months;

    // Calculate how much the user needs to pay.
    let payment = (amount / months + interest).toFixed(2);

    // Calculate what percentage of the user's monthly income is needed to pay.
    let percentage = ((payment / user_info.monthly_income) * 100).toFixed(2);

    // Set messages.
    percentage = `${percentage}% of your monthly income`;
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let monthly_payment = `Monthly Payment = $${payment}`;

    return [monthly_payment, percentage];
}

function verifyInputs(amount, interest_rate, months) {
    /*
    Verify the inputs given by the user and check if a result should be shown or not.
    */
    if (amount < 1 || amount > 10000000) {
        setPayment(`INVALID LOAN AMOUNT`);
        setPercentage("");
    } else if (interest_rate < 0 || interest_rate > 1000) {
        setPayment(`INVALID INTEREST RATE`);
        setPercentage("");
    } else if (months < 1 || months > 300) {
        setPayment(`INVALID NUMBER OF MONTHS`);
        setPercentage("");
    } else {
        let monthly_calculation = calculateMonthlyPayment(
            amount,
            interest_rate,
            months
        );
        const [monthly_payment, percentage] = monthly_calculation;
        setPayment(monthly_payment);
        setPercentage(percentage);
    }
}

function setLoan() {
    const constants = initializeConstants();

    const [amount, interest_rate, months] = constants;

    verifyInputs(amount, interest_rate, months);
}
