import { useGlobalContext } from "./GlobalContext";
import { NumericFormat } from "react-number-format";
import { useState } from "react";

const LoanDetails = () => {
  const {
    setLoanDetails,
    numOfMth,
    setNumOfMth,
    repayments,
    setRepayments,
    totalPrincipalRepaid,
    setTotalPrincipalRepaid,
    totalInterestPaid,
    setTotalInterstPaid,
  } = useGlobalContext();

  //   const handleChange = (e) => {
  //     let newLoanDetails = {
  //       //   ...loanDetails,
  //       [e.target.name]: e.target.value,
  //     };
  //     setLoanDetails(newLoanDetails);
  //     console.log(newLoanDetails);
  //   };

  //https://www.youtube.com/watch?v=6VgozGK4qxQ&list=PLnHJACx3NwAep5koWkniVHw8PK7dWCO21&index=92

  const handleSubmit = (e) => {
    e.preventDefault();

    setTotalPrincipalRepaid(0);
    setTotalInterstPaid(0);
    setRepayments([]);

    const formData = new FormData(e.currentTarget);
    const newLoanDetails = Object.fromEntries(formData);
    setLoanDetails(newLoanDetails);
    const newNumOfMth = parseInt(newLoanDetails.TermYear) * 12;
    setNumOfMth(newNumOfMth);

    let newRepayment2 = {};

    let newRepayments = [];
    let id = 0;
    let RemainingNumOfMth = parseInt(newNumOfMth);
    let Year = parseInt(newLoanDetails.StartYear);
    let Month;
    let MonthNum = parseInt(newLoanDetails.StartMonth);
    let monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let endDate;
    let NumOfDays = 0;
    let InterestRate = newLoanDetails.StartInterest;
    let OpBal = parseFloat(newLoanDetails.LoanAmount);
    let calcRepaymentAmt;
    let RepaymentAmt = 0;
    let InterestPaid = 0;
    let PrincipalRepaid = 0;
    let ClBal = 0;
    let AccPrincipalRepaid = parseFloat(0);
    let AccInterestPaid = parseFloat(0);

    for (let i = newNumOfMth; i > 0; i--) {
      endDate = new Date(Year, MonthNum, 0);

      NumOfDays = endDate.getDate();

      Month = monthsArray[MonthNum - 1];

      //calculate interest paid
      InterestPaid = (
        OpBal *
        (parseFloat(InterestRate) / 100 / 365.25) *
        NumOfDays
      ).toFixed(2);

      //calculate repayment amount

      calcRepaymentAmt = (
        (parseFloat(newLoanDetails.LoanAmount) *
          (parseFloat(InterestRate) / 100 / 12)) /
        (1 -
          (1 + parseFloat(InterestRate) / 100 / 12) **
            -(parseFloat(newLoanDetails.TermYear) * 12))
      ).toFixed(2);

      if (
        parseFloat(OpBal) + parseFloat(InterestPaid) <
        parseFloat(calcRepaymentAmt)
      ) {
        RepaymentAmt = parseFloat(OpBal) + parseFloat(InterestPaid);
      } else {
        RepaymentAmt = parseFloat(calcRepaymentAmt);
      }

      //calculate principal repaid
      PrincipalRepaid = (
        parseFloat(RepaymentAmt) - parseFloat(InterestPaid)
      ).toFixed(2);

      // //calculate closing balance
      ClBal = (OpBal - PrincipalRepaid).toFixed(2);

      //calculate accumulated principal repaid
      AccPrincipalRepaid = (
        parseFloat(AccPrincipalRepaid) + parseFloat(PrincipalRepaid)
      ).toFixed(2);

      setTotalPrincipalRepaid(AccPrincipalRepaid);

      //calculate accumulated interest paid
      AccInterestPaid = (
        parseFloat(AccInterestPaid) + parseFloat(InterestPaid)
      ).toFixed(2);

      setTotalInterstPaid(AccInterestPaid);

      newRepayment2 = {
        id,
        RemainingNumOfMth,
        Year,
        Month,
        NumOfDays,
        InterestRate,
        OpBal,
        RepaymentAmt,
        PrincipalRepaid,
        InterestPaid,
        ClBal,
        AccPrincipalRepaid,
        AccInterestPaid,
      };

      newRepayments = [...newRepayments, newRepayment2];
      setRepayments(newRepayments);
      OpBal = (OpBal - PrincipalRepaid).toFixed(2);
      RemainingNumOfMth -= 1;
      id++;
      if (MonthNum === 12) {
        Year += 1;
        MonthNum = 1;
      } else {
        MonthNum += 1;
      }
    }
  };

  const [rateChange, setRateChange] = useState();
  const handleRateChange = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRateChange = Object.fromEntries(formData);
    setRateChange(newRateChange);
    console.log(newRateChange);
  };

  return (
    <div className="Forms">
      <form className="LoanDetailForm" onSubmit={handleSubmit}>
        <li className="LoanDetailField">
          <label htmlFor="LoanAmount">Amount: </label>
          <input id="LoanAmount" name="LoanAmount" type="number" required />
        </li>
        <li className="LoanDetailField">
          <label htmlFor="StartInterest">
            Starting annual interest rate %:{" "}
          </label>
          <input
            id="StartInterest"
            name="StartInterest"
            type="number"
            required
            //   onChange={handleChange}
          />
        </li>
        <li className="LoanDetailField">
          <label htmlFor="TermYear">Loan term in years: </label>
          <input
            id="TermYear"
            name="TermYear"
            type="number"
            required
            //   onChange={handleChange}
          />
        </li>
        <li className="LoanDetailField">
          <label htmlFor="StartYear">Term start year: </label>
          <input
            id="StartYear"
            name="StartYear"
            type="number"
            required
            //   onChange={handleChange}
          />
        </li>
        <li className="LoanDetailField">
          <label htmlFor="StartMonth">Term start month: </label>
          <select
            id="StartMonth"
            name="StartMonth"
            type="string"
            required
            //   onChange={handleChange}
          >
            <option value="">--- Please select ---</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </li>
        <button type={"submit"} className="btn">
          Calculate
        </button>
      </form>
      {/* <form className="LoanDetailForm" onSubmit={handleRateChange}>
        <li className="RateChangeField">
          <label htmlFor="RateChangeFromYear">Rate Change From Year: </label>
          <input
            id="RateChangeFromYear"
            name="RateChangeFromYear"
            type="number"
            required
          />
        </li>
        <li className="RateChangeField">
          <label htmlFor="RateChangeFromMonth">Rate Change From Month: </label>
          <input
            id="RateChangeFromMonth"
            name="RateChangeFromMonth"
            type="number"
            required
          />
        </li>
        <li className="RateChangeField">
          <label htmlFor="RateChange">New annual interest rate %: </label>
          <input id="RateChange" name="RateChange" type="number" required />
        </li>
        <button type={"submit"} className="btn">
          Apply
        </button>
      </form> */}
    </div>
  );
};
export default LoanDetails;
