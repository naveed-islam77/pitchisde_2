import Link from "next/link";

export function FormSquare({ form, form_fixtures, index, form_detail }) {
  let formColorMap = {
    W: "#00973c",
    L: "#da291c",
    D: "#8D9499",
  };

  return (
    <Link
      title={form_detail?.[index]}
      href={`/match/${form_fixtures[index]}`}
      className="relative flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-light hover:opacity-80 group text-lg"
      style={{ backgroundColor: formColorMap[form] || "#8D9499" }}
    >
      {form}
      <span
        style={{ backgroundColor: formColorMap[form] || "#8D9499" }}
        className="group-last:inline-block hidden w-3/5 mx-auto absolute -bottom-1 left-1/2 -translate-x-1/2  h-0.5 rounded-md"
      ></span>
    </Link>
  );
}
