const formatDateTimeToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    return isToday
        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Show time if today
        : date.toLocaleDateString([], { month: 'short', day: 'numeric' });    // Show date if not today
};

export default formatDateTimeToday