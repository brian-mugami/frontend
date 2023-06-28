import React from 'react'
import { Card, List, ListItem, Title } from "@tremor/react";



function SalesCredit( {receipts}) {
  return (
    <Card className="max-w-xs">
    <Title>Sales credit</Title>
    <List>
      {receipts.map((receipt) => (
        <ListItem key={receipt.customer_name}>
          <span>{receipt.customer_name}</span>
          <span>{receipt.total_balance}</span>
        </ListItem>
      ))}
    </List>
  </Card>
  )
}

export default SalesCredit