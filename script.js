document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const taxResult = document.getElementById('taxResult');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateTax();
    });

    function calculateTax() {
        // Get input values
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const ageGroup = document.getElementById('ageGroup').value;
        const totalDeductions = parseFloat(document.getElementById('totalDeductions').value);

        // Error checking and validation
        let error = false;
        const errorIcons = document.querySelectorAll('.error-icon');
        errorIcons.forEach(icon => icon.style.display = 'none');

        if (isNaN(grossIncome)) {
            showErrorIcon('grossIncome', 'Invalid gross income');
            error = true;
        }

        if (ageGroup === "") {
            showErrorIcon('ageGroup', 'Age group is required');
            error = true;
        }

        if (error) {
            return;
        }

        // Perform tax calculation
        let taxableIncome = grossIncome + extraIncome - totalDeductions;
        let tax = 0;

        if (taxableIncome > 8) {
            if (ageGroup === "<40") {
                tax = 0.3 * (taxableIncome - 8);
            } else if (ageGroup === ">=40 & <60") {
                tax = 0.4 * (taxableIncome - 8);
            } else if (ageGroup === ">=60") {
                tax = 0.1 * (taxableIncome - 8);
            }
        }

        // Display result in modal
        showModal(`Your tax amount is: ${tax} Lakhs`);
    }

    function showModal(result) {
        taxResult.textContent = result;
        modal.style.display = 'block';

        // Close modal when clicking on '×' (close) button
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside of modal
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    function showErrorIcon(fieldId, errorMessage) {
        const errorIcon = document.querySelector(`#${fieldId} + .error-icon`);
        errorIcon.style.display = 'inline-block';
        errorIcon.title = errorMessage;
    }
});
