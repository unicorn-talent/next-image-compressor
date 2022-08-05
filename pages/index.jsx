import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../styles/Home.module.css";
import ImageCompressor from "../../next-image-compressor/components/ImageCompressor";

const Home = () => {
  return (
    <div className={styles.container}>
      <ImageCompressor />
    </div>
  );
};

export default Home;
