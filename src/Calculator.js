import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
    const [display, setDisplay] = useState("");
    console.log("Calculator rendered with display:", display);

    const handleClick = (value) => {
        setDisplay(prev => prev + value);
    };

    const handleClear = () => {
        setDisplay("");
    };

    const handleCalculate = () => {
    if (!display) return;

    try {
        const sanitizedDisplay = display.replace(/\b0+(\d+)/g, "$1");

        if (!sanitizedDisplay) {
        setDisplay("0");
        return;
        }

        const result = eval(sanitizedDisplay);
        if (result === undefined) return;
        setDisplay(result.toString());
    } catch {
        setDisplay("Error");
    }
};

  const buttons = [
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "/", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "*", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operator" },
    { label: "0", type: "number" },
    { label: ".", type: "number" },
    { label: "C", type: "clear" },
    { label: "+", type: "operator" },
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2 className="calculator-title">Calculate</h2>
        <div className="display">{display || "0"}</div>

        <div className="button-grid">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className={`calculator-button ${btn.type}`}
              onClick={() => {
                if (btn.type === "clear") handleClear();
                else handleClick(btn.label);
              }}
            >
              {btn.label}
            </button>
          ))}
          <button className="calculator-button equal" onClick={handleCalculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
