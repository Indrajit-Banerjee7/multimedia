import React, { useState } from "react";

function App() {
  const [key, setKey] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const keyInt = parseInt(key);

    if (isNaN(keyInt)) {
      alert("Please enter a valid key");
      return;
    }

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      const result = event.target.result;
      const data = new Uint8Array(result);

      for (let i = 0; i < data.length; i++) {
        data[i] = data[i] ^ keyInt;
      }

      const blob = new Blob([data], { type: file.type });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();

      URL.revokeObjectURL(url);
      alert("Done");
    };
  };

  return (
    <>
      <div className="w-full h-[100vh]">
        <h1 className="text-5xl font-bold text-center">Image Operation</h1>
        <div className=" mt-40  w-full h-96  ">
          <div className="flex justify-center border-2 border-black h-80 w-1/2 items-center rounded-lg ml-80 flex-col">
            <input
              type="number"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
              className="border-2 border-gray-700 w-96 h-12 rounded-md "
            />

            <input
              type="file"
              onChange={handleFileChange}
              className="my-4"
              id="fileInput"
            />
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="px-5 py3 bg-green-400 h-12 rounded-md hover:bg-green-600"
            >
              Open Image/Video
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
