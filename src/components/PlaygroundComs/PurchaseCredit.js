import React from 'react'
import { Card, List, ListItem, Title } from "@tremor/react";



function PurchaseCredit({invoices}) {
  return (
    <Card className="max-w-xs">
    <Title>Purchase Credits</Title>
    <List>
      {invoices.map((invoice) => (
        <ListItem key={invoice.city}>
          <span>{invoice.city}</span>
          <span>{invoice.rating}</span>
        </ListItem>
      ))}
    </List>
  </Card>
  )
}

export default PurchaseCredit