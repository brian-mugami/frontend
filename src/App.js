import React, { lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage, {
  action as AuthAction,
} from "./pages/UserPages/AuthenticationPage";
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
  loader as SupplierAccountsLoader,
} from "./pages/SupplierPages/SupplierAccounts/SupplierAccountPage";
import CustomerAccountsPage, {
  loader as CustomerAccountsLoader,
} from "./pages/CustomerPages/CustomerAccountPages/CustomerAccountPage";
import ItemAccountsPage, {
  loader as ItemAccountsLoader,
} from "./pages/ItemPages/CategoryAccounts/CategoryAccountPage";
import NewSupplierAccountPage from "./pages/SupplierPages/SupplierAccounts/NewSupplierAccount";
import NewCustomerAccountPage from "./pages/CustomerPages/CustomerAccountPages/NewCustomerAccount";
import NewItemAccountPage from "./pages/ItemPages/CategoryAccounts/NewCategoryAccount";
import { action as SupplierAccountAction } from "./components/AccountComponents/SupplierAccountsForm";
import { action as CreateItemAccountAction } from "./components/AccountComponents/ItemAccountForm";
import { action as CreateCustomerAccountAction } from "./components/AccountComponents/CustomerAccountForm";
import SupplierAccountDetailPage, {
  loader as supplierAccountLoader,
} from "./pages/SupplierPages/SupplierAccounts/SupplierAccountDetailPage";
import EditSupplierAccountPage from "./pages/SupplierPages/SupplierAccounts/EditSupplierAccountPage";
import { action as DeleteAccountAction } from "./pages/SupplierPages/SupplierAccounts/SupplierAccountDetailPage";
import { action as DeleteCustomerAccount } from "./pages/CustomerPages/CustomerAccountPages/CustomerAccountDetailPage";
import CustomerAccountDetailPage, {
  loader as customerAccountLoader,
} from "./pages/CustomerPages/CustomerAccountPages/CustomerAccountDetailPage";
import EditCustomerAccountPage from "./pages/CustomerPages/CustomerAccountPages/EditCustomerAccountPage";
import CategoryAccountDetailPage, {
  loader as categoryAccountLoader,
} from "./pages/ItemPages/CategoryAccounts/CategoryAccountDetailPage";
import EditCategoryAccountPage from "./pages/ItemPages/CategoryAccounts/EditCategoryAccountPage";
import { action as DeleteCategoryAction } from "./pages/ItemPages/CategoryAccounts/CategoryAccountDetailPage";
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
import { action as CategoryManipulateAction } from "./components/ItemComponents/CategoryComponents/CategoryForm";
import CategoryDetailPage, {
  loader as CategoryLoader,
} from "./pages/ItemPages/Categories/CategoryDetailPage";
import { action as DeleteCatItemAction } from "./pages/ItemPages/Categories/CategoryDetailPage";
import AllItemsPage, {
  loader as AllItemsLoader,
} from "./pages/ItemPages/Items/AllItems";
import NewItemPage, {
  loader as ItemCategoryLoader,
} from "./pages/ItemPages/Items/NewItemPage";
import { action as ItemManipulateAction } from "./components/ItemComponents/ItemsComponents/ItemsForm";
import ItemDetailPage, {
  loader as ItemDetailLoader,
  action as ItemDeleteAction,
} from "./pages/ItemPages/Items/ItemDetailPage";
import ItemEditPage, {
  loader as ItemCategoryDetailLoader,
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
} from "./pages/SupplierPages/SupplierMasterPages/AllSupplierPage";
import NewSupplierPage, {
  loader as allSupplierAccountsLoader,
} from "./pages/SupplierPages/SupplierMasterPages/NewSupplierPage";
import { action as SupplierManipulateAction } from "./components/SupplierComponents/SupplierForm";
import SupplierEditPage, {
  loader as supAccountLoader,
} from "./pages/SupplierPages/SupplierMasterPages/SupplierEditPage";
import SupplierDetailPage, {
  action as supDeleteAction,
  loader as SupAccLoader,
} from "./pages/SupplierPages/SupplierMasterPages/SupplierDetailPage";
import Dashboard from "./pages/UserPages/Dashboard";
import { dashboardLoader } from "./components/DashboardComps";
import ConfirmationPage from "./pages/UserPages/ConfirmationPage";
import PasswordPage, {
  action as PasswordChangeAction,
} from "./pages/UserPages/PasswordResetPage";
import PaymentAccountsPage, {
  loader as PaymentsAccountsLoader,
} from "./pages/BankAccountPages/AllPayAccountsPage";
import NewPaymentAccountPage from "./pages/BankAccountPages/NewPaymentAccountPage";
import { action as PaymentAccountAction } from "./components/AccountComponents/BankAccountForm";
import PaymentAccountDetailPage, {
  action as PaymentAccountDeleteAction,
  loader as PaymentAccountDetailLoader,
} from "./pages/BankAccountPages/PayAccountDetailPage";
import EditPaymentAccountPage from "./pages/BankAccountPages/EditPayAccountPage";
import PurchaseAccountsPage, {
  loader as PurchaseAccountsLoader,
} from "./pages/PurchaseAccountPages/AllPurchaseAccountsPage";
import NewPurchaseAccountPage from "./pages/PurchaseAccountPages/NewPurchaseAccountPage";
import { action as PurchaseAccountAction } from "./components/AccountComponents/PurchaseAccountForm";
import PurchaseAccountDetailPage, {
  action as PurchaseAccountDeleteAction,
  loader as PurchaseAccountDetailLoader,
} from "./pages/PurchaseAccountPages/PurchaseAccountDetailPage";
import EditPurchaseAccountPage from "./pages/PurchaseAccountPages/EditPurchaseAccountPage";
import PurchaseRootPage from "./pages/InvoicePages/PurchasingRoot";
import SalesRootNav from "./pages/ReceiptPages/SalesRoot";
import SalesAccountsPage, {
  loader as AllSalesAccountLoader,
} from "./pages/SaleAccountPages/AllSalesAccountPage";
import NewSalesAccountPage from "./pages/SaleAccountPages/NewSaleAccountPage";
import SalesAccountDetailPage, {
  loader as SaleAccountLoader,
  action as DeleteSaleAccountAction,
} from "./pages/SaleAccountPages/SalesAccountDetailPage";
import EditSalesAccountPage from "./pages/SaleAccountPages/EditSaleAccountPage";
import { action as SalesAccountAction } from "./components/AccountComponents/SaleAccountForm";
import ExpenseAccountsPage, {
  loader as AllExpenseAccountLoader,
} from "./pages/ExpenseAccountPages/AllExpenseAccountPages";
import NewExpenseAccountPage from "./pages/ExpenseAccountPages/NewExpenseAccountPage";
import ExpenseAccountDetailPage, {
  action as ExpensesAccountDeleteAction,
  loader as ExpenseAccountLoader,
} from "./pages/ExpenseAccountPages/ExpenseAccountDetailPage";
import EditExpenseAccountPage from "./pages/ExpenseAccountPages/EditExpenseAccountPage";
import { action as ExpenseAccountManipulateAction } from "./components/AccountComponents/ExpenseAccountForm";
import AllInvoicePage, {
  loader as invoicesLoader,
} from "./pages/InvoicePages/AllInvoicePage";
import NewInvoicePage from "./pages/InvoicePages/NewInvoicePage";
import {
  action as InvoiceManipulateAction,
  Loader as invoiceSupplierLoader,
} from "./components/InvoiceComponents/InvoiceForm";
import InvoiceDetailPage, {
  loader as invoiceLoader,
  action as deleteInvoiceAction,
} from "./pages/InvoicePages/InvoiceDetailPage";
import InvoiceEditPage from "./pages/InvoicePages/EditInvoicePage";
import ReceiptEditPage from "./pages/ReceiptPages/EditReceiptPage";
import AllReceiptsPage, {
  loader as ReceiptsLoader,
} from "./pages/ReceiptPages/AllReceiptPage";
import NewReceiptPage from "./pages/ReceiptPages/NewReceiptPage";
import ReceiptDetailPage, {
  loader as ReceiptLoader,
  action as ReceiptDeleteAction,
} from "./pages/ReceiptPages/ReceiptDetailPage";
import {
  action as ReceiptManipulateAction,
  Loader as ReceiptCustomerLoader,
} from "./components/ReceiptComponents/ReceiptForm";
import InvoiceAccountingPage from "./pages/InvoicePages/InvoiceAccountingPage";
import { action as InvoiceAccountingAction } from "./components/InvoiceComponents/InvoiceAccountingForm";
import InvoicePaymentPage from "./pages/InvoicePages/InvoicePaymentPage";
import {
  action as InvoicePaymentAction,
  loader as InvoicePaymentLoader,
} from "./components/InvoiceComponents/InvoicePaymentForm";
import SupplierPaymentRoot from "./pages/SupplierPaymentPages/SupplierPaymentRoot";
import AllSupplierPaymentPage, {
  loader as SupplierPaymentsLoader,
} from "./pages/SupplierPaymentPages/AllSupplierPaymentPage";
import SupplierPaymentDetailPage, {
  action as SupplierPaymentDeleteAction,
  loader as SupplierPaymentDetailLoader,
} from "./pages/SupplierPaymentPages/SupplierPaymentDetailPage";
import SupplierPaymentApprovePage from "./pages/SupplierPaymentPages/SupplierPaymentApprovePage";
import { action as SupplierPaymentApproveAction } from "./components/SupplierPaymentComponents/SupplierPaymentApproveForm";
import BalanceRoot from "./pages/InventoryBalancePage/BalanceRoot";
import InventoryBalancesPage, {
  loader as InventoryBalancesLoader,
} from "./pages/InventoryBalancePage/AllInventoryBalances";
import { action as MiscReceiptAction } from "./components/InventoryBalancesComponents/MiscReceiptForm";
import { action as MiscIssueAction } from "./components/InventoryBalancesComponents/MiscIssueForm";
import ViewInvoiceAccountingPage, {
  loader as ViewInvoiceAccountingLoader,
} from "./pages/InvoicePages/ViewInvoiceAccountingPage";
import ViewSupplierPaymentAccountingPage, {
  loader as ViewPaymentAccountingLoader,
} from "./pages/SupplierPaymentPages/ViewSupplierPaymentAccountingPage";

