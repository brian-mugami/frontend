import React from 'react'
import { Card, List, ListItem, Title } from "@tremor/react";



function PurchaseCredit({invoices}) {
  return (
    <Card className="max-w-xs">
    <Title>Purchase Credits</Title>
    <List>
      {invoices.map((invoice) => (
        <ListItem key={invoice.supplier_name}>
          <span>{invoice.supplier_name}</span>
          <span>{invoice.total_balance.toLocaleString()}</span>
        </ListItem>
      ))}
    </List>
  </Card>
  )
}

export default PurchaseCredit