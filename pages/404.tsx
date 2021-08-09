import { useRouter } from "next/router";
import { useEffect } from "react";

const Custom404 = () => {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/");
  }, []);

  return <></>;
};

export default Custom404;
