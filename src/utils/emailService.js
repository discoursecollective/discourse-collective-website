import emailjs from '@emailjs/browser';

// EmailJS configuration
// You'll need to replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_bzl6pzo';
const EMAILJS_TEMPLATE_ID = 'template_ufwavyl';
const EMAILJS_PUBLIC_KEY = 'lY8NUBZl3e7pR509L';

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