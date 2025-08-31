import React from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      
      {/* Floating Chat Button */}
      <div className="floating-chat">
        <button className="chat-btn" aria-label="Chat with us">
          <i className="ri-chat-3-line"></i>
        </button>
      </div>
      
      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="container">
            <div className="hero-content">
              <p className="subtitle">Building Digital Excellence Since 2024</p>
              <h1>We Build Powerful <br /> Websites for Businesses</h1>
              <p className="description">
                Empowering brands through custom website solutions that drive growth, enhance
                user experience, and deliver measurable results for your business.
              </p>
              <div className="hero-buttons">
                <a href="#contact" className="btn btn-primary">Let's Build Together →</a>
                <a href="#projects" className="btn btn-secondary">View Our Work</a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <h2>50+</h2>
                <p>Projects Delivered</p>
              </div>
              <div className="stat-item">
                <h2>98%</h2>
                <p>Client Satisfaction</p>
              </div>
              <div className="stat-item">
                <h2>24/7</h2>
                <p>Support Available</p>
              </div>
              <div className="stat-item">
                <h2>2+</h2>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="container">
            <h2 className="section-title">About TASKLETIX</h2>
            <p className="section-subtitle">
              Founded in 2025, we're a passionate team of developers and designers
              dedicated to creating exceptional web experiences that help businesses thrive in the digital world.
            </p>
            <div className="about-content">
              <div className="about-story">
                <h3>Our Story</h3>
                <p>
                  TASKLETIX started with a simple mission: to bridge the gap between innovative technology and
                  practical business solutions. We saw too many businesses struggling with outdated websites
                  that didn't represent their true potential.
                </p>
                <p>
                  Today, we've grown into a full-service web development agency that combines technical
                  expertise with creative design to deliver websites that not only look amazing but also drive
                  meaningful business results.
                </p>
              </div>
              <div className="about-values-grid">
                <div className="value-item">
                  <i className="ri-rocket-2-line"></i>
                  <h4>Mission-Driven</h4>
                  <p>We're committed to helping businesses establish a strong digital presence that drives real growth.</p>
                </div>
                <div className="value-item">
                  <i className="ri-user-heart-line"></i>
                  <h4>Client-Centered</h4>
                  <p>Every project starts with understanding your unique needs and building solutions that fit perfectly.</p>
                </div>
                <div className="value-item">
                  <i className="ri-lightbulb-line"></i>
                  <h4>Innovation First</h4>
                  <p>We stay ahead of technology trends to deliver cutting-edge solutions for your business.</p>
                </div>
                <div className="value-item">
                  <i className="ri-award-line"></i>
                  <h4>Quality Assured</h4>
                  <p>Our rigorous testing and quality assurance process ensures exceptional results every time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="container">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              We offer comprehensive web development solutions tailored to your business needs
            </p>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <i className="ri-global-line"></i>
                </div>
                <h3>Website Development</h3>
                <p>Custom websites built with modern technologies, optimized for performance and user experience.</p>
                <ul>
                  <li>Responsive Design</li>
                  <li>SEO Optimization</li>
                  <li>Fast Loading</li>
                  <li>Mobile-First</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <i className="ri-shopping-cart-line"></i>
                </div>
                <h3>E-commerce Solutions</h3>
                <p>Complete online store solutions that drive sales and provide seamless shopping experiences.</p>
                <ul>
                  <li>Payment Integration</li>
                  <li>Inventory Management</li>
                  <li>Order Processing</li>
                  <li>Analytics Dashboard</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <i className="ri-smartphone-line"></i>
                </div>
                <h3>Mobile Optimization</h3>
                <p>Ensure your website works perfectly on all devices with our mobile-first approach.</p>
                <ul>
                  <li>Touch-Friendly Design</li>
                  <li>Fast Mobile Loading</li>
                  <li>App-Like Experience</li>
                  <li>Cross-Platform</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <i className="ri-tools-line"></i>
                </div>
                <h3>Maintenance & Support</h3>
                <p>Ongoing support and maintenance to keep your website running smoothly and securely.</p>
                <ul>
                  <li>Regular Updates</li>
                  <li>Security Monitoring</li>
                  <li>Performance Optimization</li>
                  <li>24/7 Support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="process-section">
          <div className="container">
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">
              A proven methodology that ensures successful project delivery
            </p>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <h3>Discovery & Planning</h3>
                <p>We start by understanding your business goals, target audience, and project requirements to create a comprehensive plan.</p>
              </div>
              <div className="process-step">
                <div className="step-number">02</div>
                <h3>Design & Prototyping</h3>
                <p>Our designers create stunning mockups and prototypes that align with your brand and user experience goals.</p>
              </div>
              <div className="process-step">
                <div className="step-number">03</div>
                <h3>Development</h3>
                <p>Our developers bring the designs to life using modern technologies and best practices for optimal performance.</p>
              </div>
              <div className="process-step">
                <div className="step-number">04</div>
                <h3>Testing & Launch</h3>
                <p>Rigorous testing ensures everything works perfectly before we launch your website to the world.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="container">
            <h2 className="section-title">Recent Projects</h2>
            <p className="section-subtitle">
              Take a look at some of our recent work that showcases our expertise
            </p>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-image">
                  <img src="/images/e-comm.jpg" alt="E-commerce Website" />
                </div>
                <div className="project-content">
                  <h3>E-commerce Platform</h3>
                  <p>A modern e-commerce website with advanced features and seamless user experience.</p>
                  <div className="project-tags">
                    <span>React</span>
                    <span>Node.js</span>
                    <span>MongoDB</span>
                  </div>
                </div>
              </div>
              <div className="project-card">
                <div className="project-image">
                  <img src="/images/img2.jpg" alt="Corporate Website" />
                </div>
                <div className="project-content">
                  <h3>Corporate Website</h3>
                  <p>A professional corporate website that effectively communicates the brand message.</p>
                  <div className="project-tags">
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>JavaScript</span>
                  </div>
                </div>
              </div>
              <div className="project-card">
                <div className="project-image">
                  <img src="/images/img3.jpg" alt="Web Application" />
                </div>
                <div className="project-content">
                  <h3>Web Application</h3>
                  <p>A complex web application with real-time features and advanced functionality.</p>
                  <div className="project-tags">
                    <span>Vue.js</span>
                    <span>Express</span>
                    <span>PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your Digital Presence?</h2>
              <p>
                Let's discuss your project and create something amazing together. 
                Get in touch with us today for a free consultation.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Project</a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to transform your digital presence? Get in touch with us today for a
              free consultation and let's discuss how we can help your business grow online.
            </p>
            <div className="contact-content">
              <ContactForm />
              <div className="contact-info-column">
                <h4>Get In Touch</h4>
                <div className="contact-info-item">
                  <i className="ri-mail-line"></i>
                  <div className="info">
                    <h5>Email Us</h5>
                    <p>Send us an email anytime</p>
                    <a href="mailto:taskletix@gmail.com">taskletix@gmail.com</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="ri-whatsapp-line"></i>
                  <div className="info">
                    <h5>WhatsApp</h5>
                    <p>Quick response on WhatsApp</p>
                    <a href="tel:+91 95730 586468">+91 95730 586468</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="ri-phone-line"></i>
                  <div className="info">
                    <h5>Call Us</h5>
                    <p>Speak directly with our team</p>
                    <a href="tel:+91 95730 586468">+91 95730 586468</a>
                  </div>
                </div>
                <div className="contact-img">
                  <img src="/images/img3.jpg" alt="contact-us" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>TASKLETIX</h2>
              <p>
                We're a passionate team of developers and designers creating exceptional web experiences that
                help businesses thrive in the digital world.
              </p>
              <p>Building Digital Excellence Since 2024</p>
              <div className="contact-info">
                <p><i className="ri-mail-line"></i>taskletix@gmail.com</p>
                <p><i className="ri-phone-line"></i>+91 95730 586468</p>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Services</h4>
                <ul>
                  <li><a href="#services">Website Development</a></li>
                  <li><a href="#services">E-commerce Solutions</a></li>
                  <li><a href="#services">Mobile Optimization</a></li>
                  <li><a href="#services">Maintenance & Support</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#process">Our Process</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <ul>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#contact">FAQ</a></li>
                  <li><a href="#contact">Documentation</a></li>
                  <li><a href="#contact">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TASKLETIX. All Rights Reserved.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
              <a href="#" aria-label="Twitter"><i className="ri-twitter-fill"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="ri-linkedin-fill"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
