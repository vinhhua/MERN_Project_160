import React from 'react';
import "../../styles/ContactForm.css";

const ContactForm = () => {
  return (
      <html>
          <head>
              <title>Contact Us Page</title>
              <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"></link>
              <link rel="stylesheet" type="text/css" href="ContactForm.css"></link>
              <script src="https://kit.fontawesome.com/400474ca63.js" crossorigin="anonymous"></script>
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
                              <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
                              <div class="text">
                                  <h3>Address</h3>
                                  <p>1 Washington Square,<br />San Jose, California,<br />95112</p>
                              </div>
                          </div>
                         <div class="box">
                              <div class="icon"><i class="fas fa-phone"></i></div>
                              <div class="text">
                                  <h3>Phone</h3>
                                  <p>678-999-8212</p>
                              </div>
                          </div>
                          <div class="box">
                              <div class="icon"><i class="fas fa-at"></i></div>
                              <div class="text">
                                  <h3>Email</h3>
                                  <p>CS160team11@sjsu.edu</p>
                              </div>
                          </div>
                      </div>
                      <div class="contactForm">
                        <form>
                          <h2>Send Us A Message</h2>
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