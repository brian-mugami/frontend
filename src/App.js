import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthentificationPage, {
  action as AuthAction,
} from "./pages/UserPages/AuthentificationPage";

import ErrorPage from "./pages/UserPages/Error";
import HomePage from "./pages/UserPages/Home";
import RootLayout from "./pages/UserPages/Root";
import UsersPage, {loader as UsersLoader } from "./pages/UserPages/Users";
import UserDetailPage, {
  loader as UserDetailLoader,
  action as DeleteAction,
} from "./pages/UserPages/UserDetailPage";
import {tokenLoader } from "./util/Auth";
import EditUserPage from "./pages/UserPages/EditUser";
import { action as UserManipulateAction } from "./components/UserComponents/UserForm";
import { action as LogoutAction } from "./pages/UserPages/Logout";
import AccountRoot from "./pages/AccountPages/AccountsRoot";
import SupplierAccountsPage, {
  loader as supplieraccountsLoader,
} from "./pages/SupplierPages/SupplierAccounts/SupplierAccountPage";
import CustomerAccountsPage, {
  loader as customeraccountsloader,
} from "./pages/CustomerPages/CustomerAccountPages/CustomeraccountPage";
import ItemAccountsPage, {
  loader as itemaccountsloader,
} from "./pages/ItemPages/CategoryAccounts/CategoryAccountPage";
import AllAccountRoot from "./pages/AccountPages/SubAccountRoot";
import NewSupplierAccountPage from "./pages/SupplierPages/SupplierAccounts/NewSupplierAccount";
import NewCustomerAccountPage from "./pages/CustomerPages/CustomerAccountPages/NewCustomerAccount";
import NewItemAccountPage from "./pages/ItemPages/CategoryAccounts/NewCategoryAccount";
import {action as SupplierAccountAction} from "./components/Accountcomponents/SupplierAccountsForm"
import {action as CreateItemAccountAction} from './components/Accountcomponents/ItemaccountForm'
import {action as CreateCustomerAccountAction} from './components/Accountcomponents/Customeraccountform'
import SupplierAccountDetailPage, {loader as supplierAccountLoader} from "./pages/SupplierPages/SupplierAccounts/SupplierAccountDetailPage";
import EditSupplierAccountPage from "./pages/SupplierPages/SupplierAccounts/EditSupplierAccountPage";
import {action as deleteaccountaction} from "./pages/SupplierPages/SupplierAccounts/SupplierAccountDetailPage"
import {action as deletecustomeraccount} from "./pages/CustomerPages/CustomerAccountPages/CustomerAccountDetailPage"
import CustomerAccountDetailPage, {loader as customerAccountLoader} from "./pages/CustomerPages/CustomerAccountPages/CustomerAccountDetailPage";
import EditCustomerAccountPage from "./pages/CustomerPages/CustomerAccountPages/EditCustomerAccountPage";
import CategoryAccountDetailPage , {loader as categoryAccountLoader}from "./pages/ItemPages/CategoryAccounts/CategoryAccountDetailPage";
import EditCategoryAccountPage from "./pages/ItemPages/CategoryAccounts/EditCategoryAccountPage";
import {action as deletecategoryaction} from "./pages/ItemPages/CategoryAccounts/CategoryAccountDetailPage"
import LotRoot from "./pages/ItemPages/Lots/LotRoot";
import LotPage, {loader as lotLoader} from "./pages/ItemPages/Lots/LotPage";
import NewLotPage from "./pages/ItemPages/Lots/NewLotPage";
import {action as LotManipulateAction} from "./components/ItemComponents/LotForm"
import LotDetailPage, {action as LotDeleteAction} from "./pages/ItemPages/Lots/LotDetailPage";
import LotEditPage from "./pages/ItemPages/Lots/LotEditPage";
import {loader as LotDetailLoader} from "./pages/ItemPages/Lots/LotDetailPage"
import CategoryRoot from "./pages/ItemPages/Categories/CategoryRoot";
import CategoriesPage, {loader as CategoriesLoader} from "./pages/ItemPages/Categories/AllCategories";
import CreateCategoryPage, {loader as AccountsCategoryLoader} from "./pages/ItemPages/Categories/NewCategoryPage";
import {action as CategoryManipulateaction} from "./components/ItemComponents/CategoryForm"
import CategoryDetailPage, {loader as CategoryLoader} from "./pages/ItemPages/Categories/CategoryDetailPage";
import {action as DeleteCatItemAction} from "./pages/ItemPages/Categories/CategoryDetailPage"
import CategoryEditPage, {loader as CategoryEditLoader} from "./pages/ItemPages/Categories/CategoryEditPage";

