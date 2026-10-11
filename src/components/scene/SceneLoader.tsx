"use client";

import dynamic from "next/dynamic";

// three.js stays out of the first paint: the page renders and reads without
// it, and the stack fades in once the chunk arrives.
const StackScene = dynamic(() => import("./StackScene"), { ssr: false });

export default function SceneLoader() {
  return <StackScene />;
}
