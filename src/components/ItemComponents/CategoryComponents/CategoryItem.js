import React from "react";
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";
import { Card, List, ListItem, Title } from "@tremor/react";

function CategoryItem({ category }) {
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
        <Title level={3}>Category Details</Title>
        <List>
          <ListItem>
            <strong>Category name:</strong> {category.name}
          </ListItem>
          <ListItem>
            <strong>Category account:</strong>{" "}
            {category.account.account_name} - {category.account.account_number}
          </ListItem>
        </List>
      {/*<p>Items in category:</p>
      <ul>
      {category.items.map((item) => (
        <ListItem key={item.id}>{item.item_name}</ListItem>
        ))}
      </ul>*/}
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

export default CategoryItem;
