import { useState } from "react";
import { useGlobalContext } from "./GlobalContext";
import { NumericFormat } from "react-number-format";

const RepaymentTable = () => {
  const { loanDetails, repayments, setRepayments } = useGlobalContext();

  // const [rate, setRate] = useState([repayments.InterestRate]);

  let newRepayments = repayments;
  let newRate;
  const handleChange = (e, id) => {
    newRate = e.target.value;
    console.log(e.target.value);
    // setRate((rate[id].InterestRate = newRate));
    newRepayments[id].InterestRate = newRate;
    // console.log(newRepayments[id].InterestRate);
    // for (let i = id; i < loanDetails.TermYear * 12; i++) {
    //   newRepayments[i].InterestRate = newRate;
    //   setRepayments(newRepayments);
    // }
  };

  let InterestPaid = 0;
  let calcRepaymentAmt;
  let RepaymentAmt = 0;
  const handleClick = (id) => {
    for (let i = id; i < loanDetails.TermYear * 12; i++) {
      newRepayments[i].InterestRate = parseFloat(newRate);
      console.log(newRepayments[i]);

      //calculate interest paid
      InterestPaid = (
        newRepayments[i].OpBal *
        (parseFloat(newRepayments[i].InterestRate) / 100 / 365.25) *
        newRepayments[i].NumOfDays
      ).toFixed(2);

      newRepayments[i].InterestPaid = parseFloat(InterestPaid).toFixed(2);

      //calculate repayment amount
      calcRepaymentAmt = (
        (parseFloat(newRepayments[i].LoanAmount) *
          (parseFloat(newRepayments[i].InterestRate) / 100 / 12)) /
        (1 -
          (1 + parseFloat(newRepayments[i].InterestRate) / 100 / 12) **
            -(parseFloat(newRepayments[i].TermYear) * 12))
      ).toFixed(2);

      if (
        parseFloat(newRepayments[i].OpBal) + parseFloat(InterestPaid) <
        parseFloat(calcRepaymentAmt)
      ) {
        RepaymentAmt =
          parseFloat(newRepayments[i].OpBal) + parseFloat(InterestPaid);
      } else {
        RepaymentAmt = parseFloat(calcRepaymentAmt);
      }

      newRepayments[i].RepaymentAmt = parseFloat(RepaymentAmt).toFixed(2);

      setRepayments(newRepayments);

      console.log(repayments[i]);
    }
    // setRepayments(newRepayments);
    // console.log(newRepayments);
  };

  return (
    <>
      <div>
        <table>
          <tbody>
            <tr className="StickyRow">
              <th>Remaining number of months</th>
              <th>Year</th>
              <th>Month</th>
              <th>Number of days</th>
              <th>Annual interest rate %</th>
              <th>Opening balance</th>
              <th>Repayment</th>
              <th>Principal repaid</th>
              <th>Interest paid</th>
              <th>Closing balance</th>
              <th>Accumulated principal repaid</th>
              <th>Accumulated interest paid</th>
            </tr>
            {repayments.map((repayment) => {
              return (
                <tr key={repayment.id}>
                  <td key="RemainingNumOfMth">{repayment.RemainingNumOfMth}</td>
                  <td key="Year">{repayment.Year}</td>
                  <td key="Month">{repayment.Month}</td>
                  <td key="NumOfDays">{repayment.NumOfDays}</td>
                  <td key="InterestRate" className="RateRow">
                    {/* <input
                      className="RateChangeInput"
                      id="InterestRate"
                      defaultValue={repayment.InterestRate}
                      onChange={(e) => handleChange(e, repayment.id)}
                    ></input>
                    <button
                      id="InterestRate"
                      className="RateChangeBtn"
                      title="Click to change rate starting from this month"
                      onClick={() => handleClick(repayment.id)}
                    >
                      Apply
                    </button> */}
                    {repayment.InterestRate}
                  </td>
                  <td key="OpBal">
                    <NumericFormat
                      value={repayment.OpBal}
                      displayType="text"
                      thousandSeparator=","
                    />
                  </td>
                  <td key="RepaymentAmt">
                    <NumericFormat
                      value={repayment.RepaymentAmt}
                      displayType="text"
                      thousandSeparator=","
                    />
                  </td>
                  <td key="PrincipalRepaid">
                    <NumericFormat
                      value={repayment.PrincipalRepaid}
                      displayType="text"
                      thousandSeparator=","
                    />
                  </td>
                  <td key="InterestPaid">
                    <NumericFormat
                      defaultValue={repayment.InterestPaid}
                      displayType="text"
                      thousandSeparator=","
                    />
                  </td>
                  <td key="ClBal">
                    <NumericFormat
                      value={repayment.ClBal}
                      displayType="text"
                      thousandSeparator=","
                    />
                  </td>
                  <td key="AccPrincipalRepaid" className="AccRow">
                    <NumericFormat
                      value={repayment.AccPrincipalRepaid}
                      displayType="text"
                      thousandSeparator=","
                    />
                  </td>
                  <td key="AccInterestPaid" className="AccRow">
                    <NumericFormat
                      value={repayment.AccInterestPaid}
                      displayType="text"
                      thousandSeparator=","
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default RepaymentTable;
