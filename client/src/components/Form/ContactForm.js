import React from 'react';
import "../../styles/ContactForm.css";

const ContactForm = () => {
  return (
      <html>
          <head>
              <title>Contact Us Page</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css" integrity="sha384-wESLQ85D6gbsF459vf1CiZ2+rr+CsxRY0RpiF1tLlQpDnAgg6rwdsUF1+Ics2bni" crossorigin="anonymous"></link>
              <link rel="stylesheet" type="text/css" href="ContactForm.css"></link>
          </head>
          <body>
              <section class="contact">
                  <div class="content">
                      <h2>Contact Us</h2>
                      <p>Follow the form below to contact us. Please note it takes 1-2 business days for feedback.</p>
                  </div>
                  <div class="container">
                      <div class="contactInfo">
                          <div class="box">
                              <div class="icon"></div>
                              <div class="text">
                                  <h3>Address</h3>
                                  <p>1 Washington Square, San Jose, California,95112</p>
                              </div>
                          </div>
                         <div class="box">
                              <div class="icon"></div>
                              <div class="text">
                                  <h3>Phone</h3>
                                  <p>678-999-8212</p>
                              </div>
                          </div>
                          <div class="box">
                              <div class="icon"></div>
                              <div class="text">
                                  <h3>Email</h3>
                                  <p>team12@sjsu.edu</p>
                              </div>
                          </div>
                      </div>
                      <div class="contactForm">
                        <form>
                          <h2>Send Message</h2>
                          <div class="inputBox">
                            <input type="text" name="" required="required"></input>
                            <span>Full Name</span>
                          </div>
                          <div class="inputBox">
                            <input type="text" name="" required="required"></input>
                            <span>Email</span>
                          </div>
                          <div class="inputBox">
                            <textarea required="required"></textarea>
                              <span>Type your Message</span>
                          </div>
                          <div class="inputBox">
                            <input type="submit" name="" value="Send"></input>
                          </div>
                        </form>
                      </div>
                  </div>
              </section>
          </body>
      </html>
  );
};

export default ContactForm