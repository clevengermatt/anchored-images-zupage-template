import React, { Component } from "react";
import zupage from "zupage";
import { Container, Image, Visibility } from "semantic-ui-react";
import MediaBody from "react-media-body";
import Slider from "react-slick";
import "./App.css";

class App extends Component {
  state = {
    body: "",
    creator: {},
    colorPalette: [],
    date: "",
    images: [],
    page: {},
    paragraphs: [],
    title: ""
  };

  async componentDidMount() {
    const postResponse = await zupage.getCurrentPost();

    const date = new Date(
      postResponse.published_time * 1000
    ).toLocaleDateString("en-US");

    this.setState({
      body: postResponse.body,
      creator: postResponse.creator,
      colorPalette: postResponse.page.color_palette,
      date: date,
      // images: postResponse.images,
      page: postResponse.page,
      title: postResponse.title
    });
  }

  renderImages = () => {
    const { images, page } = this.state;

    if (images.length === 0) {
      return (
        <div className="Slider-Item">
          <img className="Slider-Image" alt="" src={page.hero_image_url} />
        </div>
      );
    }

    return images.map((image, i) => {
      return (
        <div key={i} className="Slider-Item">
          <img className="Slider-Image" alt="" src={image.url} />
        </div>
      );
    });
  };

  render() {
    const { body, creator, date, title } = this.state;

    var settings = {
      autoplay: true,
      dots: false,
      fade: true,
      lazyLoad: true,
      pauseOnHover: false,
      speed: 500
    };

    return (
      <div>
        <Slider className="Slider" {...settings}>
          {this.renderImages()}
        </Slider>
        <div className="Scrollable">
          <Container text className="Text-Container">
            <div className="Title">{title}</div>
            <div className="Creator">
              <Image
                className="Avatar"
                circular
                src={creator.profile_image_url}
                verticalAlign="middle"
              />
              <div className="Creator-Name">{creator.name}</div>
              <div className="Date">{date}</div>
            </div>
            <MediaBody className="Body-Text">{body}</MediaBody>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
