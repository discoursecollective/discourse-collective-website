import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Validate environment variables
if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
  console.error('Missing EmailJS environment variables. Please check your .env file or deployment environment variables.');
}

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendCastingApplication = async (formData) => {
  try {
    // Format the selected shows
    const selectedShows = Array.isArray(formData.shows) 
      ? formData.shows.join(', ')
      : formData.shows || 'None selected';

    // Prepare template parameters
    const templateParams = {
      to_email: 'info@discoursecollective.co.uk',
      subject: `New Casting Application - ${formData['first name']} ${formData['last name']} - ${selectedShows}`,
      first_name: formData['first name'],
      last_name: formData['last name'],
      age: formData.age,
      email: formData.email,
      phone: formData.phone,
      instagram_handle: formData.social || 'Not provided',
      tiktok_handle: formData.tiktok || 'Not provided', 
      selected_shows: selectedShows,
      reason: formData.reason,
      application_date: new Date().toLocaleString(),
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    console.log(response);
    // EmailJS returns a standard HTTP response object with status and text
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};