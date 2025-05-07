"use client";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

// import { AgGridReact } from "ag-grid-react";
// import { useState } from "react";
// import {
//   CartesianGrid,
//   Line,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { LineChart } from "recharts";

import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://rzjeoeljpbdgxmlohlos.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6amVvZWxqcGJkZ3htbG9obG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTU0MjQsImV4cCI6MjA2MjE3MTQyNH0.tBBR7I880f7W0d1_ITe4tCjx4pkQYNmW29_mt4uBI-A"
);

export default function Assets() {
  // const { data, error } = await supabase.from("asset").select();
  // Row Data: The data to be displayed.
  // const [rowData, setRowData] = useState<any[]>([
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  // ]);

  // // Column Definitions: Defines & controls grid columns.
  // const [colDefs, setColDefs] = useState<ColDef<any>[]>([
  //   { field: "make" },
  //   { field: "model" },
  //   { field: "price" },
  //   { field: "electric" },
  // ]);

  // const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
  // console.log(data);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.from("assets").select("*");
      console.log(data, error);
    }
    getData();
  }, []);

  return (
    <div className="h-screen w-screen bg-white">
      {/* <AgGridReact rowData={rowData} columnDefs={colDefs} /> */}

      {/* <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
}
