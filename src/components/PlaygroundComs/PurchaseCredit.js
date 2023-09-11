import React from 'react'
import { Card, List, ListItem, Title , Icon } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";




function PurchaseCredit({invoices}) {
  return (
    <Card className="max-w-xs">
            <div className="flex  space-x-0 ">

    <Title>Purchase Credits</Title>
    <Icon
                          icon={InformationCircleIcon}
                          variant="simple"
                          tooltip="Purchase Credit"
                        />
                      </div>
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