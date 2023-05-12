// Export an object with two functions for formatting date and time
module.exports = {
  // Function that takes a date and returns a formatted time string
    format_time: (date) => {
      return date.toLocaleDateString();
    },
    // Function that takes a date and returns a formatted date string
    format_date: (date) => {
        return date.toLocaleDateString();
      }
    };