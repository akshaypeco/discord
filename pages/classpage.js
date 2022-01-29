import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addMainLink, getClassData, reportLink } from "../firebase";
import styles from "../styles/ClassPage.module.css";

export default function ClassPage() {
  const router = useRouter();
  const { classname } = router.query;
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (classname) {
        const data = await getClassData(classname);
        setClassData(data[0]);
      }
    };
    fetchData().then(setLoading(false));
  }, [loading]);

  const copy = async () => {
    await navigator.clipboard.writeText(classData.discordMainLink);
    alert("Text copied");
  };

  const handleChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addMainLink(classname, link).then(alert("Link uploaded."));
    setLoading(true);
  };

  const handleReport = async (event) => {
    event.preventDefault();
    await reportLink(classname).then(alert("Link reported as broken."));
  };

  return (
    <div className={styles.root}>
      <Head>
        <title>{classname} - class page</title>
        <meta
          name="description"
          content="Discord link for your Berkeley class"
        />
        <link rel="icon" href="/websiteIcon.png" />
      </Head>
      <div>
        <h1
          style={{
            marginLeft: 50,
            marginTop: 0,
            paddingTop: 80,
            marginBottom: 0,
            fontSize: 35,
          }}
        >
          {classname}
        </h1>

        <div>
          <h3 style={{ marginLeft: 50, marginTop: 50 }}>Main Discord</h3>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              className={styles.linkInput}
              type={"text"}
              value={classData.discordMainLink}
              placeholder="No link yet, add one below"
              id="linkInput"
              readOnly
            />
            <button onClick={copy} className={styles.copyButton}>
              Copy
            </button>
            <a
              href={classData.discordMainLink}
              target={"_blank"}
              className={styles.visitLink}
            >
              Join
            </a>
          </div>
          <div className={styles.addMain}>
            <p>Post/replace current link:</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                className={styles.addClassInput}
                onChange={handleChange}
                placeholder="Enter URL here"
                type="url"
                name="classname"
              />
              <button
                onClick={handleSubmit}
                type="button"
                className={styles.addClassButton}
              >
                Add
              </button>
            </div>
          </div>
          <div
            style={{ textAlign: "center", marginTop: 40, paddingBottom: 40 }}
          >
            <button
              type="button"
              className={styles.reportBroken}
              onClick={handleReport}
            >
              Report broken
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
