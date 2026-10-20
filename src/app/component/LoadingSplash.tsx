export default function LoadingSplash({ text }: { text: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-2xl text-white">🛒</div>
      <p className="font-bold">বাজার দর</p>
      <p className="text-xs text-gray-500">{text}</p>
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:300ms]" />
      </div>
    </div>
  );
}