import Head from "next/head";
import Image from "next/image";
import { reportIssue } from "../firebase";
import styles from "../styles/Issue.module.css";
import NavBar from "./components/NavBar";

export default function Issue() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    await reportIssue(formData.resp)
      .then(alert("Submitted. Thanks!"))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.root}>
      <Head>
        <title>Report an Issue</title>
        <meta name="description" content="Report an issue with the site." />
        <link rel="icon" href="/websiteIcon.png" />
      </Head>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 style={{ marginTop: 50, textAlign: "center", marginBottom: 0 }}>
          Report an issue
        </h1>
        <p style={{ textAlign: "center", marginBottom: 40 }}>
          Have an issue, suggestion, comment? Submit it below. Thanks!
        </p>
        <textarea name="resp" className={styles.textArea} required />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