const router = createBrowserRouter([
  {
    path: "/",
    loader: tokenLoader,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthentificationPage />,
        action: AuthAction,
      },
      {
        path: "logout",
        action: LogoutAction,
      },
      {
        path: "account",
        element: <AccountRoot />,
        children: [
          {
            path: "supplier",
            element: <AllAccountRoot/>,
            loader: supplieraccountsLoader,
            id: "supplier",
            children:[
              {index: true, element:<SupplierAccountsPage />},
              {path: "new", element: <NewSupplierAccountPage/>, action: SupplierAccountAction},
              {path: ":id", id: "supplier-detail", loader: supplierAccountLoader, children: [
                {index: true, element:<SupplierAccountDetailPage/>, action: deleteaccountaction},
                {path:"edit", element:<EditSupplierAccountPage/>, action: SupplierAccountAction}
              ]}
            ]
          },
          {
            path: "customer",
            element: <AllAccountRoot />,
            loader: customeraccountsloader,
            id:"customer",
            children:[
              {index: true, element:<CustomerAccountsPage />},
              {path: "new", element: <NewCustomerAccountPage/>, action: CreateCustomerAccountAction},
              {path: ":id", id: "customer-detail", loader:customerAccountLoader, children: [
                {index: true, element:<CustomerAccountDetailPage/>, action: deletecustomeraccount},
                {path:"edit", element:<EditCustomerAccountPage/>, action: CreateCustomerAccountAction}
              ]}
            ]
          },
          {
            path: "item",
            element: <AllAccountRoot />,
            loader: itemaccountsloader,
            id:"item",
            children:[
              {index: true, element:<ItemAccountsPage/>},
              {path: "new", element: <NewItemAccountPage/>, action: CreateItemAccountAction},
              {path: ":id", id: "item-detail", loader: categoryAccountLoader, children: [
                {index: true, element:<CategoryAccountDetailPage/>, action: deletecategoryaction},
                {path:"edit", element:<EditCategoryAccountPage/>, action: CreateItemAccountAction}
              ]}
            ]
          },
        ],
      },
      {
        path:"category",
        element:<CategoryRoot/>,
        loader:CategoriesLoader,
        id:"category",
        children:[
          {index: true, element:<CategoriesPage/>},
          {path:"new", element:<CreateCategoryPage/>,action:CategoryManipulateaction, loader:AccountsCategoryLoader},
          {path:":id", id:"category-detail", loader:CategoryLoader, children:[
            {index: true, element: <CategoryDetailPage/>, action:DeleteCatItemAction},
            {path:"edit", element: <CategoryEditPage/>, action:CategoryManipulateaction,loader:AccountsCategoryLoader}
          ]}
        ]
      },
      {
        path: "lot",
        element: <LotRoot/>,
        loader:lotLoader,
        id:"lot",
        children:[
          {index: true, element: <LotPage/>},
          {path:"new", element: <NewLotPage/>, action:LotManipulateAction},
          {path:":id", id:"lot-detail", loader: LotDetailLoader, children:[
            {index:true, element:<LotDetailPage/>, action:LotDeleteAction},
            {path:"edit", element:<LotEditPage/>, action:LotManipulateAction}
          ]}
        ]
      },{
        path:"customer",
        element:test,
        loader:test,
        id:test,
        children:[
          {index:true, element:test}
        ]
      },
      {path: "user",
        children: [
          { index: true, element: <UsersPage />, loader: UsersLoader },
          {
            path: ":userId",
            id: "user-detail",
            loader: UserDetailLoader,
            children: [
              {
                index: true,
                element: <UserDetailPage />,
                action: DeleteAction,
              },
              {
                path: "edit",
                element: <EditUserPage />,
                action: UserManipulateAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