import ReceiptAccountingViewPage, {
  loader as ReceiptAccountingViewLoader,
} from "./pages/ReceiptPages/ReceiptAccountingViewPage";
import ReceiptPaymentPage, {
  action as ReceiptPaymentAction,
  loader as ReceiptPaymentLoader,
} from "./pages/ReceiptPages/ReceiptPaymentPage";

const CategoryEditPage = lazy(() =>
  import("./pages/ItemPages/Categories/CategoryEditPage")
);

const ItemsRoot = lazy(() => import("./pages/ItemPages/ItemsAllRootNav"));

const ItemRoot = lazy(() => import("./pages/ItemPages/Items/ItemRoot"));

const MiscIssuePage = lazy(() =>
  import("./pages/InventoryBalancePage/MiscIssuePage")
);

const MiscReceiptPage = lazy(() =>
  import("./pages/InventoryBalancePage/MiscReceiptPage")
);

const InventoryBalanceSearchPage = lazy(() =>
  import("./pages/InventoryBalancePage/InventoryBalanceSearchPage")
);

const AllCustomerPaymentRoot = lazy(() =>
  import("./pages/CustomerPaymentsPage/AllCustomerPaymentRoot")
);

const ErrorPage = lazy(() => import("./pages/UserPages/Error"));

const HomePage = lazy(() => import("./pages/UserPages/Home"));
const RootLayout = lazy(() => import("./pages/UserPages/Root"));

