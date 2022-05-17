import React, { useState, useEffect } from 'react';
import axios from '../../axios-default';

import TextBox from '../UI/TextBox/TextBox';
import Submit from '../UI/Buttons/Submit/Submit';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';

import ArrowDown2 from '../../assets/Icons/ArrowDown2.png';

import {
  buttonStatus,
  submitButtonTextValuesPL as submitButtonTextValues,
  httpErrorTypes,
  httpStatusCodes,
  generateFormElements,
  submitForm,
} from '../../shared/Utilities/index';

import classes from './Contact.module.scss';

const content = {
  contact: [
    'skontaktuj się',
    'Czy jesteś developerem gier i chcesz pracować nad obiecującym projektem? Czy chcesz zbudować społeczność wokół swojej własnej gry i zapewnić jej większe zainteresowanie?',
    'Ritual Interactive nieustannie poszukuje nowych współpracowników. Niezależnie czy chcesz zaoferować swoje umiejętności jako developer dla naszych projektów lub współpracować z nami w zakresie wypromowania swojej własnej gry, opracujemy dla Ciebie interesującą ofertę dostosowaną do Twoich planów. Skorzystaj z poniższego formularza, aby skontaktować się z nami.',
    'Ritual Interactive cieszy się współpracą z szeroką siecią specjalistów działających w obszarach marketingu gier, cross-promocji, produkcji, portowania, lokalizacji i innych działań niezbędnych w doprowadzeniu produkcji jakiejkolwiek gry do pomyślnej premiery. Z chęcią dowiemy się o Waszych projektach oraz Waszych bieżących potrzebach na doprowadzenie ich do poziomu niezapomnianego doświadczenia!',
  ],
  dropDown: [
    'What can we do for you:',
    'Zapytaj o nasze gry',
    'Poproś o klucz do gry',
    'Wydawaj swoją grę z nami',
    'Wyprodukuj grę z nami',
    'Pozostałe',
  ],
  contactFormIds: {
    name: 'imię i nazwisko',
    email: 'adres e-mail',
    subject: 'temat',
    message: 'wiadomość',
  },
  contactFormPlaceholder: [
    'Twoje imię i nazwisko',
    'Twój adres e-mail',
    'Twoja temat',
    'Twoja wiadomość',
  ],
};

