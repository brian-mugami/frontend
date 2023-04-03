import React from "react"
import { Link } from "react-router-dom";

function lotLotList({lots}){
    return (
        <React.Fragment>





<div className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="relative">
        <div className="absolute top-0 left-0 bg-purple-700 py-1 px-4 text-white shadow-lg text-2xl font-bold tracking-wide z-10 filter drop-shadow-lg">
        Itemlots
        </div>
        <div className="relative overflow-x-auto pt-12">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200 font-semibold text-gray-600 text-left">lot Name</th>
                <th className="px-4 py-2 bg-gray-200 font-semibold text-gray-600 text-left">lot Number</th>
                <th className="px-4 py-2 bg-gray-200 font-semibold text-gray-600 text-left">lot Email</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 border border-t border-gray-200 pt-4">{lots.map((lot)=><li key={lot.id}><Link to={`./${lot.id}`}>{lot.lot}</Link></li>)}</td>
                <td className="px-4 py-2 border border-t border-gray-200 pt-4">{lots.map((lot)=><li key={lot.id}><Link to={`./${lot.id}`}>{lot.batch}</Link></li>)}</td>
                <td className="px-4 py-2 borde rborder-t border-gray-200 pt-4">{lots.map((lot)=><li key={lot.id}><Link to={`./${lot.id}`}>{lot.expiry_date}</Link></li>)}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>



        </React.Fragment>
    )
}
export default lotLotList;