const BankBalanceRoot = lazy(() =>
  import("./pages/SupplierBalancePages/SupplierBalanceRoot")
);

const CustomerBalanceRoot = lazy(() =>
  import("./pages/CustomerBalancePages/CustomerBalanceRoot")
);

const SupplierBalanceRoot = lazy(() =>
  import("./pages/SupplierBalancePages/SupplierBalanceRoot")
);

const ReceiptPaymentsPage = lazy(() =>
  import("./pages/CustomerPaymentsPage/AllCustomerPayments")
);
const NewReceiptPaymentPage = lazy(() =>
  import("./pages/CustomerPaymentsPage/NewCustomerPaymentPage")
);
const CustomerPaymentDetailPage = lazy(() =>
  import("./pages/CustomerPaymentsPage/CustomerPaymentDetailPage")
);
const CustomerPaymentApprovePage = lazy(() =>
  import("./pages/CustomerPaymentsPage/CustomerPaymentApprovePage")
);
const ViewCustomerPaymentAccountingPage = lazy(() =>
  import("./pages/CustomerPaymentsPage/CustomerPaymentAccountingViewPage")
);
const AllBankBalancesPage = lazy(() =>
  import("./pages/BankBalancePages/AllBankBalancesPage")
);
const AllCustomerBalancesPage = lazy(() =>
  import("./pages/CustomerBalancePages/AllCustomerBalancesPage")
);
const AllSupplierBalancePages = lazy(() =>
  import("./pages/SupplierBalancePages/AllSupplierBalancesPage")
);
const SupplierPaymentRejectPage = lazy(() =>
  import("./pages/SupplierPaymentPages/SupplierPaymentRejectPage")
);

