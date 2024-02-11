"use client";
import Image from "next/image";
import CodeMirror from "@uiw/react-codemirror";
import Flowchart from "flowchart-react";
import { useEffect, useState } from "react";
import Script from "next/script";
export default function Home() {
  const [code, useCode] = useState("console.log('Code Mirror!');");
  useEffect(() => {
    document.getElementById("upload-button").addEventListener("change", () => {
      document.getElementById("imageDisplay").innerHTML = "";
      Array.from(document.getElementById("upload-button").files).forEach(
        (file) => {
          fileHandler(file, file.name, file.type);
        }
      );
    });
  }, []);
  const fileHandler = (file, name, type) => {
    if (type.split("/")[0] !== "image") {
      //File Type Error
      console.log("Please upload an image file");
      return false;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      //image and file name
      let imageContainer = document.createElement("figure");
      let img = document.createElement("img");
      img.src = reader.result;
      imageContainer.appendChild(img);
      imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
      document.getElementById("imageDisplay").appendChild(imageContainer);
    };
  };
  return (
    <main className="min-h-screen min-w-screen">
      <div className="grid grid-cols-3">
        <div className="resize-x">
          <input type="file" id="upload-button" multiple accept="image/*" />
          <label for="upload-button">
            <i class="fa-solid fa-upload"></i>&nbsp; Choose Or Drop Photos
          </label>
          <div id="imageDisplay"></div>
        </div>
        <div className="resize-x">
          <Flowchart style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="resize-x">
          <CodeMirror value={code} height="100vh" width="100%" />
        </div>
      </div>
    </main>
  );
}
