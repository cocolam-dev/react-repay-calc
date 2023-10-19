import { createContext, useContext, useState } from "react";
import LoanDetailsRecord from "../LoanDetailsRecord";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [loanDetails, setLoanDetails] = useState(LoanDetailsRecord[0]);
  const [numOfMth, setNumOfMth] = useState(0);
  const [repayments, setRepayments] = useState([]);
  const [totalPrincipalRepaid, setTotalPrincipalRepaid] = useState(0);
  const [totalInterestPaid, setTotalInterstPaid] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        loanDetails,
        setLoanDetails,
        numOfMth,
        setNumOfMth,
        repayments,
        setRepayments,
        totalPrincipalRepaid,
        setTotalPrincipalRepaid,
        totalInterestPaid,
        setTotalInterstPaid,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