const InvoiceVoidPage = lazy(() =>
  import("./pages/InvoicePages/InvoiceVoidPage")
);

const ReceiptVoidPage = lazy(() =>
  import("./pages/ReceiptPages/ReceiptVoidPage")
);

const AllAccountRoot = lazy(() =>
  import("./pages/AccountPages/SubAccountRoot")
);

const AllInvAdjAccount = lazy(() =>
  import("./pages/InventoryAdjustmentAccountPages/AllInvAdjAccountPage")
);

const EditInvAdjPage = lazy(() =>
  import("./pages/InventoryAdjustmentAccountPages/EditInvAdjAccountPage")
);

const InvAdjDetailPage = lazy(() =>
  import("./pages/InventoryAdjustmentAccountPages/InvAdjAccountDetailPage")
);

const NewInvAdjAccountPage = lazy(() =>
  import("./pages/InventoryAdjustmentAccountPages/NewInvAdjPage")
);

const NewSupplierPaymentPage = lazy(() =>
  import("./pages/SupplierPaymentPages/NewPaymentsPage")
);

const CustomerPaymentRejectPage = lazy(() =>
  import("./pages/CustomerPaymentsPage/CustomerPaymentRejectPage")
);

const InvoiceAttachmentPage = lazy(() =>
  import("./pages/InvoicePages/InvoiceAttachmentPage")
);

const ReportsPage = lazy(() => import("./pages/ReportsPage/ReportsListPage"));

const CategoryAccountUploadPage = lazy(() =>
  import("./pages/UploadPages/CategoryAccountUploadPage")
);

const CategoryUploadPage = lazy(() =>
  import("./pages/UploadPages/CategoryUploadPage")
);

const ItemUploadPage = lazy(() => import("./pages/UploadPages/ItemUploadPage"));

