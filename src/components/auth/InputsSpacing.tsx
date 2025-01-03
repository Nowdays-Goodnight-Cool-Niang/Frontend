import { PropsWithChildren } from "react";

function InputsSpacing({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export default InputsSpacing;
