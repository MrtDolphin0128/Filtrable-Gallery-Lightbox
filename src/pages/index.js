import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import data from "../data/images.json";
import styled from "styled-components";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 5px;
  padding-bottom: 8em;
  h1 {
    margin: 3em 0 1.5em 0;
    color: #212529;
    text-align: center;
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    max-width: 1200px;
    margin: auto;
    margin-bottom: 4em;
    flex-wrap: wrap;
  }
  li {
    text-transform: uppercase;
    margin: 1em;
    padding: 0.8rem 2.14rem;
    border: 2px solid #212529;
    border-radius: 3px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    line-height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.8s;
    &:hover {
      border: 2px solid #1c88e5;
      color: #1c88e5;
      box-shadow: rgba(237, 239, 247, 0.47) 0px 10px 20px,
        rgba(237, 239, 247, 0.47) 0px 6px 6px;
    }
  }
  .active {
    border: 2px solid #1c88e5;
    color: #1c88e5;
    box-shadow: rgba(237, 239, 247, 0.47) 0px 10px 20px,
      rgba(237, 239, 247, 0.47) 0px 6px 6px;
  }
  .item {
    display: none;
    justify-content: center;
  }
  img {
    cursor: zoom-in !important;
    transition: all 0.8s;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Home = () => {
  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    let array = [];

    data.map((image) => {
      array = array.concat(image.filters);
    });
    array = array.filter((item, index) => array.indexOf(item) == index);
    setFilters(array);
  }, []);

  useEffect(() => {
    let images = [];
    data.map((image) => {
      const img = new Image();
      img.src = image.src;
      img.onload = function () {
        images.push({ ...image, width: this.width, height: this.height });
      };
    });
    setInitialData(images);
    setImgs(images);
    if (window != undefined) {
      window.addEventListener("load", () => {
        setFilter("all");
      });
    }
  }, [data]);

  useEffect(() => {
    if (initialData.length) {
      let array = [];
      array = initialData.filter(
        (img, index) => img?.filters.indexOf(filter) != -1 || filter == "all"
      );
      setImgs(array);
    }
  }, [filter]);

  return (
    <Container>
      <Head>
        <title>Filtrable Gallery</title>
      </Head>
      <h1>Filtrable Gallery</h1>
      <div className="gallery">
        <div className="filters">
          <ul>
            <li
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </li>
            {filters.map((item, index) => (
              <li
                className={filter === item ? "active" : ""}
                key={index}
                onClick={() => setFilter(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {imgs.length ? (
          <>
            <Gallery photos={imgs} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={imgs.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </>
        ) : null}
      </div>
    </Container>
  );
};

export default Home;
