import React from "react";
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";
import { Card, List, ListItem, Title } from "@tremor/react";

function Item({ item }) {
  const {token} = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <React.Fragment>
      <Card>
        <Title level={3}>Item Details</Title>
        <List>
          <ListItem>
            <strong>Item name:</strong> {item.item_name}
          </ListItem>
          <ListItem>
            <strong>Item number:</strong> {item.item_number}
          </ListItem>
          <ListItem>
            <strong>Item category:</strong> {item.category.name}
          </ListItem>
          <ListItem>
            <strong>Item price:</strong> {item.price}
          </ListItem>
          <ListItem>
            <strong>Item Unit:</strong> {item.item_unit}
          </ListItem>
          <ListItem>
            <strong>Item Unit Type:</strong> {item.unit_type}
          </ListItem>
          <ListItem>
            <strong>Item Creation Date:</strong> {item.date_created}
          </ListItem>
          <ListItem>
            <strong>Is Item Active:</strong>{" "}
            {item.is_active ? "Active" : "Inactive"}
          </ListItem>
          </List>
      {token && (
          <div className="space-x-5">
        
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
        </div>
        
        )}
      </Card>
    </React.Fragment>
  );
}

export default Item;
