import React, { Component } from "react";

import { alert } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";

import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

import Search from "./Search";
import Gallery from "./Gallery";

import "./global.css";

export default class App extends Component {
  state = {
    images: [],
  };

  data = {
    URL: "https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=25801304-57a04d48b0d163a63cce00770&per_page=15",
    searchValue: "",
    page: 1,
  };

  async addFotosToGallery() {
    try {
      let newImages = await this.getImagesFromApi();
      if (newImages.length === 0) {
        return alert({
          title: "Error",
          text: "No more images",
          type: "notice",
          delay: 2500,
        });
      }
      this.setState(({ images }) => {
        return {
          images: [...images, ...newImages],
        };
      });
    } catch (error) {
      alert({
        title: "Error",
        text: `${error}`,
        type: "notice",
      });
    }
  }

  async createGallery() {
    try {
      let imagesArray = await this.getImagesFromApi();
      // console.log('imgObg =>',imgObg); // массив из объектов с картинками
      if (imagesArray.length === 0) {
        return alert({
          title: "Error",
          text: "No such images",
          type: "notice",
          delay: 2500,
        });
      }
      this.setState(({ images }) => {
        return {
          images: imagesArray,
        };
      });
    } catch (error) {
      alert({
        title: "Error",
        text: `${error}`,
        type: "notice",
      });
    }
  }

  async getImagesFromApi() {
    //&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
    let uri =
      this.data.URL + "&page=" + this.data.page + "&q=" + this.data.searchValue;
    try {
      let response = await fetch(uri);
      // console.log('resoinse =>',response); // объект(ok:true, status: 200, statusText: "OK" )
      if (response.ok) {
        let data = await response.json();
        //console.log('data =>',data); // data - это объект с массивом 'hits' (из 15 объектов-картинок), и элементами total и totalHits с общим кол-ом картинок
        return data.hits;
      }
      alert({
        title: `Status: ${response.status}`,
        text: `${response.statusText}`,
        type: "notice",
      });
    } catch (error) {
      alert({
        title: "Error",
        text: `${error}`,
        type: "notice",
      });
    }
  }

  handleInput = (event) => {
    this.data.searchValue = event.target.value;
    if (this.data.searchValue) {
      this.data.page = 1;
      this.createGallery();
    }
  };

  loadMore = () => {
    this.data.page += 1;
    this.addFotosToGallery();
  };

  openModal = (event) => {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") {
      return;
    }
    basicLightbox
      .create(
        `
		  <img width="1400" height="900" src="${event.target.dataset.source}">
	  `
      )
      .show();
  };

  render() {
    let { images } = this.state;
    return (
      <>
        <Search onHandleInput={this.handleInput} />
        <Gallery
          items={images}
          onOpenModal={this.openModal}
          onLoadMore={this.loadMore}
        />
      </>
    );
  }
}