const router = createBrowserRouter([
  {
    path: "/",
    loader: tokenLoader,
    element: (
      <Suspense fallback={<p>Loading</p>}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<p>Loading</p>}>
        <ErrorPage />{" "}
      </Suspense>
    ),
    id: "root",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <HomePage />
          </Suspense>
        )
      },
      {
        path: "reports",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ReportsPage />
          </Suspense>
        )
      },
      {
        path: "upload-itemAccounts",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <CategoryAccountUploadPage />
          </Suspense>
        )
      },
      {
        path: "upload-itemCategory",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <CategoryUploadPage />
          </Suspense>
        )
      },
      ,
      {
        path: "upload-item",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ItemUploadPage />
          </Suspense>
        )
      },
      {
        path: "bank-balances",
        loader: () =>
          import("./pages/BankBalancePages/AllBankBalancesPage").then(
            (module) => module.loader()
          ),
        id: "bank-balances",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <BankBalanceRoot />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllBankBalancesPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "customer-balances",
        id: "customer-balances",
        loader: () =>
          import("./pages/CustomerBalancePages/AllCustomerBalancesPage").then(
            (module) => module.loader()
          ),
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            {" "}
            <CustomerBalanceRoot />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllCustomerBalancesPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "supplier-balances",
        id: "supplier-balances",
        loader: () =>
          import("./pages/SupplierBalancePages/AllSupplierBalancesPage").then(
            (module) => module.loader()
          ),
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SupplierBalanceRoot />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllSupplierBalancePages />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "customer-payment",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <AllCustomerPaymentRoot />
          </Suspense>
        ),
        id: "customer-payments",
        loader: () =>
          import("./pages/CustomerPaymentsPage/AllCustomerPayments").then(
            (module) => module.loader()
          ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ReceiptPaymentsPage />
              </Suspense>
            ),
          },
          {
            path: "new",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <NewReceiptPaymentPage />
              </Suspense>
            ),
          },
          {
            path: ":id",
            id: "customer-payment-detail",
            loader: (meta) =>
              import(
                "./pages/CustomerPaymentsPage/CustomerPaymentDetailPage"
              ).then((module) => module.loader(meta)),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <CustomerPaymentDetailPage />
                  </Suspense>
                ),
              },
              {
                path: "approve",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <CustomerPaymentApprovePage />
                  </Suspense>
                ),
                action: (meta) =>
                  import(
                    "./pages/CustomerPaymentsPage/CustomerPaymentApprovePage"
                  ).then((module) => module.action(meta)),
              },
              {
                path: "accounting",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <ViewCustomerPaymentAccountingPage />
                  </Suspense>
                ),
                loader: (meta) =>
                  import(
                    "./pages/CustomerPaymentsPage/CustomerPaymentAccountingViewPage"
                  ).then((module) => module.loader(meta)),
              },
              {
                path: "reject",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <CustomerPaymentRejectPage />
                  </Suspense>
                ),
                action: (meta) =>
                  import(
                    "./pages/CustomerPaymentsPage/CustomerPaymentRejectPage"
                  ).then((module) => module.action(meta)),
              },
            ],
          },
        ],
      },
      {
        path: "inventory-balance",
        element: <BalanceRoot />,
        id: "inventory-balances",
        loader: InventoryBalancesLoader,
        children: [
          { index: true, element: <InventoryBalancesPage /> },
          {
            path: "search",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <InventoryBalanceSearchPage />
              </Suspense>
            ),
          },
          {
            path: "receipt",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <MiscReceiptPage />
              </Suspense>
            ),
            action: MiscReceiptAction,
          },
          {
            path: "issue",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <MiscIssuePage />
              </Suspense>
            ),
            action: MiscIssueAction,
          },
        ],
      },
      {
        path: "payment",
        element: <SupplierPaymentRoot />,
        id: "payments",
        loader: SupplierPaymentsLoader,
        children: [
          { index: true, element: <AllSupplierPaymentPage /> },
          {
            path: "new",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <NewSupplierPaymentPage />
              </Suspense>
            ),
            loader: () =>
              import(
                "./components/SupplierPaymentComponents/SupplierPaymentSearchForm"
              ).then((module) => module.loader()),
          },
          {
            path: ":id",
            id: "payment",
            loader: SupplierPaymentDetailLoader,
            children: [
              {
                index: true,
                element: <SupplierPaymentDetailPage />,
                action: SupplierPaymentDeleteAction,
              },
              {
                path: "approve",
                element: <SupplierPaymentApprovePage />,
                action: SupplierPaymentApproveAction,
              },
              {
                path: "reject",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <SupplierPaymentRejectPage />
                  </Suspense>
                ),
                action: (meta) =>
                  import(
                    "./components/SupplierPaymentComponents/SupplierPaymentRejectForm"
                  ).then((module) => module.action(meta)),
              },
              {
                path: "accounting",
                element: <ViewSupplierPaymentAccountingPage />,
                loader: ViewPaymentAccountingLoader,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
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
        loader: dashboardLoader,
      },
      {
        path: "account",
        element: <AccountRoot />,
        children: [
          {
            path: "supplier",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllAccountRoot />
              </Suspense>
            ),
            loader: SupplierAccountsLoader,
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
                    action: DeleteAccountAction,
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
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllAccountRoot />
              </Suspense>
            ),
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
                loader: PurchaseAccountDetailLoader,
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
            path: "bank",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllAccountRoot />
              </Suspense>
            ),
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
                loader: PaymentAccountDetailLoader,
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
          },
          {
            path: "sales",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllAccountRoot />
              </Suspense>
            ),
            loader: AllSalesAccountLoader,
            id: "sales-accounts",
            children: [
              { index: true, element: <SalesAccountsPage /> },
              {
                path: "new",
                element: <NewSalesAccountPage />,
                action: SalesAccountAction,
              },
              {
                path: ":id",
                id: "sales-account-detail",
                loader: SaleAccountLoader,
                children: [
                  {
                    index: true,
                    element: <SalesAccountDetailPage />,
                    action: DeleteSaleAccountAction,
                  },
                  {
                    path: "edit",
                    element: <EditSalesAccountPage />,
                    action: SalesAccountAction,
                  },
                ],
              },
            ],
          },
          {
            path: "expense",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllAccountRoot />
              </Suspense>
            ),
            loader: AllExpenseAccountLoader,
            id: "expense-accounts",
            children: [
              { index: true, element: <ExpenseAccountsPage /> },
              {
                path: "new",
                element: <NewExpenseAccountPage />,
                action: ExpenseAccountManipulateAction,
              },
              {
                path: ":id",
                id: "expense-account-detail",
                loader: ExpenseAccountLoader,
                children: [
                  {
                    index: true,
                    element: <ExpenseAccountDetailPage />,
                    action: ExpensesAccountDeleteAction,
                  },
                  {
                    path: "edit",
                    element: <EditExpenseAccountPage />,
                    action: ExpenseAccountManipulateAction,
                  },
                ],
              },
            ],
          },
          {
            path: "inv-adj",
            id: "inv-adj-accounts",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllAccountRoot />
              </Suspense>
            ),
            loader: () =>
              import(
                "./pages/InventoryAdjustmentAccountPages/AllInvAdjAccountPage"
              ).then((module) => module.loader()),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <AllInvAdjAccount />
                  </Suspense>
                ),
              },
              {
                path: "new",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    {" "}
                    <NewInvAdjAccountPage />{" "}
                  </Suspense>
                ),
                action: (meta) =>
                  import(
                    "./components/AccountComponents/InvAdjAccountForm"
                  ).then((module) => module.action(meta)),
              },
              {
                path: ":id",
                id: "inv-adj-account-detail",
                loader: (meta) =>
                  import(
                    "./pages/InventoryAdjustmentAccountPages/InvAdjAccountDetailPage"
                  ).then((module) => module.loader(meta)),
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<p>Loading...</p>}>
                        <InvAdjDetailPage />
                      </Suspense>
                    ),
                    action: (meta) =>
                      import(
                        "./pages/InventoryAdjustmentAccountPages/InvAdjAccountDetailPage"
                      ).then((module) => module.action(meta)),
                  },
                  {
                    path: "edit",
                    element: (
                      <Suspense fallback={<p>Loading...</p>}>
                        <EditInvAdjPage />
                      </Suspense>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: "customer",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllAccountRoot />
              </Suspense>
            ),
            loader: CustomerAccountsLoader,
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
                    action: DeleteCustomerAccount,
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
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AllAccountRoot />
              </Suspense>
            ),
            loader: ItemAccountsLoader,
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
                    action: DeleteCategoryAction,
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
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ItemsRoot />
          </Suspense>
        ),
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
                action: CategoryManipulateAction,
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
                    element: (
                      <Suspense fallback={<p>Loading...</p>}>
                        <CategoryEditPage />
                      </Suspense>
                    ),
                    action: CategoryManipulateAction,
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
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ItemRoot />
              </Suspense>
            ),
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
                loader: ItemDetailLoader,
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
                    loader: ItemCategoryDetailLoader,
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
        element: <PurchaseRootPage />,
        loader: invoicesLoader,
        id: "invoices",
        children: [
          { index: true, element: <AllInvoicePage /> },
          {
            path: "new",
            element: <NewInvoicePage />,
            loader: invoiceSupplierLoader,
            action: InvoiceManipulateAction,
          },
          {
            path: ":id",
            id: "invoice-detail",
            loader: invoiceLoader,
            children: [
              {
                index: true,
                element: <InvoiceDetailPage />,
                action: deleteInvoiceAction,
              },
              {
                path: "edit",
                element: <InvoiceEditPage />,
                action: InvoiceManipulateAction,
                loader: invoiceSupplierLoader,
              },
              {
                path: "account",
                element: <InvoiceAccountingPage />,
                action: InvoiceAccountingAction,
              },
              {
                path: "payment",
                element: <InvoicePaymentPage />,
                action: InvoicePaymentAction,
                loader: InvoicePaymentLoader,
              },
              {
                path: "accounting",
                element: <ViewInvoiceAccountingPage />,
                loader: ViewInvoiceAccountingLoader,
              },
              {
                path: "void",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <InvoiceVoidPage />
                  </Suspense>
                ),
                action: (meta) =>
                  import("./components/InvoiceComponents/InvoiceVoidForm").then(
                    (module) => module.action(meta)
                  ),
              },
              {
                path: "attachment",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <InvoiceAttachmentPage />
                  </Suspense>
                ),
                action: (meta) =>
                  import("./pages/InvoicePages/InvoiceAttachmentPage").then(
                    (module) => module.action(meta)
                  ),
              },
            ],
          },
        ],
      },
      {
        path: "receipt",
        element: <SalesRootNav />,
        loader: ReceiptsLoader,
        id: "receipts",
        children: [
          { index: true, element: <AllReceiptsPage /> },
          {
            path: "new",
            element: <NewReceiptPage />,
            loader: ReceiptCustomerLoader,
            action: ReceiptManipulateAction,
          },
          {
            path: ":id",
            id: "receipt-detail",
            loader: ReceiptLoader,
            children: [
              {
                index: true,
                element: <ReceiptDetailPage />,
                action: ReceiptDeleteAction,
              },
              {
                path: "edit",
                element: <ReceiptEditPage />,
                loader: ReceiptCustomerLoader,
                action: ReceiptManipulateAction,
              },
              {
                path: "accounting",
                element: <ReceiptAccountingViewPage />,
                loader: ReceiptAccountingViewLoader,
              },
              {
                path: "pay",
                element: <ReceiptPaymentPage />,
                loader: ReceiptPaymentLoader,
                action: ReceiptPaymentAction,
              },
              {
                path: "void",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <ReceiptVoidPage />
                  </Suspense>
                ),
                action: (meta) =>
                  import("./pages/ReceiptPages/ReceiptVoidPage").then(
                    (module) => module.action(meta)
                  ),
              },
            ],
          },
        ],
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
            loader: SupAccLoader,
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
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
