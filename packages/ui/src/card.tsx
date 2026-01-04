import { type JSX } from "react";

export function Card({
  title,
  children,
}: {
  className?: string;
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <a
      className="group block border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 bg-white"
     
    >
      <h1 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-3 group-hover:text-sky-700 transition-colors">
        {title}
      </h1>
      <div className="text-gray-800">{children}</div>
    </a>
  );
}
