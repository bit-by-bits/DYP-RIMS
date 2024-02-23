import { useEffect, useState } from "react";
import { message } from "antd";
import { useRouter } from "next/router";
import { useAccess } from "../context/accessContext";

const AllowPage = ({ children, accesses }) => {
  const router = useRouter();
  const { access } = useAccess();

  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    if (isAllowed && access && !accesses.includes(access)) setIsAllowed(false);
  }, [isAllowed, access, accesses]);

  useEffect(() => {
    if (!isAllowed) {
      router.push("/profile");
      message.error("You are not allowed to access this page");
    }
  }, [isAllowed, router]);

  return children;
};

export default AllowPage;
