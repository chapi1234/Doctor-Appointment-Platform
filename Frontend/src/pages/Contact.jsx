import React from 'react';

const Contact = () => {
  return (
    <section className="py-12 bg-gradient-to-r">
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Contact Us</h2>
        <p className="mt-4 mb-8 text-center text-gray-700">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>

        <form action="#" className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="example@gmail.com" 
              className="form__input mt-1"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
            <input 
              type="text" 
              id="subject" 
              placeholder="Let us know how we can help you" 
              className="form__input mt-1"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Your Message</label>
            <textarea
              rows="6" 
              id="message" 
              placeholder="Leave a comment...." 
              className="form__input mt-1"
            />
          </div>

          <button type="submit" className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 sm:w-auto">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

