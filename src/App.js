import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthentificationPage, {
  action as AuthAction,
} from "./pages/UserPages/AuthentificationPage";
import ErrorPage from "./pages/UserPages/Error";
import HomePage from "./pages/UserPages/Home";
import RootLayout from "./pages/UserPages/Root";
import UsersPage, { loader as UsersLoader } from "./pages/UserPages/Users";
import UserDetailPage, {
  loader as UserDetailLoader,
  action as DeleteAction,
} from "./pages/UserPages/UserDetailPage";
import { tokenLoader } from "./util/Auth";
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
import { action as SupplierAccountAction } from "./components/Accountcomponents/SupplierAccountsForm";
import { action as CreateItemAccountAction } from "./components/Accountcomponents/ItemaccountForm";
import { action as CreateCustomerAccountAction } from "./components/Accountcomponents/Customeraccountform";
import SupplierAccountDetailPage, {
  loader as supplierAccountLoader,
} from "./pages/SupplierPages/SupplierAccounts/SupplierAccountDetailPage";
import EditSupplierAccountPage from "./pages/SupplierPages/SupplierAccounts/EditSupplierAccountPage";
import { action as deleteaccountaction } from "./pages/SupplierPages/SupplierAccounts/SupplierAccountDetailPage";
import { action as deletecustomeraccount } from "./pages/CustomerPages/CustomerAccountPages/CustomerAccountDetailPage";
import CustomerAccountDetailPage, {
  loader as customerAccountLoader,
} from "./pages/CustomerPages/CustomerAccountPages/CustomerAccountDetailPage";
import EditCustomerAccountPage from "./pages/CustomerPages/CustomerAccountPages/EditCustomerAccountPage";
import CategoryAccountDetailPage, {
  loader as categoryAccountLoader,
} from "./pages/ItemPages/CategoryAccounts/CategoryAccountDetailPage";
import EditCategoryAccountPage from "./pages/ItemPages/CategoryAccounts/EditCategoryAccountPage";
import { action as deletecategoryaction } from "./pages/ItemPages/CategoryAccounts/CategoryAccountDetailPage";
import LotRoot from "./pages/ItemPages/Lots/LotRoot";
import LotPage, { loader as lotLoader } from "./pages/ItemPages/Lots/LotPage";
import NewLotPage from "./pages/ItemPages/Lots/NewLotPage";
import { action as LotManipulateAction } from "./components/ItemComponents/LotComponents/LotForm";
import LotDetailPage, {
  action as LotDeleteAction,
} from "./pages/ItemPages/Lots/LotDetailPage";
import LotEditPage from "./pages/ItemPages/Lots/LotEditPage";
import { loader as LotDetailLoader } from "./pages/ItemPages/Lots/LotDetailPage";
import CategoryRoot from "./pages/ItemPages/Categories/CategoryRoot";
import CategoriesPage, {
  loader as CategoriesLoader,
} from "./pages/ItemPages/Categories/AllCategories";
import CreateCategoryPage, {
  loader as AccountsCategoryLoader,
} from "./pages/ItemPages/Categories/NewCategoryPage";
import { action as CategoryManipulateaction } from "./components/ItemComponents/CategoryComponents/CategoryForm";
import CategoryDetailPage, {  loader as CategoryLoader,} from "./pages/ItemPages/Categories/CategoryDetailPage";
import { action as DeleteCatItemAction } from "./pages/ItemPages/Categories/CategoryDetailPage";
import CategoryEditPage from "./pages/ItemPages/Categories/CategoryEditPage";
import ItemsRoot from "./pages/ItemPages/ItemSAllRootNav";
import ItemRoot from "./pages/ItemPages/Items/ItemRoot";
import AllItemsPage, {
  loader as AllItemsLoader,
} from "./pages/ItemPages/Items/AllItems";
import NewItemPage, {
  loader as ItemCategoryLoader,
} from "./pages/ItemPages/Items/NewItemPage";
import { action as ItemManipulateAction } from "./components/ItemComponents/ItemsComponents/ItemsForm";
import ItemDetailPage, {
  loader as ItemDetaiLoader,
  action as ItemDeleteAction,
} from "./pages/ItemPages/Items/ItemDetailPage";
import ItemEditPage, {
  loader as ItemCategoryDetailLodaer,
} from "./pages/ItemPages/Items/ItemEditPage";
import CustomerRoot from "./pages/CustomerPages/CustomerMaster/CustomerRoot";
import CustomersPage, {
  loader as CustomersAllLoader,
} from "./pages/CustomerPages/CustomerMaster/AllCustomerPage";
import NewCustomerPage, {
  loader as CustomerAccountsAllLoader,
} from "./pages/CustomerPages/CustomerMaster/NewCustomerPage";
import { action as CustomerManipulateAction } from "./components/CustomerComponents/CustomerForm";
import CustomerDetailPage, {
  loader as CusAccountsLoader,
  action as CusDeleteAction,
} from "./pages/CustomerPages/CustomerMaster/CustomerDetails";
import CustomerEditPage, {
  loader as CusAccountMiniLoader,
} from "./pages/CustomerPages/CustomerMaster/CustomerEditPage";
import SupplierRoot from "./pages/SupplierPages/SupplierMasterPages/SupplierRoot";
import SupplierPage, {
  loader as allSuppliersLoader,
} from "./pages/SupplierPages/SupplierMasterPages/AllsupplierPage";
import NewSupplierPage, {
  loader as allSupplierAccountsLoader,
} from "./pages/SupplierPages/SupplierMasterPages/NewSupplierPage";
import { action as SupplierManipulateAction } from "./components/SupplierComponents/SupplierForm";
import SupplierEditPage, {
  loader as supAccountLoader,
} from "./pages/SupplierPages/SupplierMasterPages/SupplierEditPage";
import SupplierDetailPage, {
  action as supDeleteAction,
  loader as supaccLoader,
} from "./pages/SupplierPages/SupplierMasterPages/SupplierDetailPage";
import Dashboard from "./pages/UserPages/Dashboard";
import { countLoader } from "./components/DashboardComps";
import ConfirmationPage from "./pages/UserPages/ConfirmationPage";
import PasswordPage, {
  action as PasswordChangeAction,
} from "./pages/UserPages/PasswordResetPage";
import PaymentAccountsPage, {
  loader as PaymentsAccountsLoader,
} from "./pages/PaymentAccountPages/AllPayAccountsPage";
import NewPaymentAccountPage from "./pages/PaymentAccountPages/NewPaymentAccountPage";
import { action as PaymentAccountAction } from "./components/Accountcomponents/PaymentAccountForm";
import PaymentAccountDetailPage, {
  action as PaymentAccountDeleteAction,
  loader as PaymentAccountdetailLoader,
} from "./pages/PaymentAccountPages/PayAccountdetailPage";
import EditPaymentAccountPage from "./pages/PaymentAccountPages/EditPayAccountPage";
import PurchaseAccountsPage, {
  loader as PurchaseAccountsLoader,
} from "./pages/PurchaseAccountPages/AllPurchaseAccountsPage";
import NewPurchaseAccountPage from "./pages/PurchaseAccountPages/NewPurchaseAccountPage";
import { action as PurchaseAccountAction } from "./components/Accountcomponents/PurchaseAccountform";
import PurchaseAccountDetailPage, {
  action as PurchaseAccountDeleteAction,
  loader as PurchaseAccountdetailLoader,
} from "./pages/PurchaseAccountPages/PurchaseAccountdetailPage";
import EditPurchaseAccountPage from "./pages/PurchaseAccountPages/EditPurchaseAccountPage";
import PurchaseRootPage from "./pages/InvoicePages/PurchasingRoot";
import SalesRootNav from "./pages/ReceiptPages/SalesRoot";
import SalesAccountsPage, {loader as AllSalesAccountLoader} from "./pages/SaleAccountPages/AllSalesaccountPage";
import NewSalesAccountPage from "./pages/SaleAccountPages/NewSaleAccountPage";
import SalesAccountDetailPage, {loader as SaleAccountLoader, action as DeleteSaleAccountAction} from "./pages/SaleAccountPages/SalesAccountDetailPage";
import EditSalesAccountPage from "./pages/SaleAccountPages/EditSaleaccountPage";
import {action as SalesAccountAction} from "./components/Accountcomponents/SaleAccountForm"
import ExpenseAccountsPage, {loader as AllExpenseAccountLoader} from "./pages/ExpenseAccountPages/AllExpenseAccountPages";
import NewExpenseAccountPage from "./pages/ExpenseAccountPages/NewExpenseAccountPage";
import ExpenseAccountDetailPage, {action as ExpenseaccountdeleteAction, loader as ExpenseAccountLoader} from "./pages/ExpenseAccountPages/ExpenseAccountdetailPage";
import EditExpenseAccountPage from "./pages/ExpenseAccountPages/EditExpenseaccountPage";
import {action as ExpenseAccountManipulateaction} from "./components/Accountcomponents/ExpenseAccountForm"
import AllInvoicePage, {loader as invoicesLoader} from "./pages/InvoicePages/AllInvoicePage";
import NewInvoicePage from "./pages/InvoicePages/NewInvoicePage";
import {action as InvoiceManipulateAction,Loader as invoiceSupplierLoader} from "./components/InvoiceComponents/InvoiceForm"
import InvoiceDetailPage, {loader as invoiceLoader, action as deleteInvoiceAction} from "./pages/InvoicePages/InvoiceDetailPage";
import InvoiceEditPage from "./pages/InvoicePages/EditInvoicePage";
import ReceiptEditPage from "./pages/ReceiptPages/EditReceiptPage";
import AllReceiptsPage, {loader as ReceiptsLoader} from "./pages/ReceiptPages/AllReceiptPage";
import NewReceiptPage from "./pages/ReceiptPages/NewReceiptPage";
import ReceiptDetailPage, {loader as ReceiptLoader, action as ReceiptDeleteAction} from "./pages/ReceiptPages/ReceiptDetailPage";
import {action as ReceiptManipulateAction, Loader as ReceiptCustomerLoader} from "./components/ReceiptComponents/ReceiptForm"
import InvoiceLineForm from "./components/InvoiceComponents/InvoiceLineForm";

