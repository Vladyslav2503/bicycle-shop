import React from 'react';
import './About.css';

import cycleLogo from '../../image/logo-1.png';
import whoWeAreImage from '../../image/who-we-are.jpg';
import storie1 from '../../image/storie1.jpg';
import storie2 from '../../image/storie2.jpg';
import storie3 from '../../image/storie3.jpg';
import storie4 from '../../image/storie4.jpg';
import storie5 from '../../image/storie5.jpg';
import storie6 from '../../image/storie6.jpg';
import Header from '../../components/Header';

const About = () => {
  return (
    <div>
      <header className="aboutHeader">
        <Header />
        <div className="header-content-about">
          <h1>Who We Are</h1>
          <img src={whoWeAreImage} alt="" />
        </div>
      </header>

      <section className="stories">
        <h2>Explore The Stories</h2>
        <div className="stories_top">
          <div>
            <img src={storie1} alt="" />
            <img src={storie2} alt="" />
          </div>
          <div>
            <img src={storie3} alt="" />
          </div>
        </div>
        <div className="stories_bottom">
          <div>
            <img src={storie4} alt="" />
          </div>
          <div>
            <img src={storie5} alt="" />
            <img src={storie6} alt="" />
          </div>
        </div>
      </section>

      <section className="our_process">
        <h2>Our Process</h2>
        <div>
          <div>
            <h6>01.</h6>
            <h5>Research</h5>
            <p>
              Lorem ipsum dolor sit amet, consec tetur elit. Ut elit tellus, luctus nec ullam
              corper.
            </p>
          </div>
          <div>
            <h6>02.</h6>
            <h5>Idea & Concept</h5>
            <p>
              Lorem ipsum dolor sit amet, consec tetur elit. Ut elit tellus, luctus nec ullam
              corper.
            </p>
          </div>
          <div>
            <h6>03.</h6>
            <h5>Design & Production​</h5>
            <p>
              Lorem ipsum dolor sit amet, consec tetur elit. Ut elit tellus, luctus nec ullam
              corper.
            </p>
          </div>
          <div>
            <h6>04.</h6>
            <h5>Sales & Service</h5>
            <p>
              Lorem ipsum dolor sit amet, consec tetur elit. Ut elit tellus, luctus nec ullam
              corper.
            </p>
          </div>
        </div>
      </section>

      <section className="join_program">
        <h2>Join #GoEcoBiking Programme</h2>
        <img src={storie4} alt="" />
        <div>
          <div>
            <h4>Duis aute irure dolor in reprehenderit velit.</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis.
            </p>
          </div>
          <div>
            <a className="button_join" href="#">
              JOIN THE PROGRAMME
            </a>
          </div>
        </div>
      </section>

      <section className="all_new">
        <h4>The All New</h4>
        <h2>Trek Marlin 7 Gen 3 2023 Is Here</h2>
        <p>
          The bicycle is designed for urban and mountainous journeys, offering riders high quality,
          control, and a wide range of speed options for conquering the most challenging terrains.
        </p>
        <a className="button_shop" href="#">
          SHOP NOW
        </a>
      </section>
    </div>
  );
};

export default About;
