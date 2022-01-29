import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <div>
        <Link href={"/"}>
          <a style={{ fontSize: 17, fontWeight: "bold" }}>
            whatsthediscord@Berkeley
          </a>
        </Link>
      </div>
      <div>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
        <Link href={"/issue"}>
          <a>Report</a>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
