import React from 'react';

import classes from './About.module.scss';

const content = [
  'about',
  'Ritual Interactive is a rapidly expanding game production company located in Poland. We specialize in indie development and publishing, and we already boast associated projects that have achieved unprecedented results compared to the data displayed by competing titles.',
  'We have secured partnerships with teams and individuals of unparalleled passion for games, with whom we share this sentiment through and through. We strive to come up with the most fun and innovative game ideas and we give it our best to have those ideas come to life and be enjoyed by the gaming audience worldwide.',
  'An industry of fierce competition, accessed by more and more ambitious creators, game development of today demands stable, reliable partnerships more than ever before; individuals that you can effectively communicate with and consult when the effort of making your creative dreams come true begins to overwhelm or demand too much time.',
  "Ritual Interactive proudly cooperates with many developers, supporting them in those efforts and cooperates by networking with specialists in marketing, programming, animation, art, creative writing, translation, and many others that help one's amazing game idea stand out.",
  'We understand the interests of players as consumers, the workings of online distribution platforms, the way social media interact with video games, and the methods of effective community building.',
  "If you'd like to learn more about the opportunities we have to offer, don't hesitate to send us a message using our contact form.",
];

const About = () => (
  <section className={classes.section_about}>
    <h2 className={classes.section_about_title}>{content[0]}</h2>
    <div className={classes.section_about_text}>
      <p>{content[1]}</p>
      <br />
      <br />
      <p>{content[2]}</p>
      <br />
      <br />
      <p>{content[3]}</p>
      <br />
      <br />
      <p>{content[4]}</p>
      <br />
      <br />
      <p>{content[5]}</p>
      <br />
      <br />
    </div>
  </section>
);

export default About;
