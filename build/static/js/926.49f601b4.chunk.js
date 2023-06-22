"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[926],{91926:function(e,t,n){n.r(t),n.d(t,{default:function(){return x},loader:function(){return v}});var r=n(74165),i=n(15861),a=n(72791),s=n(29439),c=n(11087),o=n(79793),u=n(28672),d=n(80184),l=[{field:"payment",headerName:"Payment",renderCell:function(e){return(0,d.jsx)(c.rU,{to:"./".concat(e.row.id),children:e.row.id})},width:200},{field:"customer",headerName:"Customer",valueGetter:function(e){return e.row.receipt.customer.customer_name||""},width:200},{field:"receiptNumber",headerName:"Receipt Number",width:200,valueGetter:function(e){return e.row.receipt.receipt_number||""}},{field:"approved",headerName:"Approved",width:200,valueGetter:function(e){return!0===e.row.approved?"approved":"Not Approved"}},{field:"paymentDate",headerName:"Payment Date",width:200,valueGetter:function(e){return e.row.date||""}},{field:"receiptDate",headerName:"Receipt Date",width:200,valueGetter:function(e){return e.row.receipt.date||""}},{field:"actions",headerName:"Actions",width:300,renderCell:function(e){return(0,d.jsxs)("div",{className:"flex",children:[(0,d.jsx)("div",{className:"pr-2",children:(0,d.jsx)("span",{className:"inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10",children:(0,d.jsx)(c.rU,{to:"./".concat(e.row.id,"/approve"),children:"Approve"})})}),(0,d.jsx)("div",{className:"pr-2",children:(0,d.jsx)("span",{className:"inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10",children:(0,d.jsx)(c.rU,{to:"./".concat(e.row.id,"/accounting"),children:"Accounting"})})}),(0,d.jsx)("div",{children:(0,d.jsx)("span",{className:"inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10",children:(0,d.jsx)(c.rU,{to:"./".concat(e.row.id,"/reject"),children:"Reject"})})})]})}}];var p=function(e){var t=e.payments,n=(0,a.useState)(1),r=(0,s.Z)(n,2),i=r[0],c=r[1],p=10*(i-1),m=p+10,h=t.slice(p,m),f=Math.ceil(t.length/10);return(0,d.jsxs)("div",{style:{height:500,width:"100%"},children:[(0,d.jsx)("h2",{className:"text-lg font-semibold mb-4",children:"Payments"}),(0,d.jsx)(o._,{rows:h,columns:l,pagination:!0,pageSize:10,onPageChange:function(e){c(e.page+1)},rowCount:t.length,paginationMode:"server",components:{Toolbar:u.n}}),f>1&&(0,d.jsx)("div",{className:"flex justify-center mt-4",children:(0,d.jsx)("nav",{className:"inline-flex rounded-md shadow",children:(0,d.jsx)("ul",{className:"flex",children:Array.from({length:f},(function(e,t){return(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"px-4 py-2 ".concat(i===t+1?"bg-gray-900 text-white":"bg-white text-gray-700"," font-medium"),onClick:function(){return c(t+1)},children:t+1})},t)}))})})})]})},m=n(28127),h=n(57689),f=n(63924);var x=function(){var e=(0,h.useRouteLoaderData)("customer-payments").payments;return(0,d.jsx)(a.Suspense,{fallback:(0,d.jsx)("p",{children:"Loading...."}),children:(0,d.jsx)(h.Await,{resolve:e,children:function(e){return(0,d.jsx)(p,{payments:e})}})})};function g(){return w.apply(this,arguments)}function w(){return(w=(0,i.Z)((0,r.Z)().mark((function e(){var t,n,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,m.bW)(),e.next=3,fetch("https://flask-inventory.onrender.com/customer/payment",{method:"GET",headers:{Authorization:"Bearer "+t,"Access-Control-Allow-Origin":"*"}});case 3:if((n=e.sent).ok){e.next=6;break}throw(0,f.json)({message:"No payments loaded"},{status:500});case 6:return e.next=8,n.json();case 8:return i=e.sent,e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(){return j.apply(this,arguments)}function j(){return(j=(0,i.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.defer)({payments:g()}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=926.49f601b4.chunk.js.map