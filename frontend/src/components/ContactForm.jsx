import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { contactAPI } from '../services/api';
import { validateContactForm, sanitizeFormData, getCountryCodeOptions, getProjectTypeOptions, getBudgetOptions, getTimelineOptions } from '../utils/validation';
import './ContactForm.css';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const watchedValues = watch();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Validate form data
      const validation = validateContactForm(data);
      if (!validation.isValid) {
        Object.values(validation.errors).forEach(error => {
          toast.error(error);
        });
        return;
      }

      // Sanitize data
      const sanitizedData = sanitizeFormData(data);
      
      // Submit to API
      await contactAPI.submit(sanitizedData);
      
      toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you soon!');
      reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={errors.email ? 'error' : ''}
              placeholder="yourname@gmail.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country_code">Country Code *</label>
            <select
              id="country_code"
              {...register('country_code')}
              className={errors.country_code ? 'error' : ''}
            >
              {getCountryCodeOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.country_code && <span className="error-message">{errors.country_code}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="company">Company Name *</label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className={errors.company ? 'error' : ''}
            placeholder="Enter your company name"
          />
          {errors.company && <span className="error-message">{errors.company}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="project_type">Project Type *</label>
            <select
              id="project_type"
              {...register('project_type')}
              className={errors.project_type ? 'error' : ''}
            >
              {getProjectTypeOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.project_type && <span className="error-message">{errors.project_type}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="budget_range">Budget Range *</label>
            <select
              id="budget_range"
              {...register('budget_range')}
              className={errors.budget_range ? 'error' : ''}
            >
              {getBudgetOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.budget_range && <span className="error-message">{errors.budget_range}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="timeline">Timeline *</label>
          <select
            id="timeline"
            {...register('timeline')}
            className={errors.timeline ? 'error' : ''}
          >
            {getTimelineOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.timeline && <span className="error-message">{errors.timeline}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="project_details">Project Details *</label>
          <textarea
            id="project_details"
            {...register('project_details')}
            className={errors.project_details ? 'error' : ''}
            placeholder="Tell us about your project requirements, goals, and any specific features you need..."
            rows="6"
          />
          {errors.project_details && <span className="error-message">{errors.project_details}</span>}
          <div className="char-count">
            {watchedValues.project_details?.length || 0}/1000 characters
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

