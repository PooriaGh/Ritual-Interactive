import React from 'react';

import classes from './About.module.scss';

const content = [
  'o spółce',
  'Ritual Interactive jest dynamicznie rozwijającą się, zlokalizowaną w Polsce spółką działającą branży gamedevu – specjalizujemy się w tworzeniu i wydawaniu niezależnych gier. Dzięki innowacyjności podejmowanych projektów nasze tytuły już na samym starcie produkcji cieszą się wynikami niespotykanymi w swoich kategoriach.',
  'Podjęliśmy współpracę z osobami i zespołami o niezrównanym zamiłowaniu do gier i podzielamy je w całości! Dążymy do opracowania najlepszych i najbardziej innowacyjnych planów gier i dążymy do tego, aby zostały wdrożone w życie i dostarczyły rozrywki globalnej społeczności graczy.',
  'Będąc branżą zaciekłej rywalizacji, w gamedevie pojawia się coraz więcej ambitnych twórców. Produkcja gier wymaga dziś stabilnej kooperacji bardziej niż kiedykolwiek wcześniej; doświadczonych partnerów, z którymi można się skutecznie porozumiewać, gdy dążenie do realizacji wymarzonego projektu zaczyna przytłaczać lub wymagać zbyt wiele czasu.',
  'Ritual Interactive z dumą współpracuje z wieloma developerami, wspierając ich w tych wysiłkach i działając wraz z siecią specjalistów zajmujących się marketingiem, programowaniem, animacją, grafiką, kreatywnym pisaniem, lokalizacją i wieloma innymi dziedzinami, które pomagają grom naprawdę wyróżniać się z tłumu.',
  'Rozumiemy zainteresowania graczy jako konsumentów, funkcjonowanie platform dystrybucyjnych, interakcję między grami i mediami społecznościowymi oraz metody skutecznego budowania społeczności gier.',
  'Jeśli chcesz dowiedzieć się więcej o naszej ofercie, skontaktuj się z nami korzystając z formularza!',
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
