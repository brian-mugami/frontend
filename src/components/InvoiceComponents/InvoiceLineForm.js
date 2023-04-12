import { useState } from 'react';

function InvoiceLineForm() {
  const [lines, setLines] = useState([{ item_name: '', buying_price: '', item_quantity: '',invoice:'', description:'', amount: ''}]);
  const [totalAmount, setTotalAmount] = useState('');

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newLines = [...lines];
    newLines[index][name] = value;
    setLines(newLines);
  };

  const handleAddLine = () => {
    setLines([...lines, { item_name: '', buying_price: '', item_quantity: '',invoice:'', description:'', amount: '' }]);
  };

  const handleRemoveLine = (index) => {
    const newLines = [...lines];
    newLines.splice(index, 1);
    setLines(newLines);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const invoiceTotal = lines.reduce((total, line) => total + parseFloat(line.amount), 0);
    if (invoiceTotal !== parseFloat(totalAmount)) {
      alert('The total amount of the invoice lines must equal the invoice amount.');
      return;
    }
    // handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {lines.map((line, index) => (
        <div key={index}>
          <label>Item Name:</label>
          <input
            type="text"
            name="description"
            value={line.description}
            onChange={(event) => handleChange(event, index)}
          />
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={line.amount}
            onChange={(event) => handleChange(event, index)}
          />
          <button type="button" onClick={() => handleRemoveLine(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddLine}>Add Line</button>
      <label>Total Amount:</label>
      <input
        type="number"
        name="totalAmount"
        value={totalAmount}
        onChange={(event) => setTotalAmount(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InvoiceLineForm