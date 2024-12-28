import { PropsWithChildren } from "react";

function ContentHeader({ children }: PropsWithChildren) {
  return <h1 className="text-7xl font-bold text-center my-8">{children}</h1>;
}

export default ContentHeader;
