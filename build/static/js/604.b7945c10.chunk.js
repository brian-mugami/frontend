"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[604],{81604:function(e,n,t){t.r(n),t.d(n,{action:function(){return u}});var s=t(74165),r=t(15861),i=(t(72791),t(31084)),o=t(11226),a=t(28127),c=t(80184);function u(e){return l.apply(this,arguments)}function l(){return(l=(0,r.Z)((0,s.Z)().mark((function e(n){var t,r,i,c,u,l,d,m;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.request,r=n.params,i=(0,a.bW)(),c=r.id,u="https://inentory-test.onrender.com/invoice/void/"+c,e.next=6,t.formData();case 6:return l=e.sent,d={reason:l.get("reason")},e.next=10,fetch(u,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+i,"Access-Control-Allow-Origin":"*"},body:JSON.stringify(d)});case 10:if(400!==(m=e.sent).status){e.next=13;break}return e.abrupt("return",m);case 13:if(404!==m.status){e.next=15;break}return e.abrupt("return",m);case 15:if(m.ok){e.next=17;break}throw(0,o.json)({message:"Failed to void invoice"},{status:500});case 17:return e.abrupt("return",(0,o.redirect)("/invoice"));case 18:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n.default=function(e){var n=e.invoice,t=(0,o.useNavigation)(),s=(0,o.useNavigate)(),r=(0,o.useActionData)(),a="submitting"===t.state;return(0,c.jsxs)(i.Z,{children:[r&&r.errors&&(0,c.jsx)("ul",{children:Object.values(r.errors).map((function(e){return(0,c.jsx)("li",{children:e},e)}))}),r&&r.message&&(0,c.jsx)("p",{children:r.message}),(0,c.jsxs)(o.Form,{method:"post",children:[(0,c.jsx)("div",{className:"pb-4",children:(0,c.jsxs)("p",{className:"mt-1 text-sm leading-6 text-gray-600",children:["Are you sure you want to void invoice number"," ",(0,c.jsx)("b",{children:n.invoice_number})," of amount"," ",(0,c.jsxs)("b",{children:[n.currency," ",n.amount]})]})}),(0,c.jsx)("div",{className:"pb-2",children:(0,c.jsx)("input",{required:!0,placeholder:"Void Reason",name:"reason",className:"block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-4 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"})}),(0,c.jsxs)("div",{className:"space-x-4",children:[(0,c.jsx)("button",{className:"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",type:"submit",disabled:a,children:a?"Voiding":"Void"}),(0,c.jsx)("button",{className:"text-sm font-semibold leading-6 text-gray-900",onClick:function(){s("..")},children:"Cancel"})," "]})]})]})}}}]);
//# sourceMappingURL=604.b7945c10.chunk.js.map