const Contact = () => {
  // dropdown states
  const [contactCategories, setContactCategories] = useState([
    { name: content.dropDown[1], active: true },
    { name: content.dropDown[2], active: false },
    { name: content.dropDown[3], active: false },
    { name: content.dropDown[4], active: false },
    { name: content.dropDown[5], active: false },
  ]);
  const [dropDownCollapse, setDropDownCollapse] = useState(true);

  // contact form states
  const [contactForm, setContactForm] = useState({
    [content.contactFormIds.name]: {
      elementType: 'input',
      placeholder: content.contactFormPlaceholder[0],
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: null,
    },
    [content.contactFormIds.email]: {
      elementType: 'input',
      placeholder: content.contactFormPlaceholder[1],
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      message: null,
    },
    [content.contactFormIds.subject]: {
      elementType: 'input',
      placeholder: content.contactFormPlaceholder[2],
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: null,
    },
    [content.contactFormIds.message]: {
      elementType: 'textarea',
      placeholder: content.contactFormPlaceholder[3],
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: null,
    },
  });
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [submit, setSubmit] = useState(submitButtonTextValues.default);
  const [btnStatus, setBtnStatus] = useState(buttonStatus.normal);
  const [submitBtnActive, setSubmitBtnActive] = useState(false);

  useEffect(() => {
    if (loading) {
      setSubmit(submitButtonTextValues.sendingRequest);
      setSubmitBtnActive(false);
    } else {
      setSubmit(submitButtonTextValues.default);
      setSubmitBtnActive(true);
    }

    if (loading === false) {
      setSubmitBtnActive(false);
      if (error) {
        setSubmit(submitButtonTextValues.requestFailed);
        setBtnStatus(buttonStatus.failed);
      } else {
        setSubmit(submitButtonTextValues.requestSucceeded);
        setBtnStatus(buttonStatus.succeeded);
      }

      var timer = setTimeout(() => {
        setSubmit(submitButtonTextValues.default);
        setSubmitBtnActive(true);
        setBtnStatus(buttonStatus.normal);
        setError(null);
      }, 2000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [loading]);

  const contactCategoriesClickedHandler = (index) => {
    contactCategories.forEach(
      (contactCategory, index) =>
        (contactCategories[index] = { ...contactCategory, active: false }),
    );
    contactCategories[index] = { ...contactCategories[index], active: true };
    setContactCategories([...contactCategories]);
  };

  const toggleDrowpDown = () => {
    setDropDownCollapse(!dropDownCollapse);
  };

  const postContact = (axios, formElementsObject, categoriesArray) => {
    const body = {
      requestType: categoriesArray.filter((data) => data.active)[0].name,
      name: formElementsObject[content.contactFormIds.name].value,
      email: formElementsObject[content.contactFormIds.email].value,
      subject: formElementsObject[content.contactFormIds.subject].value,
      userMessage: formElementsObject[content.contactFormIds.message].value,
    };

    axios
      .post('ContactUs/ContactUs', body)
      .then((response) => {
        if (response.status === httpStatusCodes.Ok) {
          contactForm[content.contactFormIds.name] = {
            ...formElementsObject[content.contactFormIds.name],
            value: '',
            valid: false,
            touched: false,
          };
          contactForm[content.contactFormIds.email] = {
            ...formElementsObject[content.contactFormIds.email],
            value: '',
            valid: false,
            touched: false,
          };
          contactForm[content.contactFormIds.subject] = {
            ...formElementsObject[content.contactFormIds.subject],
            value: '',
            valid: false,
            touched: false,
          };
          contactForm[content.contactFormIds.message] = {
            ...formElementsObject[content.contactFormIds.message],
            value: '',
            valid: false,
            touched: false,
          };
          setContactForm({ ...formElementsObject });

          setError(null);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const submitedFormHandler = (event) => {
    event.preventDefault();

    submitForm(contactForm, setContactForm, setLoading, () => {
      postContact(axios, contactForm, contactCategories);
    });
  };

  const formElementsArray = generateFormElements(contactForm);

  let form = (
    <form
      className={classes.section_contact_tabs_page_form}
      onSubmit={(event) => submitedFormHandler(event)}
    >
      {formElementsArray.map((formElement, index) => (
        <TextBox
          key={index}
          index={index}
          formElement={formElement}
          data={contactForm}
          setData={setContactForm}
          isPolish
        />
      ))}
      <Submit
        status={btnStatus}
        disabled={!submitBtnActive}
        loading={loading}
        textValue={submit}
      />
      <ErrorMessage error={error} httpErrorType={httpErrorTypes.OTHER} />
    </form>
  );

  return (
    <div>
      <section className={classes.section_contact}>
        <h2 className={classes.section_contact_title}>{content.contact[0]}</h2>
        <div className={classes.section_contact_text}>
          <p>{content.contact[1]}</p>
          <br />
          <p>{content.contact[2]}</p>
          <br />
          <p>{content.contact[3]}</p>
          <br />
          <p>{content.contact[4]}</p>
          <br />
        </div>
      </section>
      <ul className={classes.section_contact_tabs}>
        {contactCategories.map((data, index) => (
          <li
            className={
              data.active
                ? classes.section_contact_tabs_item_active
                : classes.section_contact_tabs_item
            }
            key={index}
            onClick={() => contactCategoriesClickedHandler(index)}
          >
            <div className={classes.section_contact_tabs_item_text}>
              {data.name}
            </div>
            {data.active ? (
              <div
                className={classes.section_contact_tabs_item_effect_active}
              />
            ) : (
              <div className={classes.section_contact_tabs_item_effect} />
            )}
          </li>
        ))}
      </ul>
      <div className={classes.section_contact_drop_down_container}>
        <div className={classes.section_contact_drop_down_title}>
          {content.dropDown[0]}
        </div>
        <div
          className={classes.section_contact_drop_down_container_header_list}
        >
          <div
            className={classes.section_contact_drop_down_header}
            onClick={toggleDrowpDown}
          >
            {
              // eslint-disable-next-line
              contactCategories.map((data, index) => {
                if (data.active) {
                  return (
                    <div
                      className={classes.section_contact_drop_down_header_title}
                      key={index}
                    >
                      {data.name}
                      <img
                        className={
                          classes.section_contact_drop_down_header_title_icon
                        }
                        src={ArrowDown2}
                        alt=""
                      />
                    </div>
                  );
                }
              })
            }
          </div>
          <div
            className={
              dropDownCollapse
                ? classes.section_contact_drop_down_list
                : classes.section_contact_drop_down_list_active
            }
          >
            {contactCategories.map((data, index) => (
              <button
                className={classes.section_contact_drop_down_list_item}
                key={index}
                onClick={() => {
                  contactCategoriesClickedHandler(index);
                  setDropDownCollapse(true);
                }}
              >
                {data.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {form}
    </div>
  );
};

export default Contact;
