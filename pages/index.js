import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllClasses } from "../firebase";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllClasses();
      setAllClasses(data);
    };
    fetchData().then(setLoading(false));
  }, [loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    const res = await fetch("/api/addclass", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
    setLoading(true);
  };

  return (
    <div className={styles.root}>
      <Head>
        <title>Home - whatsthediscord.com</title>
        <meta
          name="description"
          content="Discord links for your Berkeley classes"
        />
        <link rel="icon" href="/websiteIcon.png" />
      </Head>
      <div className={styles.introContainer}>
        <h1
          style={{
            marginTop: 0,
            marginBottom: 10,
            textAlign: "center",
            paddingTop: 45,
          }}
        >
          Add a Discord, find a Discord
        </h1>

        <p
          style={{
            marginTop: 0,
            textAlign: "center",
            paddingTop: 10,
            fontSize: 18,
          }}
        >
          A crowd-sourced hub to find active Discords, without having to use
          Discord or Reddit.
        </p>
      </div>
      {/* <div className={styles.searchContainer}>
        <p style={{ marginTop: 50, marginBottom: 5, fontSize: 16.5 }}>
          Search for your class:
        </p>
        <input
          className={styles.search}
          placeholder="Coming soon..."
          readOnly
        />
      </div> */}
      <div className={styles.legendContainer}>
        <p className={styles.courseNameLegend}>Course Name</p>
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <p className={styles.verifiedLegend}>Last updated</p>
          <p className={styles.studyGroupLegend}>Working</p>
        </div>
      </div>
      <div className={styles.searchResultsContainer}>
        <ul className={styles.searchResultsList}>
          {loading ? (
            <h4 style={{ textAlign: "center" }}>loading...</h4>
          ) : (
            allClasses.map((course) => (
              <Link
                href={{
                  pathname: "/classpage",
                  query: { classname: course.classname },
                }}
                passHref
                key={course.classname}
              >
                <a href className={styles.searchResult}>
                  <div className={styles.courseName}>
                    <p style={{ margin: 0, padding: 0 }}>{course.classname}</p>
                  </div>
                  <div style={{ display: "flex", marginLeft: "auto" }}>
                    <div className={styles.verified}>
                      <p style={{ margin: 0, padding: 0 }}>
                        {course.lastUpdated}
                      </p>
                    </div>
                    <div className={styles.studyGroups}>
                      {course.isBroken ? "No" : "Yes"}
                    </div>
                  </div>
                </a>
              </Link>
            ))
          )}

          <form className={styles.searchResultLast} onSubmit={handleSubmit}>
            <p style={{ width: 95, fontSize: 16 }}>Add class:</p>
            <input
              className={styles.addClassInput}
              placeholder="ESPMC103"
              type="text"
              name="classname"
            />
            <button type="submit" className={styles.addClassButton}>
              Add
            </button>
          </form>
        </ul>
      </div>
    </div>
  );
}
