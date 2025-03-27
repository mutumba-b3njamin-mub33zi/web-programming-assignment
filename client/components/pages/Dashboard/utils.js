// Helper function to format date
export const formatDate = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHrs < 1) {
    return 'Just now';
  } else if (diffHrs < 24) {
    return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  } else {
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
};

// Activity icon based on type
export const getActivityType = (type) => {
  return type;
}; 