const router = createBrowserRouter([
  {
    path: "/",
    loader: tokenLoader,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      {
        path:"inv-line",
        element:<InvoiceLineForm/>
      },
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
        path: "Confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "logout",
        action: LogoutAction,
      },
      {
        path: "reset",
        element: <PasswordPage />,
        action: PasswordChangeAction,
      },
      {
        path: "/home",
        element: <Dashboard />,
        loader: countLoader,
      },
      {
        path: "account",
        element: <AccountRoot />,
        children: [
          {
            path: "supplier",
            element: <AllAccountRoot />,
            loader: supplieraccountsLoader,
            id: "supplier",
            children: [
              { index: true, element: <SupplierAccountsPage /> },
              {
                path: "new",
                element: <NewSupplierAccountPage />,
                action: SupplierAccountAction,
              },
              {
                path: ":id",
                id: "supplier-detail",
                loader: supplierAccountLoader,
                children: [
                  {
                    index: true,
                    element: <SupplierAccountDetailPage />,
                    action: deleteaccountaction,
                  },
                  {
                    path: "edit",
                    element: <EditSupplierAccountPage />,
                    action: SupplierAccountAction,
                  },
                ],
              },
            ],
          },
          {
            path: "purchase",
            element: <AllAccountRoot />,
            loader: PurchaseAccountsLoader,
            id: "purchase-accounts",
            children: [
              { index: true, element: <PurchaseAccountsPage /> },
              {
                path: "new",
                element: <NewPurchaseAccountPage />,
                action: PurchaseAccountAction,
              },
              {
                path: ":id",
                id: "purchase-account-detail",
                loader: PurchaseAccountdetailLoader,
                children: [
                  {
                    index: true,
                    element: <PurchaseAccountDetailPage />,
                    action: PurchaseAccountDeleteAction,
                  },
                  {
                    path: "edit",
                    element: <EditPurchaseAccountPage />,
                    action: PurchaseAccountAction,
                  },
                ],
              },
            ],
          },
          {
            path: "payment",
            element: <AllAccountRoot />,
            loader: PaymentsAccountsLoader,
            id: "payment-accounts",
            children: [
              { index: true, element: <PaymentAccountsPage /> },
              {
                path: "new",
                element: <NewPaymentAccountPage />,
                action: PaymentAccountAction,
              },
              {
                path: ":id",
                id: "payment-account-detail",
                loader: PaymentAccountdetailLoader,
                children: [
                  {
                    index: true,
                    element: <PaymentAccountDetailPage />,
                    action: PaymentAccountDeleteAction,
                  },
                  {
                    path: "edit",
                    element: <EditPaymentAccountPage />,
                    action: PaymentAccountAction,
                  },
                ],
              },
            ],
          },{
            path: "sales",
            element: <AllAccountRoot />,
            loader: AllSalesAccountLoader,
            id: "sales-accounts",
            children: [
              { index: true, element: <SalesAccountsPage/> },
              {
                path: "new",
                element: <NewSalesAccountPage/>,
                action: SalesAccountAction,
              },
              {
                path: ":id",
                id: "sales-account-detail",
                loader: SaleAccountLoader,
                children: [
                  {
                    index: true,
                    element: <SalesAccountDetailPage/>,
                    action: DeleteSaleAccountAction,
                  },
                  {
                    path: "edit",
                    element: <EditSalesAccountPage/>,
                    action: SalesAccountAction,
                  },
                ],
              },
            ],
          },{
            path: "expense",
            element: <AllAccountRoot />,
            loader: AllExpenseAccountLoader,
            id: "expense-accounts",
            children: [
              { index: true, element: <ExpenseAccountsPage/> },
              {
                path: "new",
                element: <NewExpenseAccountPage/>,
                action: ExpenseAccountManipulateaction,
              },
              {
                path: ":id",
                id: "expense-account-detail",
                loader: ExpenseAccountLoader,
                children: [
                  {
                    index: true,
                    element: <ExpenseAccountDetailPage/>,
                    action: ExpenseaccountdeleteAction,
                  },
                  {
                    path: "edit",
                    element: <EditExpenseAccountPage/>,
                    action: ExpenseAccountManipulateaction,
                  },
                ],
              },
            ],

          },
          {
            path: "customer",
            element: <AllAccountRoot />,
            loader: customeraccountsloader,
            id: "customer",
            children: [
              { index: true, element: <CustomerAccountsPage /> },
              {
                path: "new",
                element: <NewCustomerAccountPage />,
                action: CreateCustomerAccountAction,
              },
              {
                path: ":id",
                id: "customer-detail",
                loader: customerAccountLoader,
                children: [
                  {
                    index: true,
                    element: <CustomerAccountDetailPage />,
                    action: deletecustomeraccount,
                  },
                  {
                    path: "edit",
                    element: <EditCustomerAccountPage />,
                    action: CreateCustomerAccountAction,
                  },
                ],
              },
            ],
          },
          {
            path: "item",
            element: <AllAccountRoot />,
            loader: itemaccountsloader,
            id: "item",
            children: [
              { index: true, element: <ItemAccountsPage /> },
              {
                path: "new",
                element: <NewItemAccountPage />,
                action: CreateItemAccountAction,
              },
              {
                path: ":id",
                id: "item-detail",
                loader: categoryAccountLoader,
                children: [
                  {
                    index: true,
                    element: <CategoryAccountDetailPage />,
                    action: deletecategoryaction,
                  },
                  {
                    path: "edit",
                    element: <EditCategoryAccountPage />,
                    action: CreateItemAccountAction,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "item",
        element: <ItemsRoot />,
        children: [
          {
            path: "category",
            element: <CategoryRoot />,
            loader: CategoriesLoader,
            id: "category",
            children: [
              { index: true, element: <CategoriesPage /> },
              {
                path: "new",
                element: <CreateCategoryPage />,
                action: CategoryManipulateaction,
                loader: AccountsCategoryLoader,
              },
              {
                path: ":id",
                id: "category-detail",
                loader: CategoryLoader,
                children: [
                  {
                    index: true,
                    element: <CategoryDetailPage />,
                    action: DeleteCatItemAction,
                  },
                  {
                    path: "edit",
                    element: <CategoryEditPage />,
                    action: CategoryManipulateaction,
                    loader: AccountsCategoryLoader,
                  },
                ],
              },
            ],
          },
          {
            path: "lot",
            element: <LotRoot />,
            loader: lotLoader,
            id: "lot",
            children: [
              { index: true, element: <LotPage /> },
              {
                path: "new",
                element: <NewLotPage />,
                action: LotManipulateAction,
              },
              {
                path: ":id",
                id: "lot-detail",
                loader: LotDetailLoader,
                children: [
                  {
                    index: true,
                    element: <LotDetailPage />,
                    action: LotDeleteAction,
                  },
                  {
                    path: "edit",
                    element: <LotEditPage />,
                    action: LotManipulateAction,
                  },
                ],
              },
            ],
          },
          {
            path: "main",
            element: <ItemRoot />,
            loader: AllItemsLoader,
            id: "items",
            children: [
              { index: true, element: <AllItemsPage /> },
              {
                path: "new",
                element: <NewItemPage />,
                loader: ItemCategoryLoader,
                action: ItemManipulateAction,
              },
              {
                path: ":id",
                loader: ItemDetaiLoader,
                id: "item-main",
                children: [
                  {
                    index: true,
                    element: <ItemDetailPage />,
                    action: ItemDeleteAction,
                  },
                  {
                    path: "edit",
                    element: <ItemEditPage />,
                    action: ItemManipulateAction,
                    loader: ItemCategoryDetailLodaer,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "customer",
        element: <CustomerRoot />,
        loader: CustomersAllLoader,
        id: "customers",
        children: [
          { index: true, element: <CustomersPage /> },
          {
            path: "new",
            element: <NewCustomerPage />,
            loader: CustomerAccountsAllLoader,
            action: CustomerManipulateAction,
          },
          {
            path: ":id",
            id: "customers-detail",
            loader: CusAccountsLoader,
            children: [
              {
                index: true,
                element: <CustomerDetailPage />,
                action: CusDeleteAction,
              },
              {
                path: "edit",
                element: <CustomerEditPage />,
                action: CustomerManipulateAction,
                loader: CusAccountMiniLoader,
              },
            ],
          },
        ],
      },
      {
        path: "invoice",
        element: <PurchaseRootPage/>,
        loader: invoicesLoader,
        id: "invoices",
        children:[
          {index: true, element: <AllInvoicePage/>},
          {path: "new", element: <NewInvoicePage/>, loader: invoiceSupplierLoader, action: InvoiceManipulateAction},
          {path: ":id", id: "invoice-detail", loader: invoiceLoader, children: [
            {index: true, element: <InvoiceDetailPage/>, action: deleteInvoiceAction},
            {path: "edit", element: <InvoiceEditPage/>, action:InvoiceManipulateAction, loader: invoiceSupplierLoader}
          ]}
        ]
      },{
        path: "receipt",
        element:<SalesRootNav/>,
        loader: ReceiptsLoader,
        id: "receipts",
        children:[
          {index: true, element: <AllReceiptsPage/>},
          {path: "new", element: <NewReceiptPage/>, loader: ReceiptCustomerLoader, action: ReceiptManipulateAction},
          {path: ":id", id: "receipt-detail", loader: ReceiptLoader, children: [
            {index: true, element: <ReceiptDetailPage/>, action: ReceiptDeleteAction},
            {path: "edit", element: <ReceiptEditPage/>, loader: ReceiptCustomerLoader,action: ReceiptManipulateAction}
          ]}
        ]
      },
      {
        path: "supplier",
        element: <SupplierRoot />,
        loader: allSuppliersLoader,
        id: "suppliers",
        children: [
          { index: true, element: <SupplierPage /> },
          {
            path: "new",
            element: <NewSupplierPage />,
            loader: allSupplierAccountsLoader,
            action: SupplierManipulateAction,
          },
          {
            path: ":id",
            id: "suppliers-detail",
            loader: supaccLoader,
            children: [
              {
                index: true,
                element: <SupplierDetailPage />,
                action: supDeleteAction,
              },
              {
                path: "edit",
                element: <SupplierEditPage />,
                action: SupplierManipulateAction,
                loader: supAccountLoader,
              },
            ],
          },
        ],
      },
      ,
      {
        path: "user",
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
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
