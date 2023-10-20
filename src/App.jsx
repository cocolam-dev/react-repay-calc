import "./App.css";
import LoanDetails from "./components/LoanDetails";
import RepaymentTable from "./components/RepaymentTable";

function App() {
  return (
    <>
      <h1>Monthly Loan Repayment Calculator</h1>
      <LoanDetails />
      <RepaymentTable />
    </>
  );
}

export default App;
