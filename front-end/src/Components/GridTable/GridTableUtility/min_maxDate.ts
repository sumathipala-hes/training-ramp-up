const maxDate = () => {
    // Calculate the maximum allowed date (current date - 18 years)
    const currentDate = new Date()
    const maxAllowedDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
    )
    return maxAllowedDate.toISOString().split('T')[0]
}

const minDate = () => {
    // Calculate the minimum allowed date (a long time ago to avoid future dates)
    const minAllowedDate = new Date(1900, 0, 1)
    return minAllowedDate.toISOString().split('T')[0]
}

export { maxDate, minDate }
