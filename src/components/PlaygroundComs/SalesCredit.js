import React from 'react'
import { Card, Icon, List, ListItem, Title } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";




function SalesCredit( {receipts}) {
  return (
    <Card className="max-w-xs">
      <div className="flex  space-x-0 ">
        <Title>Sales credit</Title>
                        <Icon
                          icon={InformationCircleIcon}
                          variant="simple"
                          tooltip="Sales Credit"
                        />
                      </div>
    <List>
      {receipts.map((receipt) => (
        <ListItem key={receipt.customer_name}>
          <span>{receipt.customer_name}</span>
          <span>{receipt.total_balance.toLocaleString()}</span>
        </ListItem>
      ))}
    </List>
  </Card>
  )
}

export default SalesCredit