export default function LoadingSplash({ text }: { text: string }) { // দুই পেজে আলাদা বার্তা দেখাতে text নেওয়া
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2"> {/* পর্দার মাঝখানে রাখার জন্য */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-2xl text-white">🛒</div> {/* ভিডিওর সবুজ লোগোর বদলি, আসল লোগো পরে বসাতে পারেন */}
      <p className="font-bold">বাজার দর</p>
      <p className="text-xs text-gray-500">{text}</p> {/* কী লোড হচ্ছে তা জানানো */}
      <div className="flex gap-1"> {/* তিনটি ডট */}
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" /> {/* animate-bounce চলমান ভাব দেয় */}
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:150ms]" /> {/* দেরি দিয়ে ঢেউয়ের মতো */}
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:300ms]" />
      </div>
    </div>
  );
}