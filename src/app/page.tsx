import { Suspense } from "react";
import PriceTicker from "./component/PriceTicker";
import Banner from "./component/Banner";


export default function Home() {
  return (
    <div >
      <Suspense fallback={<div className="h-8" aria-label="দাম লোড হচ্ছে" />}>
        <PriceTicker />
      </Suspense>
      <Banner />
    </div>
  );
}
